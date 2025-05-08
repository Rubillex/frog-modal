import { DefineComponent } from "vue";
import { markRaw, ref, useState, watch } from "#imports";
import { IFrogModalConfig, modal } from "../types";

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
  const modal = useState<modal[]>("frog-modals", () => []);
  const isOpen = ref<boolean>(false);

  function setModal<Props = {}, Emits extends Record<string, any[]> = {}>(
    comp: DefineComponent | {},
    opts?: Props & EmitsToOn<Emits>
  ) {
    modal.value?.push({
      component: markRaw(comp),
      options: opts ?? {},
      config: { ...baseConfig, ...config },
    });
  }

  function closeModal() {
    modal.value.pop();
  }

  function clearModals() {
    modal.value = [];
  }

  watch(
    () => modal.value.length,
    () => {
      isOpen.value = !!modal.value.length;
    }
  );

  return { setModal, closeModal, clearModals, isOpen };
}
