# JourneyFootprints.js

> English | [Português](#português) | [Español](#español)

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

### Event list

Common events you can track include:

- `first_visit`
- `session_start`
- `user_engagement`
- `page_view`
- `scroll`
- `click`
- `file_download`
- `video_start`
- `video_progress`
- `video_complete`
- `view_search_results`
- `add_payment_info`
- `add_shipping_info`
- `add_to_cart`
- `add_to_wishlist`
- `begin_checkout`
- `purchase`
- `refund`
- `remove_from_cart`
- `select_item`
- `select_promotion`
- `view_cart`
- `view_item`
- `view_item_list`
- `view_promotion`
- `generate_lead`
- `qualify_lead`
- `disqualify_lead`
- `working_lead`
- `close_convert_lead`
- `close_unconvert_lead`
- `sign_up`
- `tutorial_begin`
- `tutorial_complete`
- `login`
- `logout`
- `form_submission`
- `button_click`
- `modal_open`
- `lightbox_open`
- `video_play`
- `input_focus`
- `tooltip_click`
- `ad_view`
- `ad_click`
- `apply_job`
- `contact`
- `lead`
- `register_event`
- `emailCapture`

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

### Eventos

Eventos comuns que você pode rastrear incluem:

- `first_visit`
- `session_start`
- `user_engagement`
- `page_view`
- `scroll`
- `click`
- `file_download`
- `video_start`
- `video_progress`
- `video_complete`
- `view_search_results`
- `add_payment_info`
- `add_shipping_info`
- `add_to_cart`
- `add_to_wishlist`
- `begin_checkout`
- `purchase`
- `refund`
- `remove_from_cart`
- `select_item`
- `select_promotion`
- `view_cart`
- `view_item`
- `view_item_list`
- `view_promotion`
- `generate_lead`
- `qualify_lead`
- `disqualify_lead`
- `working_lead`
- `close_convert_lead`
- `close_unconvert_lead`
- `sign_up`
- `tutorial_begin`
- `tutorial_complete`
- `login`
- `logout`
- `form_submission`
- `button_click`
- `modal_open`
- `lightbox_open`
- `video_play`
- `input_focus`
- `tooltip_click`
- `ad_view`
- `ad_click`
- `apply_job`
- `contact`
- `lead`
- `register_event`
- `emailCapture`

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

### Eventos

Eventos comunes que se pueden rastrear incluyen:

- `first_visit`
- `session_start`
- `user_engagement`
- `page_view`
- `scroll`
- `click`
- `file_download`
- `video_start`
- `video_progress`
- `video_complete`
- `view_search_results`
- `add_payment_info`
- `add_shipping_info`
- `add_to_cart`
- `add_to_wishlist`
- `begin_checkout`
- `purchase`
- `refund`
- `remove_from_cart`
- `select_item`
- `select_promotion`
- `view_cart`
- `view_item`
- `view_item_list`
- `view_promotion`
- `generate_lead`
- `qualify_lead`
- `disqualify_lead`
- `working_lead`
- `close_convert_lead`
- `close_unconvert_lead`
- `sign_up`
- `tutorial_begin`
- `tutorial_complete`
- `login`
- `logout`
- `form_submission`
- `button_click`
- `modal_open`
- `lightbox_open`
- `video_play`
- `input_focus`
- `tooltip_click`
- `ad_view`
- `ad_click`
- `apply_job`
- `contact`
- `lead`
- `register_event`
- `emailCapture`

### Pruebas con datos ficticios

```bash
npm test
```

Las pruebas utilizan una implementación ficticia de `fetch` para validar el envío de eventos sin depender de un servidor real.
