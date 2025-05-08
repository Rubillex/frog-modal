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

## Usage with Strict Typing

### 1. Basic usage with strict prop and emit typing

```ts
import { useFrogModal } from "frog-modal";
import TestModal from "~/components/TestModal/index.vue";
import type {
  TestModalProps,
  TestModalEmits,
} from "./components/TestModal/test-modal.types";

const { setModal, closeModal, clearModals, isOpen } = useFrogModal();

const handleClick = (message: string) => alert(message);

setModal<TestModalProps, TestModalEmits>(TestModal, {
  text: "Hello!",
  onCustomEmit: handleClick,
});

// To close the last opened modal:
closeModal();

// To close all open modals at once:
clearModals();
```

- The first generic is the props type (required).
- The second generic is the emits type (optional, defaults to `{}`).
- All event handlers (onXxx) are required if present in the emits type.
- Use `closeModal()` to close the last opened modal.
- Use `clearModals()` to close all open modals at once.

### 2. Advantages

- Strict prop typing for all your modals
- Optional strict event typing for all or some event handlers
- TypeScript errors are clear and easy to understand

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
