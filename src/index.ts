// src/index.ts

export interface utmData {
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
    utms?: string[];
    clids?: string[];
}

export interface browserInfo {
    name: string;
    version: string;
}

export interface osInfo {
    name: string;
    version: string;
}

export interface deviceInfo {
    type: string;
    brand: string;
    model: string;
}

export interface screenInfo {
    w: number;
    h: number;
    dpr: number;
}

export interface viewportInfo {
    w: number;
    h: number;
}

export interface footprintPayload {
    user: string;
    sessionId: string | null;
    event: string;
    event_time: string;
    page: string;
    referrer: string | null;
    title: string;
    utm: utmData;
    browser: browserInfo;
    os: osInfo;
    device: deviceInfo;
    screen: screenInfo;
    viewport: viewportInfo;
    timezone_offset: number;
    connection_type: string;
    [k: string]: unknown;
}

type FetchLike = typeof fetch;

export interface trackerConfig {
    endpoint?: string;
    user?: string;
    sessionId?: string | null;
    publicKey?: string;
    getNow?: () => string;
    fetchImpl?: FetchLike;
    extra?: Record<string, unknown>;
}

const DEFAULT_ENDPOINT = "https://micros.services/api/v1/footprints";

function isoNow(): string {
    return new Date().toISOString();
}

function uuidLike(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        // @ts-ignore
        return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function collectUTM(): utmData {
    const params = new URLSearchParams(typeof location !== "undefined" ? location.search : "");
    const utmStandard = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);
    const utmList: string[] = [];
    const clidList: string[] = [];
    params.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (lowerKey.startsWith("utm_") && value && !utmStandard.has(lowerKey)) {
            utmList.push(`${lowerKey}=${value}`);
        }
        if (lowerKey.endsWith("clid") && value) {
            clidList.push(`${lowerKey}=${value}`);
        }
    });
    return {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
        term: params.get("utm_term") || "",
        content: params.get("utm_content") || "",
        utms: utmList.length ? utmList : undefined,
        clids: clidList.length ? clidList : undefined
    };
}

function parseUA(): { browser: browserInfo; os: osInfo; device: deviceInfo } {
    const ua = (typeof navigator !== "undefined" ? navigator.userAgent : "") || "";
    const lower = ua.toLowerCase();
    let browserName = "Unknown";
    let browserVersion = "";
    if (lower.includes("opr/") || lower.includes("opera")) {
        browserName = "Opera";
        browserVersion = matchVersion(ua, /OPR\/([\d.]+)/) || matchVersion(ua, /Opera\/([\d.]+)/);
    } else if (lower.includes("edg/")) {
        browserName = "Edge";
        browserVersion = matchVersion(ua, /Edg\/([\d.]+)/);
    } else if (lower.includes("vivaldi")) {
        browserName = "Vivaldi";
        browserVersion = matchVersion(ua, /Vivaldi\/([\d.]+)/);
    } else if (lower.includes("yabrowser")) {
        browserName = "Yandex Browser";
        browserVersion = matchVersion(ua, /YaBrowser\/([\d.]+)/);
    } else if (lower.includes("ucbrowser")) {
        browserName = "UC Browser";
        browserVersion = matchVersion(ua, /UCBrowser\/([\d.]+)/);
    } else if (lower.includes("samsungbrowser")) {
        browserName = "Samsung Internet";
        browserVersion = matchVersion(ua, /SamsungBrowser\/([\d.]+)/);
    } else if (lower.includes("brave")) {
        browserName = "Brave";
        browserVersion = matchVersion(ua, /Brave\/([\d.]+)/) || matchVersion(ua, /Chrome\/([\d.]+)/);
    } else if (lower.includes("chrome")) {
        browserName = "Chrome";
        browserVersion = matchVersion(ua, /Chrome\/([\d.]+)/);
    } else if (lower.includes("safari") && !lower.includes("chrome")) {
        browserName = "Safari";
        browserVersion = matchVersion(ua, /Version\/([\d.]+)/);
    } else if (lower.includes("firefox")) {
        browserName = "Firefox";
        browserVersion = matchVersion(ua, /Firefox\/([\d.]+)/);
    }
    let osName = "Unknown";
    let osVersion = "";
    if (lower.includes("windows nt")) {
        osName = "Windows";
        osVersion = matchVersion(ua, /Windows NT ([\d.]+)/);
    } else if (lower.includes("android")) {
        osName = "Android";
        osVersion = matchVersion(ua, /Android ([\d.]+)/);
    } else if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ipod")) {
        osName = "iOS";
        osVersion = matchVersion(ua, /OS ([\d_]+)/)?.replaceAll("_", ".") || "";
    } else if (lower.includes("mac os x")) {
        osName = "macOS";
        osVersion = matchVersion(ua, /Mac OS X ([\d_]+)/)?.replaceAll("_", ".") || "";
    } else if (lower.includes("linux")) {
        osName = "Linux";
    }
    const deviceType =
        /mobi|android|iphone|ipod|blackberry|phone/i.test(ua) ? "mobile" :
            /tablet|ipad/i.test(ua) ? "tablet" :
                /smart-tv|hbbtv|appletv|googletv|tv;/i.test(ua) ? "tv" :
                    "desktop";
    return {
        browser: { name: browserName, version: browserVersion },
        os: { name: osName, version: osVersion },
        device: { type: deviceType, brand: "", model: "" }
    };
}

function matchVersion(ua: string, re: RegExp): string {
    const m = ua.match(re);
    return m?.[1] || "";
}

function collectScreen(): screenInfo {
    const w = typeof screen !== "undefined" ? screen.width : 0;
    const h = typeof screen !== "undefined" ? screen.height : 0;
    const dpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1;
    return { w, h, dpr };
}

function collectViewport(): viewportInfo {
    const w = typeof window !== "undefined" ? window.innerWidth : 0;
    const h = typeof window !== "undefined" ? window.innerHeight : 0;
    return { w, h };
}

function connectionType(): string {
    const nav = typeof navigator !== "undefined" ? (navigator as any) : {};
    return nav?.connection?.effectiveType || "";
}

function headerGetCaseInsensitive(headers: Headers, key: string): string | null {
    const direct = headers.get(key) ||
        headers.get(key.toLowerCase()) ||
        headers.get(key.toUpperCase()) ||
        headers.get("X-Correlation-Id") ||
        headers.get("x-correlation-id");
    if (direct) return direct;
    for (const [k, v] of headers.entries()) {
        if (k.toLowerCase() === key.toLowerCase()) return v;
    }
    return null;
}

async function sendPayload(
    endpoint: string,
    data: footprintPayload,
    fetchImpl?: FetchLike,
    publicKey?: string
): Promise<{ ok: boolean; correlationId: string | null; status: number }> {
    const fetchFn = fetchImpl || (typeof fetch !== "undefined" ? fetch : undefined);
    if (!fetchFn) return { ok: false, correlationId: null, status: 0 };
    try {
        const res = await fetchFn(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(publicKey ? { "X-PUBLIC-KEY": publicKey } : {})
            },
            keepalive: true,
            body: JSON.stringify(data)
        });
        const correlationId = headerGetCaseInsensitive(res.headers, "X-Correlation-Id");
        return { ok: res.ok, correlationId, status: res.status };
    } catch {
        return { ok: false, correlationId: null, status: 0 };
    }
}

export interface tracker {
    setUser(user: string): void;
    setSessionId(sessionId: string | null): void;
    track(event: string, overrides?: Partial<footprintPayload>): Promise<boolean>;
    getSessionId(): string | null;
}

export function createTracker(config: trackerConfig = {}): tracker {
    const endpoint = config.endpoint || DEFAULT_ENDPOINT;
    const now = config.getNow || isoNow;
    const publicKey = config.publicKey;
    let user = config.user || "";
    let sessionId: string | null = typeof config.sessionId === "undefined" ? null : (config.sessionId ?? null);
    function basePayload(event: string): footprintPayload {
        const { browser, os, device } = parseUA();
        return {
            user,
            sessionId,
            event,
            event_time: now(),
            page: typeof location !== "undefined" ? location.href : "",
            referrer: typeof document !== "undefined" ? (document.referrer || null) : null,
            title: typeof document !== "undefined" ? (document.title || "") : "",
            utm: collectUTM(),
            browser,
            os,
            device,
            screen: collectScreen(),
            viewport: collectViewport(),
            timezone_offset: new Date().getTimezoneOffset(),
            connection_type: connectionType(),
            ...(config.extra || {})
        };
    }
    return {
        setUser(id: string) { user = id || ""; },
        setSessionId(id: string | null) { sessionId = id ?? null; },
        getSessionId() { return sessionId; },
        async track(event: string, overrides: Partial<footprintPayload> = {}) {
            const payload: footprintPayload = { ...basePayload(event), ...overrides };
            payload.user = overrides.user ?? user ?? "";
            payload.sessionId = typeof overrides.sessionId !== "undefined" ? overrides.sessionId : sessionId;
            const { ok, correlationId } = await sendPayload(endpoint, payload, config.fetchImpl, publicKey);
            if (correlationId) {
                sessionId = correlationId;
            }
            return ok;
        }
    };
}

export default { createTracker };
