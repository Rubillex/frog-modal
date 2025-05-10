<template>
  <FrogModalWrapper
    :desktop-position="FrogModalWrapperPosition.CENTER"
    :mobile-position="FrogModalWrapperPosition.BOTTOM"
    mobile-swipe-to-close
    class="modal"
  >
    <template #header>
      <div>qweewqewq</div>
    </template>
    <p>Hello! It's awesome frog-modal</p>
    <p>Custom text from prop: {{ text }}</p>
    <button @click="emit('customEmit', 'Custom message')">
      Click for custom emit
    </button>
    <button @click="setModal(SecondModal)">Open Second modal</button>
  </FrogModalWrapper>
</template>

<script lang="ts" setup>
import SecondModal from "~/components/SecondModal.vue";
import { useFrogModal } from "../../../src/runtime/composables/useFrogModal";
import type { TestModalProps, TestModalEmits } from "./test-modal.types";
import { FrogModalWrapperPosition } from "../../../src/runtime/components/FrogModalWrapper/wrapper.types";
import FrogModalWrapper from "../../../src/runtime/components/FrogModalWrapper/index.vue";

defineProps<TestModalProps>();
const emit = defineEmits<TestModalEmits>();

const { setModal } = useFrogModal();
</script>

<style scoped>
.modal {
  min-width: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #888;

  padding: 16px;
}
</style>
