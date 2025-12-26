"use strict";
var JourneyFootprints = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    createFootprints: () => createFootprints,
    default: () => index_default
  });
  var DEFAULT_ENDPOINT = "https://live.echosistema.online/api/v1/footprints";
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
      const payload = {
        event,
        eventTime: (/* @__PURE__ */ new Date()).toISOString(),
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
  function getPage() {
    if (typeof location === "undefined") return "";
    return location.pathname + location.search;
  }
  function getReferrer() {
    if (typeof document === "undefined") return "";
    return document.referrer || "";
  }
  function getTitle() {
    if (typeof document === "undefined") return "";
    return document.title || "";
  }
  function getBrowser() {
    var _a, _b, _c, _d;
    if (typeof navigator === "undefined") return null;
    const ua = navigator.userAgent;
    let name = "";
    let version = "";
    if (ua.includes("Firefox/")) {
      name = "Firefox";
      version = ((_a = ua.match(/Firefox\/([\d.]+)/)) == null ? void 0 : _a[1]) || "";
    } else if (ua.includes("Edg/")) {
      name = "Edge";
      version = ((_b = ua.match(/Edg\/([\d.]+)/)) == null ? void 0 : _b[1]) || "";
    } else if (ua.includes("Chrome/")) {
      name = "Chrome";
      version = ((_c = ua.match(/Chrome\/([\d.]+)/)) == null ? void 0 : _c[1]) || "";
    } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
      name = "Safari";
      version = ((_d = ua.match(/Version\/([\d.]+)/)) == null ? void 0 : _d[1]) || "";
    }
    return name ? { name, version } : null;
  }
  function getOS() {
    var _a, _b, _c, _d, _e;
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
      version = ((_b = (_a = ua.match(/Mac OS X ([\d_]+)/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.replace(/_/g, ".")) || "";
    } else if (ua.includes("Linux")) {
      name = "Linux";
    } else if (ua.includes("Android")) {
      name = "Android";
      version = ((_c = ua.match(/Android ([\d.]+)/)) == null ? void 0 : _c[1]) || "";
    } else if (ua.includes("iPhone") || ua.includes("iPad")) {
      name = "iOS";
      version = ((_e = (_d = ua.match(/OS ([\d_]+)/)) == null ? void 0 : _d[1]) == null ? void 0 : _e.replace(/_/g, ".")) || "";
    }
    return name ? { name, version } : null;
  }
  function getDevice() {
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
  function getScreen() {
    if (typeof screen === "undefined") return null;
    return {
      w: screen.width,
      h: screen.height,
      dpr: typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1
    };
  }
  function getViewport() {
    if (typeof window === "undefined") return null;
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  }
  function getTimezoneOffset() {
    return (/* @__PURE__ */ new Date()).getTimezoneOffset();
  }
  function getClids() {
    if (typeof location === "undefined") return {};
    const params = new URLSearchParams(location.search);
    const clids = {};
    const clidKeys = ["gclid", "fbclid", "msclkid", "ttclid", "li_fat_id", "twclid", "dclid"];
    for (const key of clidKeys) {
      const value = params.get(key);
      if (value) clids[key] = value;
    }
    return clids;
  }
  var index_default = { createFootprints };
  return __toCommonJS(index_exports);
})();
