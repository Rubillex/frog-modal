<template>
  <div :class="modals?.length ? 'frog-modal' : 'frog-modal hide'">
    <div
      v-for="(m, index) in modals"
      :key="index"
      class="frog-modal__entity"
      :style="`z-index: ${index + 1}`"
    >
      <div
        class="frog-modal__overlay"
        :class="{ shown: m.isShown }"
        @click="m?.config?.closeOnOverlayClick ? closeModal() : undefined"
      />
      <component
        :is="m?.component ?? 'span'"
        v-bind="m?.options || {}"
        :class="{ shown: m.isShown }"
        v-model:is-shown="m.isShown"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import "./modal.css";
import { onMounted, onUnmounted } from "#imports";
import { useFrogModal } from "../composables/useFrogModal";

const { closeModal, modals } = useFrogModal();

const onKeyDown = (e: KeyboardEvent) => {
  if (e.keyCode === 27 && modals.value[0]?.config.closeOnEsc) closeModal();
};

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeyDown);
});
</script>
