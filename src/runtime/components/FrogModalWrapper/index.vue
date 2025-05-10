<template>
  <div
    class="frog-modal-wrapper"
    :class="[
      isMobile ? `mobile-${mobilePosition}` : `desktop-${desktopPosition}`,
      { 'is-swiping': isSwiping },
    ]"
    :style="
      isMobile &&
      mobileSwipeToClose &&
      mobilePosition === FrogModalWrapperPosition.BOTTOM &&
      isShown
        ? {
            transform: `translate(-50%, ${
              swipeDistance < 0 ? 0 : swipeDistance
            }px)`,
          }
        : undefined
    "
  >
    <div
      v-if="
        isMobile &&
        mobileSwipeToClose &&
        mobilePosition === FrogModalWrapperPosition.BOTTOM
      "
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot name="header">
        <div class="frog-modal-wrapper__header">
          <div class="frog-modal-wrapper__header-close" />
        </div>
      </slot>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  type FrogModalWrapperProps,
  FrogModalWrapperPosition,
} from "./wrapper.types";
import { onMounted, onUnmounted, ref } from "#imports";
import { useSwipeToClose } from "../../composables/useSwipeToClose";
import { useFrogModal } from "../../composables/useFrogModal";

const {
  desktopPosition = FrogModalWrapperPosition.CENTER,
  mobilePosition = FrogModalWrapperPosition.CENTER,
  mobileSwipeToClose = false,
} = defineProps<FrogModalWrapperProps>();

const { closeModal, modals } = useFrogModal();

const {
  swipeDistance,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  isSwiping,
} = useSwipeToClose(() => closeModal());

const isShown = defineModel<boolean>("isShown", { required: false });

const isMobile = ref(window.innerWidth < 1024);

const checkScreenWidth = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenWidth);
});
</script>

<style src="./wrapper.styles.css"></style>
