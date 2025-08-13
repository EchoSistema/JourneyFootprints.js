// src/index.ts
var DEFAULT_ENDPOINT = "https://micros.services/api/v1/footprints";
function createFootprints(options = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const endpoint = (_a = options.endpoint) != null ? _a : DEFAULT_ENDPOINT;
  const fetchFn = (_b = options.fetchImpl) != null ? _b : typeof fetch !== "undefined" ? fetch : void 0;
  let sessionId = (_c = options.sessionId) != null ? _c : null;
  let user = (_d = options.user) != null ? _d : "";
  const utm = {
    source: (_e = options.utmSource) != null ? _e : getQuery("utm_source"),
    medium: (_f = options.utmMedium) != null ? _f : getQuery("utm_medium"),
    campaign: (_g = options.utmCampaign) != null ? _g : getQuery("utm_campaign"),
    term: (_h = options.utmTerm) != null ? _h : getQuery("utm_term"),
    content: (_i = options.utmContent) != null ? _i : getQuery("utm_content")
  };
  const language = (_j = options.language) != null ? _j : getLanguage();
  async function track(event, data = {}) {
    var _a2;
    if (!fetchFn)
      return { ok: false, status: 0 };
    const payload = { event, user, sessionId, language, utm, ...data };
    try {
      const res = await fetchFn(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const corr = (_a2 = res.headers) == null ? void 0 : _a2.get("X-Correlation-Id");
      if (corr)
        sessionId = corr;
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
  if (typeof location === "undefined")
    return "";
  return new URLSearchParams(location.search).get(key) || "";
}
function getLanguage() {
  if (typeof navigator === "undefined")
    return "";
  return navigator.language || "";
}
var src_default = { createFootprints };
export {
  createFootprints,
  src_default as default
};
