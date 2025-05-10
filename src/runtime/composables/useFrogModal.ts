import type { DefineComponent } from "vue";
import { markRaw, ref, useState, watch } from "#imports";
import type { IFrogModalConfig, modal } from "../types";

const baseConfig = {
  closeOnOverlayClick: true,
  closeOnEsc: true,
};

// Утилита для преобразования эмитов в onXxx-колбэки
export type EmitsToOn<T> = {
  [K in keyof T as K extends string ? `on${Capitalize<K>}` : never]: (
    ...args: T[K] extends any[] ? T[K] : never
  ) => void;
};

export function useFrogModal(config?: IFrogModalConfig) {
  const modals = useState<modal[]>("frog-modals", () => []);
  const isOpen = ref<boolean>(false);

  function setModal<Props = {}, Emits extends Record<string, any[]> = {}>(
    comp: DefineComponent | {},
    opts?: Props & EmitsToOn<Emits>
  ) {
    modals.value?.push({
      key: Date.now(),
      component: markRaw(comp),
      options: opts ?? {},
      config: { ...baseConfig, ...config },
      isShown: false,
    });

    setTimeout(() => {
      modals.value[modals.value.length - 1].isShown = true;
    }, config?.fadeInDelay ?? 0);
  }

  function closeModal() {
    modals.value[modals.value.length - 1].isShown = false;

    setTimeout(() => {
      modals.value.pop();
    }, config?.fadeOutDelay ?? 300);
  }

  function clearModals() {
    modals.value = [];
  }

  watch(
    () => modals.value.length,
    () => {
      isOpen.value = !!modals.value.length;
    }
  );

  return { setModal, closeModal, clearModals, isOpen, modals };
}
