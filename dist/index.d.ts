/**
 * JourneyFootprints.js
 * Lightweight tracker for session and UTM information.
 */
interface FootprintsOptions {
    endpoint?: string;
    sessionId?: string | null;
    user?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    language?: string;
    fetchImpl?: typeof fetch;
}
interface TrackResult {
    ok: boolean;
    status: number;
}
interface Tracker {
    track(event: string, data?: Record<string, unknown>): Promise<TrackResult>;
    setUser(user: string): void;
    setSessionId(sessionId: string | null): void;
    getSessionId(): string | null;
}
declare function createFootprints(options?: FootprintsOptions): Tracker;
declare const _default: {
    createFootprints: typeof createFootprints;
};

export { type FootprintsOptions, type TrackResult, type Tracker, createFootprints, _default as default };
