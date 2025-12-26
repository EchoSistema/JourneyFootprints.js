# JourneyFootprints.js

> English | [Português](#português) | [Español](#español)

## English

Lightweight JavaScript tracker focused on capturing session and UTM data. It runs in browsers and can be consumed via CDN or installed through npm, pnpm or yarn.

### Features

- Capture `sessionId`, `user` and language
- Read UTM parameters from the URL or accept them explicitly
- Send events to a configurable endpoint
- Tiny footprint and framework agnostic
- **Auto-collect browser, OS, device, screen and viewport info**
- **Auto-collect referrer, page title, and timezone**
- **Auto-capture ad click IDs (gclid, fbclid, msclkid, etc.)**

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
  tracker.track('page_view');
</script>
```

### Usage

#### React

```jsx
import { createFootprints } from 'journey-footprints';

const tracker = createFootprints({ user: '42' });
tracker.track('page_view');
```

#### Vue (Composition API)

Use the tracker inside Vue's Composition API by creating it within a `<script setup>` block and tracking events on a lifecycle hook:

```vue
<script setup>
import { createFootprints } from 'journey-footprints';
import { onMounted } from 'vue';

const tracker = createFootprints();

onMounted(() => {
  tracker.track('page_view');
});
</script>
```

#### Svelte

```svelte
<script>
  import { createFootprints } from 'journey-footprints';
  const tracker = createFootprints();
  tracker.track('page_view');
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

### Auto-collected data

Each `track()` call automatically includes:

| Field | Description |
|-------|-------------|
| `eventTime` | ISO 8601 timestamp |
| `page` | Current pathname + search |
| `referrer` | Document referrer |
| `title` | Page title |
| `browser` | Name and version (Chrome, Firefox, Edge, Safari) |
| `os` | Name and version (Windows, macOS, Linux, Android, iOS) |
| `device` | Type (desktop/mobile/tablet), brand and model |
| `screen` | Width, height and device pixel ratio |
| `viewport` | Inner width and height |
| `timezoneOffset` | Minutes from UTC |
| `clids` | Ad click IDs from URL (gclid, fbclid, msclkid, ttclid, li_fat_id, twclid, dclid) |

### Event list

Common events you can track include:

**Analytics & Tracking:** `first_visit`, `session_start`, `user_engagement`, `page_view`, `page_redirect`, `view_search_results`, `health_check`

**E-commerce:** `add_payment_info`, `add_shipping_info`, `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `purchase`, `refund`, `remove_from_cart`, `select_item`, `select_promotion`, `view_cart`, `view_item`, `view_item_list`, `view_promotion`

**Leads & Conversions:** `generate_lead`, `lead`, `qualify_lead`, `disqualify_lead`, `working_lead`, `close_convert_lead`, `close_unconvert_lead`, `emailCapture`

**User Actions:** `login`, `logout`, `sign_up`, `apply_job`, `contact`, `register_event`, `email_view`, `chat`, `video_call`, `audio_call`, `image_upload`

**UI Interactions:** `click`, `button_click`, `scroll`, `form_submission`, `input_focus`, `modal_open`, `lightbox_open`, `tooltip_click`, `file_download`

**Media:** `video_play`, `video_start`, `video_progress`, `video_complete`

**Learning:** `tutorial_begin`, `tutorial_complete`

**Ads:** `ad_view`, `ad_click`

**DevOps:** `deploy`, `custom_event`

### Testing with fake data

```bash
npm test
```

The tests use a fake `fetch` implementation to validate event delivery without relying on a real server.

---

## Português

Biblioteca JavaScript leve focada na captura de dados de sessão e parâmetros UTM. Ela roda no navegador e pode ser consumida via CDN ou instalada com npm, pnpm ou yarn.

### Recursos

- Captura `sessionId`, `user` e idioma
- Lê parâmetros UTM da URL ou os aceita explicitamente
- Envia eventos para um endpoint configurável
- Pequeno e agnóstico de framework
- **Coleta automática de browser, OS, dispositivo, tela e viewport**
- **Coleta automática de referrer, título da página e timezone**
- **Captura automática de IDs de clique de anúncios (gclid, fbclid, msclkid, etc.)**

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
  tracker.track('page_view');
</script>
```

## Uso

### React

```jsx
import { createFootprints } from 'journey-footprints';

const tracker = createFootprints({ user: '42' });
tracker.track('page_view');
```

### Vue (API de Composição)

Use o tracker com a API de Composição do Vue criando-o dentro de um bloco `<script setup>` e rastreando eventos em um hook de ciclo de vida:

```vue
<script setup>
import { createFootprints } from 'journey-footprints';
import { onMounted } from 'vue';

const tracker = createFootprints();

onMounted(() => {
  tracker.track('page_view');
});
</script>
```

### Svelte

```svelte
<script>
  import { createFootprints } from 'journey-footprints';
  const tracker = createFootprints();
  tracker.track('page_view');
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

### Dados coletados automaticamente

Cada chamada `track()` inclui automaticamente:

| Campo | Descrição |
|-------|-----------|
| `eventTime` | Timestamp ISO 8601 |
| `page` | Pathname + search atual |
| `referrer` | Referrer do documento |
| `title` | Título da página |
| `browser` | Nome e versão (Chrome, Firefox, Edge, Safari) |
| `os` | Nome e versão (Windows, macOS, Linux, Android, iOS) |
| `device` | Tipo (desktop/mobile/tablet), marca e modelo |
| `screen` | Largura, altura e device pixel ratio |
| `viewport` | Largura e altura interna |
| `timezoneOffset` | Minutos em relação ao UTC |
| `clids` | IDs de clique de anúncios da URL (gclid, fbclid, msclkid, ttclid, li_fat_id, twclid, dclid) |

### Eventos

Eventos comuns que você pode rastrear incluem:

**Analytics & Rastreamento:** `first_visit`, `session_start`, `user_engagement`, `page_view`, `page_redirect`, `view_search_results`, `health_check`

**E-commerce:** `add_payment_info`, `add_shipping_info`, `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `purchase`, `refund`, `remove_from_cart`, `select_item`, `select_promotion`, `view_cart`, `view_item`, `view_item_list`, `view_promotion`

**Leads & Conversões:** `generate_lead`, `lead`, `qualify_lead`, `disqualify_lead`, `working_lead`, `close_convert_lead`, `close_unconvert_lead`, `emailCapture`

**Ações do Usuário:** `login`, `logout`, `sign_up`, `apply_job`, `contact`, `register_event`, `email_view`, `chat`, `video_call`, `audio_call`, `image_upload`

**Interações de UI:** `click`, `button_click`, `scroll`, `form_submission`, `input_focus`, `modal_open`, `lightbox_open`, `tooltip_click`, `file_download`

**Mídia:** `video_play`, `video_start`, `video_progress`, `video_complete`

**Aprendizado:** `tutorial_begin`, `tutorial_complete`

**Anúncios:** `ad_view`, `ad_click`

**DevOps:** `deploy`, `custom_event`

## Testes com dados fictícios

```bash
npm test
```

Os testes utilizam uma implementação fictícia de `fetch` para validar o envio de eventos sem depender de um servidor real.

---

## Español

Rastreador ligero de JavaScript enfocado en capturar datos de sesión y parámetros UTM. Funciona en navegadores y puede consumirse mediante CDN o instalarse con npm, pnpm o yarn.

### Características

- Captura `sessionId`, `user` e idioma
- Lee parámetros UTM de la URL o los acepta explícitamente
- Envía eventos a un endpoint configurable
- Huella pequeña y agnóstico del framework
- **Recopilación automática de navegador, SO, dispositivo, pantalla y viewport**
- **Recopilación automática de referrer, título de página y zona horaria**
- **Captura automática de IDs de clic de anuncios (gclid, fbclid, msclkid, etc.)**

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
  tracker.track('page_view');
</script>
```

### Uso

#### React

```jsx
import { createFootprints } from 'journey-footprints';

const tracker = createFootprints({ user: '42' });
tracker.track('page_view');
```

#### Vue (API de composición)

Utiliza el tracker con la API de composición de Vue creándolo dentro de un bloque `<script setup>` y registrando eventos en un hook de ciclo de vida:

```vue
<script setup>
import { createFootprints } from 'journey-footprints';
import { onMounted } from 'vue';

const tracker = createFootprints();

onMounted(() => {
  tracker.track('page_view');
});
</script>
```

#### Svelte

```svelte
<script>
  import { createFootprints } from 'journey-footprints';
  const tracker = createFootprints();
  tracker.track('page_view');
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

### Datos recopilados automáticamente

Cada llamada a `track()` incluye automáticamente:

| Campo | Descripción |
|-------|-------------|
| `eventTime` | Marca de tiempo ISO 8601 |
| `page` | Pathname + search actual |
| `referrer` | Referrer del documento |
| `title` | Título de la página |
| `browser` | Nombre y versión (Chrome, Firefox, Edge, Safari) |
| `os` | Nombre y versión (Windows, macOS, Linux, Android, iOS) |
| `device` | Tipo (desktop/mobile/tablet), marca y modelo |
| `screen` | Ancho, alto y device pixel ratio |
| `viewport` | Ancho y alto interno |
| `timezoneOffset` | Minutos respecto a UTC |
| `clids` | IDs de clic de anuncios de la URL (gclid, fbclid, msclkid, ttclid, li_fat_id, twclid, dclid) |

### Eventos

Eventos comunes que se pueden rastrear incluyen:

**Analytics & Seguimiento:** `first_visit`, `session_start`, `user_engagement`, `page_view`, `page_redirect`, `view_search_results`, `health_check`

**E-commerce:** `add_payment_info`, `add_shipping_info`, `add_to_cart`, `add_to_wishlist`, `begin_checkout`, `purchase`, `refund`, `remove_from_cart`, `select_item`, `select_promotion`, `view_cart`, `view_item`, `view_item_list`, `view_promotion`

**Leads & Conversiones:** `generate_lead`, `lead`, `qualify_lead`, `disqualify_lead`, `working_lead`, `close_convert_lead`, `close_unconvert_lead`, `emailCapture`

**Acciones del Usuario:** `login`, `logout`, `sign_up`, `apply_job`, `contact`, `register_event`, `email_view`, `chat`, `video_call`, `audio_call`, `image_upload`

**Interacciones de UI:** `click`, `button_click`, `scroll`, `form_submission`, `input_focus`, `modal_open`, `lightbox_open`, `tooltip_click`, `file_download`

**Medios:** `video_play`, `video_start`, `video_progress`, `video_complete`

**Aprendizaje:** `tutorial_begin`, `tutorial_complete`

**Anuncios:** `ad_view`, `ad_click`

**DevOps:** `deploy`, `custom_event`

### Pruebas con datos ficticios

```bash
npm test
```

Las pruebas utilizan una implementación ficticia de `fetch` para validar el envío de eventos sin depender de un servidor real.
