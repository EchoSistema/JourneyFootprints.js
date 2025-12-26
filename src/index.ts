/**
 * JourneyFootprints.js
 * Lightweight tracker for session and UTM information.
 */

export interface FootprintsOptions {
  endpoint?: string;
  sessionId?: string | null;
  user?: string;
  publicKey?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  language?: string;
  fetchImpl?: typeof fetch;
}

export interface TrackResult {
  ok: boolean;
  status: number;
}

export interface Tracker {
  track(event: string, data?: Record<string, unknown>): Promise<TrackResult>;
  setUser(user: string): void;
  setSessionId(sessionId: string | null): void;
  getSessionId(): string | null;
}

const DEFAULT_ENDPOINT = "https://live.echosistema.online/api/v1/footprints";

export function createFootprints(options: FootprintsOptions = {}): Tracker {
  const endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
  const fetchFn = options.fetchImpl ?? (typeof fetch !== "undefined" ? fetch : undefined);
  let sessionId = options.sessionId ?? null;
  let user = options.user ?? "";
  const publicKey = options.publicKey ?? "";

  const utm = {
    source: options.utmSource ?? getQuery("utm_source"),
    medium: options.utmMedium ?? getQuery("utm_medium"),
    campaign: options.utmCampaign ?? getQuery("utm_campaign"),
    term: options.utmTerm ?? getQuery("utm_term"),
    content: options.utmContent ?? getQuery("utm_content")
  };

  const language = options.language ?? getLanguage();

  async function track(event: string, data: Record<string, unknown> = {}): Promise<TrackResult> {
    if (!fetchFn) return { ok: false, status: 0 };
    const payload = {
      event,
      eventTime: new Date().toISOString(),
      page: getPage(),
      referrer: getReferrer(),
      title: getTitle(),
      user,
      sessionId,
      language,
      utm,
      browser: getBrowser(),
      os: getOS(),
      device: getDevice(),
      screen: getScreen(),
      viewport: getViewport(),
      timezoneOffset: getTimezoneOffset(),
      clids: getClids(),
      ...data
    };
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (publicKey) headers["X-PUBLIC-KEY"] = publicKey;
      const res = await fetchFn(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      const corr = res.headers?.get("X-Correlation-Id");
      if (corr) sessionId = corr;
      return { ok: res.ok, status: res.status };
    } catch {
      return { ok: false, status: 0 };
    }
  }

  return {
    track,
    setUser(value: string) { user = value; },
    setSessionId(value: string | null) { sessionId = value; },
    getSessionId() { return sessionId; }
  };
}

function getQuery(key: string): string {
  if (typeof location === "undefined") return "";
  return new URLSearchParams(location.search).get(key) || "";
}

function getLanguage(): string {
  if (typeof navigator === "undefined") return "";
  return navigator.language || "";
}

function getPage(): string {
  if (typeof location === "undefined") return "";
  return location.pathname + location.search;
}

function getReferrer(): string {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

function getTitle(): string {
  if (typeof document === "undefined") return "";
  return document.title || "";
}

function getBrowser(): { name: string; version: string } | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  let name = "";
  let version = "";

  if (ua.includes("Firefox/")) {
    name = "Firefox";
    version = ua.match(/Firefox\/([\d.]+)/)?.[1] || "";
  } else if (ua.includes("Edg/")) {
    name = "Edge";
    version = ua.match(/Edg\/([\d.]+)/)?.[1] || "";
  } else if (ua.includes("Chrome/")) {
    name = "Chrome";
    version = ua.match(/Chrome\/([\d.]+)/)?.[1] || "";
  } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
    name = "Safari";
    version = ua.match(/Version\/([\d.]+)/)?.[1] || "";
  }

  return name ? { name, version } : null;
}

function getOS(): { name: string; version: string } | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  let name = "";
  let version = "";

  if (ua.includes("Windows")) {
    name = "Windows";
    const match = ua.match(/Windows NT ([\d.]+)/);
    if (match) {
      const ntVersion = match[1];
      if (ntVersion === "10.0") version = "10/11";
      else if (ntVersion === "6.3") version = "8.1";
      else if (ntVersion === "6.2") version = "8";
      else if (ntVersion === "6.1") version = "7";
      else version = ntVersion;
    }
  } else if (ua.includes("Mac OS X")) {
    name = "macOS";
    version = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, ".") || "";
  } else if (ua.includes("Linux")) {
    name = "Linux";
  } else if (ua.includes("Android")) {
    name = "Android";
    version = ua.match(/Android ([\d.]+)/)?.[1] || "";
  } else if (ua.includes("iPhone") || ua.includes("iPad")) {
    name = "iOS";
    version = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, ".") || "";
  }

  return name ? { name, version } : null;
}

function getDevice(): { type: string; brand: string; model: string } | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  let type = "desktop";
  let brand = "";
  let model = "";

  if (/Mobi|Android/i.test(ua)) {
    type = "mobile";
  } else if (/Tablet|iPad/i.test(ua)) {
    type = "tablet";
  }

  if (ua.includes("iPhone")) {
    brand = "Apple";
    model = "iPhone";
  } else if (ua.includes("iPad")) {
    brand = "Apple";
    model = "iPad";
  } else if (ua.includes("Macintosh")) {
    brand = "Apple";
    model = "Mac";
  }

  return { type, brand, model };
}

function getScreen(): { w: number; h: number; dpr: number } | null {
  if (typeof screen === "undefined") return null;
  return {
    w: screen.width,
    h: screen.height,
    dpr: typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1
  };
}

function getViewport(): { w: number; h: number } | null {
  if (typeof window === "undefined") return null;
  return {
    w: window.innerWidth,
    h: window.innerHeight
  };
}

function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

function getClids(): Record<string, string> {
  if (typeof location === "undefined") return {};
  const params = new URLSearchParams(location.search);
  const clids: Record<string, string> = {};
  const clidKeys = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id", "twclid", "dclid"];

  for (const key of clidKeys) {
    const value = params.get(key);
    if (value) clids[key] = value;
  }

  return clids;
}

export default { createFootprints };
