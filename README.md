# JourneyFootprints.js

Lightweight JavaScript tracker focused on capturing session and UTM data. Designed with DRY, KISS and SOLID principles, it runs in browsers and can be consumed via CDN or installed through npm, pnpm or yarn.

## Features

- Capture `sessionId`, `user` and language
- Read UTM parameters from the URL or accept them explicitly
- Send events to a configurable endpoint
- Tiny footprint and framework agnostic

## Installation

```bash
npm install journey-footprints
# or
pnpm add journey-footprints
# or
yarn add journey-footprints
```

### CDN

```html
<script src="https://unpkg.com/journey-footprints/dist/index.global.js"></script>
<script>
  const tracker = JourneyFootprints.createFootprints({ user: '42' });
  tracker.track('page-view');
</script>
```

## Usage

### React

```jsx
import { createFootprints } from 'journey-footprints';

const tracker = createFootprints({ user: '42' });
tracker.track('page-view');
```

### Vue

```js
import { createFootprints } from 'journey-footprints';

export default {
  setup() {
    const tracker = createFootprints();
    tracker.track('page-view');
  }
};
```

### Svelte

```svelte
<script>
  import { createFootprints } from 'journey-footprints';
  const tracker = createFootprints();
  tracker.track('page-view');
</script>
```

## API

```ts
createFootprints(options?: {
  endpoint?: string;
  sessionId?: string | null;
  user?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  language?: string;
})
```

Returns a tracker with methods:

- `track(event, data?)` – send an event
- `setUser(user)`
- `setSessionId(sessionId)`
- `getSessionId()`

Language defaults to the browser language when not provided.
