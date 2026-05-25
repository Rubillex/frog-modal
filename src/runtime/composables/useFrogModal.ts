import type { DefineComponent } from "vue";
import { markRaw, useState, watch } from "#imports";
import type { IFrogModalConfig, modal } from "../types";

const BASE_CONFIG: Required<
  Pick<IFrogModalConfig, "closeOnOverlayClick" | "closeOnEsc">
> = {
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
  const isOpen = useState<boolean>("frog-modal-is-open", () => false);

  const mergedConfig = {
    ...BASE_CONFIG,
    ...config,
  };

  function isModalOpen(key: string | number): boolean {
    return modals.value.some((modal) => modal.key === key && modal.isShown);
  }

  function setModal<Props = {}, Emits extends Record<string, any[]> = {}>(
    comp: DefineComponent | {},
    opts?: Props & EmitsToOn<Emits> & { key?: string | number },
  ): string | number {
    const { key: customKey, ...restOpts } = (opts ?? {}) as {
      key?: string | number;
    } & Record<string, any>;
    const key: string | number = customKey ?? Date.now();

    modals.value?.push({
      key,
      component: markRaw(comp),
      options: restOpts,
      config: mergedConfig,
      isShown: false,
    });

    setTimeout(() => {
      modals.value[modals.value.length - 1].isShown = true;
    }, config?.fadeInDelay ?? 0);

    return key;
  }

  function removeModal(key: string | number, delay = 0) {
    setTimeout(() => {
      modals.value = modals.value.filter((modal) => modal.key !== key);
    }, delay);
  }

  function closeModal(key?: string | number) {
    const target =
      key === undefined
        ? modals.value[modals.value.length - 1]
        : modals.value.find((m) => m.key === key);

    if (!target || !target.isShown) return;

    target.isShown = false;
    removeModal(target.key, target.config.fadeOutDelay ?? 300);
  }

  function clearModals() {
    modals.value = [];
  }

  watch(
    () => modals.value.length,
    () => {
      isOpen.value = !!modals.value.length;
    },
  );

  return { setModal, closeModal, clearModals, isModalOpen, isOpen, modals };
}
