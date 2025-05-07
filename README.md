<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

## Оригинальный репозиторий

Этот проект является форком froggyxyz/frog-modal

# frog-modal

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This module is designed to simplify working with your custom modals.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

1. Add `frog-modal` dependency to your project

```bash
# Using pnpm
pnpm add frog-modal

# Using yarn
yarn add frog-modal

# Using npm
npm install frog-modal
```

2. Add `frog-modal` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["frog-modal"],
});
```

That's it! You can now use frog-modal in your Nuxt app ✨

## Usage

Add FrogModal component in app.vue file.

```vue
<template>
  <div>
    <FrogModal />
    <!--<NuxtPage /> maybe :) -->
    <!-- your code... -->
  </div>
</template>
```

Then use composable useFrogModal. And just import your modal component and pass it to the setter function.

```vue
<template>
  <button @click="setModal(MyModal)">Open modal</button>
  <p>Is open state for frog-modal true/false: {{ isOpen }}</p>
</template>

<script setup>
import MyModal from "~/components/MyModal.vue";

const { setModal, closeModal, isOpen } = useFrogModal();
// You can specify any other names instead of setModal and closeModal
</script>
```

useFrogModal returns two functions and boolean state: a function to set the modal window, a function to clear it and isOpen state

If you only need a function to close.

```vue
<template>
  <button @click="closeModal">Close modal</button>
</template>

<script setup>
const { closeModal } = useFrogModal();
</script>
```

If you need to pass the props and emits to modal component, you can pass it to second _(optional)_ parameter of setter function.

```js
const handleClick = () => console.log("Custom emit works");

const { setModal } = useFrogModal();

setModal(MyModal, {
  someProp: "Hello, it's frog-modal",
  onCustomEmit: handleClick,
});
// To set emits, you need pass them in camelCase, which starts with "on".

// Some examples
// @submit => onSubmit
// @click => onClick
// @customEvent => onCustomEvent
```

Also, you can add type definition of props and emits.

```ts
const { setModal } = useFrogModal<{ text: string }>();

setModal(MyModal, { text: "Hello" });
```

If you need to customize the modal, you have the option to change the value of some variables, or access the classes directly.

```css
/* By variables */

:root {
  --frog-modal-transition: visibility 0.2s, opacity 0.2s;
  --frog-modal-overlay-opacity: 0.5;
  --frog-modal-overlay-background: #0e151e;
}

/* By classes */

.frog-modal {
  /* ... */
}

.frog-modal.hide {
  /* ... */
}

.frog-modal__content {
  /* ... */
}

.frog-modal__overlay {
  /* ... */
}
```

## API Reference

useFrogModal has some options that you can pass as a parameter of composable.

### closeOnOverlayClick

Enables/disables closing the modal by clicking on the overlay

Type: boolean

Default: true

Example:

```typescript
const { setModal } = useFrogModal({ closeOnOverlayClick: false }); // Disables closing modal by clicking on the overlay
```

### closeOnEsc

Enables/disables closing the modal by press Esc button

Type: boolean

Default: true

```typescript
const { setModal } = useFrogModal({ closeOnEsc: false }); // Disables closing modal by pressing Esc button
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/rubillex_frog-modal/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/rubillex_frog-modal
[npm-downloads-src]: https://img.shields.io/npm/dm/rubillex_frog-modal.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/rubillex_frog-modal
[license-src]: https://img.shields.io/npm/l/rubillex_frog-modal.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/rubillex_frog-modal
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
