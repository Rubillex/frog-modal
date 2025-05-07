import { DefineComponent, Ref } from "vue";
import { markRaw, ref, useState, watch } from "#imports";
import { IFrogModalConfig } from "../types";

const baseConfig = {
  closeOnOverlayClick: true,
  closeOnEsc: true,
};

export const useFrogModal = <T>(
  config?: IFrogModalConfig
): {
  setModal: (comp: DefineComponent | {}, opts?: T) => void;
  closeModal: () => void;
  isOpen: Ref<boolean>;
} => {
  const modal = useState<
    {
      component: DefineComponent | {};
      options: T | {};
      config: IFrogModalConfig;
    }[]
  >("frog-modal", () => []);
  const isOpen = ref<boolean>(false);

  const setter = (_cmp: DefineComponent | {}, _opts: T | {} = {}) =>
    modal.value?.push({
      component: markRaw(_cmp),
      options: _opts,
      config: { ...baseConfig, ...config },
    });
  const clearer = () => modal.value.pop();

  watch(
    () => modal.value.length,
    () => {
      isOpen.value = !!modal.value.length;
    }
  );

  return { setModal: setter, closeModal: clearer, isOpen };
};
