import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  let localLoader: () => Promise<any>;
  let observer: IntersectionObserver | null = null;

  const onHover = (event: MouseEvent) => {
    localLoader();
    (event.currentTarget as HTMLElement).removeEventListener(
      "mouseenter",
      onHover
    );
  };

  nuxtApp.vueApp.directive("frog-modal-prefetch", {
    mounted(el, binding) {
      const loader = binding.value;
      const modifiers = binding.modifiers;

      localLoader = loader;

      if (typeof loader !== "function") {
        console.warn(
          "[v-frog-modal-prefetch] Expected loader to be a function."
        );
        return;
      }

      if (Object.keys(modifiers).length === 0) {
        el.addEventListener("mouseenter", onHover);
      }

      if (modifiers.visible && import.meta.client) {
        observer = new IntersectionObserver(([entry], obs) => {
          if (entry.isIntersecting) {
            localLoader();
            obs.disconnect();
          }
        });
        observer.observe(el);
      }
    },
    unmounted(el, binding) {
      const modifiers = binding.modifiers;

      if (Object.keys(modifiers).length === 0) {
        el.removeEventListener("mouseenter", onHover);
      }

      if (modifiers.visible && observer) {
        observer.disconnect();
      }
    },
  });
});
