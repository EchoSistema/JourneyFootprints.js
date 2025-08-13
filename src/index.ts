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

const DEFAULT_ENDPOINT = "https://micros.services/api/v1/footprints";

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
    const payload = { event, user, sessionId, language, utm, ...data };
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

export default { createFootprints };
