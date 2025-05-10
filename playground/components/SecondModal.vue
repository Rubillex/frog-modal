<template>
  <FrogModalWrapper
    :desktop-position="FrogModalWrapperPosition.CENTER"
    :mobile-position="FrogModalWrapperPosition.BOTTOM"
    mobile-swipe-to-close
    class="modal"
  >
    <div class="modal">
      <p>Hello! It's second modal</p>
    </div>
  </FrogModalWrapper>
</template>

<script setup lang="ts">
import { FrogModalWrapperPosition } from "../../src/runtime/components/FrogModalWrapper/wrapper.types";
import FrogModalWrapper from "../../src/runtime/components/FrogModalWrapper/index.vue";
</script>

<style scoped>
.modal {
  min-height: 150px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #888;
}
</style>
