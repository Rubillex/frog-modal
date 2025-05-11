<template>
  <div>
    <FrogModal />
    <button v-frog-modal-prefetch="testModalLoader" @click="openModal()">
      Open modal
    </button>
    <span>isOpen: {{ isOpen }}</span>
  </div>
</template>

<script lang="ts" setup>
import FrogModal from "../src/runtime/components/FrogModal.vue";
import { useFrogModal } from "../src/runtime/composables/useFrogModal";
import { useAsyncComponentWrapper } from "../src/runtime/composables/useAsyncComponentWrapper";

const { component: TestModal, loader: testModalLoader } =
  useAsyncComponentWrapper(() => import("~/components/TestModal/index.vue"));

import type {
  TestModalEmits,
  TestModalProps,
} from "./components/TestModal/test-modal.types";

const { setModal, isOpen } = useFrogModal();

const handleClick = (message: string) => {
  alert(message);
};

const openModal = () => {
  setModal<TestModalProps, TestModalEmits>(TestModal, {
    text: "asd",
    onCustomEmit: handleClick,
  });
};
</script>

<style>
:root {
  --frog-modal-overlay-background: red;
}
</style>
