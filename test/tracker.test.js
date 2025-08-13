import test from 'node:test';
import assert from 'node:assert';
import { createFootprints } from '../dist/index.js';

test('tracks events with fake data', async () => {
  const calls = [];
  const fakeFetch = async (_url, options) => {
    calls.push(JSON.parse(options.body));
    return {
      ok: true,
      status: 201,
      headers: { get: () => 'session-456' }
    };
  };

  const tracker = createFootprints({
    endpoint: 'https://example.com',
    user: 'user-123',
    sessionId: 'session-123',
    fetchImpl: fakeFetch
  });

  const result = await tracker.track('signup', { plan: 'free' });

  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 201);
  assert.strictEqual(calls.length, 1);
  assert.strictEqual(calls[0].event, 'signup');
  assert.strictEqual(calls[0].plan, 'free');
  assert.strictEqual(calls[0].user, 'user-123');
  assert.strictEqual(tracker.getSessionId(), 'session-456');
});

test('includes public key header when provided', async () => {
  const headers = [];
  const fakeFetch = async (_url, options) => {
    headers.push(options.headers);
    return { ok: true, status: 200, headers: { get: () => null } };
  };

  const tracker = createFootprints({
    endpoint: 'https://example.com',
    publicKey: 'pub-key-123',
    fetchImpl: fakeFetch
  });

  await tracker.track('test');

  assert.strictEqual(headers[0]['X-PUBLIC-KEY'], 'pub-key-123');
});
