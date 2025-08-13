// src/index.ts
var DEFAULT_ENDPOINT = "https://micros.services/api/v1/footprints";
function createFootprints(options = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const endpoint = (_a = options.endpoint) != null ? _a : DEFAULT_ENDPOINT;
  const fetchFn = (_b = options.fetchImpl) != null ? _b : typeof fetch !== "undefined" ? fetch : void 0;
  let sessionId = (_c = options.sessionId) != null ? _c : null;
  let user = (_d = options.user) != null ? _d : "";
  const publicKey = (_e = options.publicKey) != null ? _e : "";
  const utm = {
    source: (_f = options.utmSource) != null ? _f : getQuery("utm_source"),
    medium: (_g = options.utmMedium) != null ? _g : getQuery("utm_medium"),
    campaign: (_h = options.utmCampaign) != null ? _h : getQuery("utm_campaign"),
    term: (_i = options.utmTerm) != null ? _i : getQuery("utm_term"),
    content: (_j = options.utmContent) != null ? _j : getQuery("utm_content")
  };
  const language = (_k = options.language) != null ? _k : getLanguage();
  async function track(event, data = {}) {
    var _a2;
    if (!fetchFn) return { ok: false, status: 0 };
    const payload = { event, user, sessionId, language, utm, ...data };
    try {
      const headers = { "Content-Type": "application/json" };
      if (publicKey) headers["X-PUBLIC-KEY"] = publicKey;
      const res = await fetchFn(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      const corr = (_a2 = res.headers) == null ? void 0 : _a2.get("X-Correlation-Id");
      if (corr) sessionId = corr;
      return { ok: res.ok, status: res.status };
    } catch (e) {
      return { ok: false, status: 0 };
    }
  }
  return {
    track,
    setUser(value) {
      user = value;
    },
    setSessionId(value) {
      sessionId = value;
    },
    getSessionId() {
      return sessionId;
    }
  };
}
function getQuery(key) {
  if (typeof location === "undefined") return "";
  return new URLSearchParams(location.search).get(key) || "";
}
function getLanguage() {
  if (typeof navigator === "undefined") return "";
  return navigator.language || "";
}
var index_default = { createFootprints };
export {
  createFootprints,
  index_default as default
};
