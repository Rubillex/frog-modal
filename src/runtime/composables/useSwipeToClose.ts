import { ref } from "#imports";

export const useSwipeToClose = (closeFunction: () => void) => {
  const startY = ref(0);
  const startX = ref(0);
  const swipeDistanceY = ref(0);
  const swipeDistanceX = ref(0);
  const isSwiping = ref(false);
  const isVerticalSwipe = ref<boolean | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (window.screen.width > 768) return;
    startY.value = e.touches[0].clientY;
    startX.value = e.touches[0].clientX;
    isSwiping.value = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (window.screen.width > 768) return;
    if (!isSwiping.value) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    swipeDistanceX.value = currentX - startX.value;
    const yDistanceTemp = currentY - startY.value;

    if (Math.abs(swipeDistanceX.value) > 10 && isVerticalSwipe.value === null) {
      isVerticalSwipe.value = false;
    }

    if (Math.abs(yDistanceTemp) > 10 && isVerticalSwipe.value === null) {
      isVerticalSwipe.value = true;
    }

    if (isVerticalSwipe.value) {
      swipeDistanceY.value = yDistanceTemp;
    } else {
      swipeDistanceY.value = 0;
    }
  };

  const handleTouchEnd = () => {
    if (window.screen.width > 768) return;
    isSwiping.value = false;
    if (swipeDistanceY.value > 100) {
      closeFunction();
    }
    swipeDistanceY.value = 0;
    swipeDistanceX.value = 0;
    isVerticalSwipe.value = null;
  };

  return {
    swipeDistance: swipeDistanceY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSwiping,
  };
};
