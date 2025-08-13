# JourneyFootprints.js

> Português | [English](#english) | [Español](#español)

## Português

Biblioteca JavaScript leve focada na captura de dados de sessão e parâmetros UTM. Ela roda no navegador e pode ser consumida via CDN ou instalada com npm, pnpm ou yarn.

### Recursos

- Captura `sessionId`, `user` e idioma
- Lê parâmetros UTM da URL ou os aceita explicitamente
- Envia eventos para um endpoint configurável
- Pequeno e agnóstico de framework

### Instalação

```bash
npm install journey-footprints
# ou
pnpm add journey-footprints
# ou
yarn add journey-footprints
```

#### CDN

```html
<script src="https://unpkg.com/journey-footprints/dist/index.global.js"></script>
<script>
  const tracker = JourneyFootprints.createFootprints({ user: '42' });
  tracker.track('page-view');
</script>
```

## Uso

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

Retorna um rastreador com métodos:

- `track(event, data?)` – envia um evento
- `setUser(user)`
- `setSessionId(sessionId)`
- `getSessionId()`

O idioma padrão é o do navegador quando não informado.

## Testes com dados fictícios

```bash
npm test
```

Os testes utilizam uma implementação fictícia de `fetch` para validar o envio de eventos sem depender de um servidor real.

---

## English

Lightweight JavaScript tracker focused on capturing session and UTM data. It runs in browsers and can be consumed via CDN or installed through npm, pnpm or yarn.

### Features

- Capture `sessionId`, `user` and language
- Read UTM parameters from the URL or accept them explicitly
- Send events to a configurable endpoint
- Tiny footprint and framework agnostic

### Installation

```bash
npm install journey-footprints
# or
pnpm add journey-footprints
# or
yarn add journey-footprints
```

#### CDN

```html
<script src="https://unpkg.com/journey-footprints/dist/index.global.js"></script>
<script>
  const tracker = JourneyFootprints.createFootprints({ user: '42' });
  tracker.track('page-view');
</script>
```

### Usage

#### React

```jsx
import { createFootprints } from 'journey-footprints';

const tracker = createFootprints({ user: '42' });
tracker.track('page-view');
```

#### Vue

```js
import { createFootprints } from 'journey-footprints';

export default {
  setup() {
    const tracker = createFootprints();
    tracker.track('page-view');
  }
};
```

#### Svelte

```svelte
<script>
  import { createFootprints } from 'journey-footprints';
  const tracker = createFootprints();
  tracker.track('page-view');
</script>
```

### API

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

### Testing with fake data

```bash
npm test
```

The tests use a fake `fetch` implementation to validate event delivery without relying on a real server.

---

## Español

Rastreador ligero de JavaScript enfocado en capturar datos de sesión y parámetros UTM. Funciona en navegadores y puede consumirse mediante CDN o instalarse con npm, pnpm o yarn.

### Características

- Captura `sessionId`, `user` e idioma
- Lee parámetros UTM de la URL o los acepta explícitamente
- Envía eventos a un endpoint configurable
- Huella pequeña y agnóstico del framework

### Instalación

```bash
npm install journey-footprints
# o
pnpm add journey-footprints
# o
yarn add journey-footprints
```

#### CDN

```html
<script src="https://unpkg.com/journey-footprints/dist/index.global.js"></script>
<script>
  const tracker = JourneyFootprints.createFootprints({ user: '42' });
  tracker.track('page-view');
</script>
```

### Uso

#### React

```jsx
import { createFootprints } from 'journey-footprints';

const tracker = createFootprints({ user: '42' });
tracker.track('page-view');
```

#### Vue

```js
import { createFootprints } from 'journey-footprints';

export default {
  setup() {
    const tracker = createFootprints();
    tracker.track('page-view');
  }
};
```

#### Svelte

```svelte
<script>
  import { createFootprints } from 'journey-footprints';
  const tracker = createFootprints();
  tracker.track('page-view');
</script>
```

### API

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

Devuelve un rastreador con métodos:

- `track(event, data?)` – envía un evento
- `setUser(user)`
- `setSessionId(sessionId)`
- `getSessionId()`

El idioma predeterminado es el del navegador cuando no se proporciona.

### Pruebas con datos ficticios

```bash
npm test
```

Las pruebas utilizan una implementación ficticia de `fetch` para validar el envío de eventos sin depender de un servidor real.
