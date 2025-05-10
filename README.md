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

A module for simplifying modal window management in Nuxt.js applications.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Custom Modal Component Structure](#custom-modal-component-structure)
- [Styling](#styling)
- [TypeScript](#typescript)
- [API](#api)
- [Examples](#examples)
- [License](#license)

## Installation

```bash
# Using pnpm
pnpm add rubillex_frog-modal

# Using yarn
yarn add rubillex_frog-modal

# Using npm
npm install rubillex_frog-modal
```

## Quick Start

1. Add `rubillex_frog-modal` to the `modules` section of your `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  modules: ["rubillex_frog-modal"],
});
```

2. Add the `FrogModal` component to your `app.vue`:

```vue
<template>
  <div>
    <FrogModal />
    <NuxtPage />
  </div>
</template>
```

## Usage

```typescript
const { setModal, closeModal, clearModals, isOpen } = useFrogModal();

// Opening a modal window
setModal(YourModalComponent, {
  // props
});

// Closing the last opened modal window
closeModal();

// Closing all modal windows
clearModals();
```

## Custom Modal Component Structure

Your custom modal component should be wrapped with `FrogModalWrapper` component. Here's an example of a basic modal component:

```vue
<template>
  <FrogModalWrapper
    desktop-position="center"
    mobile-position="bottom"
    mobile-swipe-to-close
    class="modal"
  >
    <!-- Optional header slot -->
    <template #header>
      <div class="modal-header">Your Header</div>
    </template>

    <!-- Modal content -->
    <div class="modal-content">
      <p>Your modal content here</p>
      <button @click="emit('customEmit', 'Some data')">
        Trigger Custom Event
      </button>
    </div>
  </FrogModalWrapper>
</template>

<script lang="ts" setup>
import { useFrogModal } from "frog-modal";
import type { YourModalProps, YourModalEmits } from "./your-modal.types";

// Define props and emits
defineProps<YourModalProps>();
const emit = defineEmits<YourModalEmits>();

// Access modal methods if needed
const { setModal } = useFrogModal();
</script>

<style scoped>
.modal {
  /* Your modal styles */
  min-width: 250px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
}
</style>
```

### FrogModalWrapper Props

| Prop               | Type                     | Default | Description                                               |
| ------------------ | ------------------------ | ------- | --------------------------------------------------------- |
| desktopPosition    | FrogModalWrapperPosition | .CENTER | Modal position on desktop (see available positions below) |
| mobilePosition     | FrogModalWrapperPosition | .CENTER | Modal position on mobile (see available positions below)  |
| mobileSwipeToClose | boolean                  | false   | Enable swipe-to-close on mobile devices                   |

### Available Modal Positions

The modal can be positioned using the `FrogModalWrapperPosition` enum, which is automatically imported by the module:

```typescript
// FrogModalWrapperPosition is automatically imported
// No need to import it manually

enum FrogModalWrapperPosition {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  FULL = "full",
}
```

Example usage:

```vue
<template>
  <FrogModalWrapper
    :desktop-position="FrogModalWrapperPosition.CENTER"
    :mobile-position="FrogModalWrapperPosition.BOTTOM"
  >
    <!-- Modal content -->
  </FrogModalWrapper>
</template>
```

Available positions:

- `TOP` - Modal appears from the top of the screen
- `BOTTOM` - Modal appears from the bottom of the screen
- `LEFT` - Modal appears from the left side
- `RIGHT` - Modal appears from the right side
- `CENTER` - Modal appears in the center of the screen
- `FULL` - Modal takes up the full screen

### Animation Configuration

The timing of modal animations (fade in/out) can be configured through the `useFrogModal` composable:

```typescript
const { setModal } = useFrogModal({
  fadeInDelay: 200, // Delay before fade in animation starts (in ms)
  fadeOutDelay: 200, // Delay before fade out animation starts (in ms)
});
```

These parameters can be set globally when initializing the composable, and they will apply to all modals opened using this instance.

Note: The actual animation duration and timing function are controlled by CSS variables `--frog-modal-animation-duration` and `--frog-modal-animation-timing`.

### Component Features

#### Header Slot

The `header` slot is specifically designed for mobile devices when using `mobileSwipeToClose`. It provides a draggable area at the top of the modal that users can swipe down to close the modal. This is particularly useful for bottom-positioned modals on mobile devices.

#### Mobile Swipe to Close

When `mobileSwipeToClose` is enabled:

- On mobile devices, users can swipe down to close the modal
- The header slot becomes a draggable area
- This feature is most commonly used with `bottom` position on mobile
- Provides a native-feeling interaction on touch devices

### Component Structure Guidelines

1. Always wrap your modal content with `FrogModalWrapper`
2. Use the `header` slot for custom header content, especially when implementing swipe-to-close on mobile
3. Place your main modal content directly inside the wrapper
4. Define your props and emits types for TypeScript support
5. Use the `useFrogModal` composable if you need to open nested modals

## Styling

You can customize the appearance of modal windows in two ways:

### Using CSS Variables

```css
:root {
  /* Modal overlay */
  --frog-modal-transition: visibility 0.2s, opacity 0.2s;
  --frog-modal-overlay-opacity: 0.5;
  --frog-modal-overlay-background: #0e151e;

  /* Animation timing */
  --frog-modal-animation-duration: 0.3s;
  --frog-modal-animation-timing: ease-in-out;
}
```

These variables control:

- `--frog-modal-animation-duration`: Duration of modal animations (default: 0.3s)
- `--frog-modal-animation-timing`: Timing function for animations (default: ease-in-out)

### Using CSS Classes

The modal system uses the following class structure:

```css
/* Main modal container */
.frog-modal {
  /* Styles for the visible modal container */
}

.frog-modal.hide {
  /* Styles for the hidden modal container */
}

/* Individual modal entity */
.frog-modal__entity {
  /* Styles for each modal instance */
}

/* Modal overlay */
.frog-modal__overlay {
  /* Styles for the backdrop */
  background-color: var(--frog-modal-overlay-background, #0e151e);
  opacity: var(--frog-modal-overlay-opacity, 0.5);
}
```

The class structure follows this hierarchy:

1. `.frog-modal` - Main container for all modals
2. `.frog-modal__entity` - Container for each individual modal instance
3. `.frog-modal__overlay` - Backdrop overlay for each modal
4. Your custom modal component classes

Each modal instance gets a unique z-index based on its position in the stack, ensuring proper layering of multiple modals.

### Animation Configuration

The timing of modal animations (fade in/out) can be configured through the `useFrogModal` composable:

```typescript
const { setModal } = useFrogModal({
  fadeInDelay: 200, // Delay before fade in animation starts (in ms)
  fadeOutDelay: 200, // Delay before fade out animation starts (in ms)
});
```

These parameters can be set globally when initializing the composable, and they will apply to all modals opened using this instance.

Note: The actual animation duration and timing function are controlled by CSS variables `--frog-modal-animation-duration` and `--frog-modal-animation-timing`.

## TypeScript

### Type Definitions

For proper TypeScript support, define your modal's props and emits types in a separate file:

```typescript
// your-modal.types.ts
export type YourModalProps = {
  text: string;
  // other props...
};

export type YourModalEmits = {
  customEmit: [message: string];
  // other emits...
};
```

### Basic Usage with TypeScript

```vue
<template>
  <FrogModalWrapper
    :desktop-position="FrogModalWrapperPosition.BOTTOM"
    :mobile-position="FrogModalWrapperPosition.BOTTOM"
    mobile-swipe-to-close
    class="modal"
  >
    <p>{{ text }}</p>
    <button @click="emit('customEmit', 'Custom message')">
      Trigger Custom Event
    </button>
  </FrogModalWrapper>
</template>

<script lang="ts" setup>
import { useFrogModal } from "frog-modal";
import type { YourModalProps, YourModalEmits } from "./your-modal.types";

// Define props and emits using the types
defineProps<YourModalProps>();
const emit = defineEmits<YourModalEmits>();

// Access modal methods if needed
const { setModal } = useFrogModal();
</script>
```

### Opening Typed Modals

When opening a modal, TypeScript will provide type checking for both props and emits:

```typescript
const { setModal } = useFrogModal();

// TypeScript will ensure all required props are provided
setModal<YourModalProps, YourModalEmits>(YourModal, {
  text: "Hello!", // Required prop
  onCustomEmit: (message: string) => {
    // TypeScript knows the exact type of the message parameter
    console.log(message);
  },
});
```

### Type Safety Features

- Props type checking ensures all required props are provided
- Emits type checking ensures event handlers match the defined types
- TypeScript will show errors if:
  - Required props are missing
  - Wrong prop types are provided
  - Event handlers don't match the defined types
  - Wrong number of arguments are passed to event handlers

## API

### useFrogModal

#### Parameters

| Parameter           | Type    | Default | Description                                  |
| ------------------- | ------- | ------- | -------------------------------------------- |
| closeOnOverlayClick | boolean | true    | Close modal window when clicking the overlay |
| closeOnEsc          | boolean | true    | Close modal window when pressing Esc         |

#### Methods

| Method      | Description                         |
| ----------- | ----------------------------------- |
| setModal    | Opens a modal window                |
| closeModal  | Closes the last opened modal window |
| clearModals | Closes all open modal windows       |
| isOpen      | Modal window state (boolean)        |

## Examples

### Basic Usage

```typescript
const { setModal } = useFrogModal();

// Opening a simple modal window
setModal(SimpleModal, {
  title: "Title",
  content: "Content",
});
```

### Usage with Events

```typescript
const { setModal } = useFrogModal();

setModal(FormModal, {
  onSubmit: (data) => {
    console.log(data);
  },
});
```

## License

MIT

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/rubillex_frog-modal/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/rubillex_frog-modal
[npm-downloads-src]: https://img.shields.io/npm/dm/rubillex_frog-modal.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/rubillex_frog-modal
[license-src]: https://img.shields.io/npm/l/rubillex_frog-modal.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/rubillex_frog-modal
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
