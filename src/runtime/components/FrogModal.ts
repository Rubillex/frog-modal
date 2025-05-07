import "./modal.css";
import { h, onMounted, onUnmounted, useState } from "#imports";
import { DefineComponent } from "vue";
import { useFrogModal } from "../composables/useFrogModal";
import { IFrogModalConfig } from "../types";

export const FrogModal = {
  setup() {
    const modal = useState<
      {
        component: DefineComponent | {};
        options: any;
        config: IFrogModalConfig;
      }[]
    >("frog-modal", () => []);
    const { closeModal } = useFrogModal();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27 && modal.value[0]?.config.closeOnEsc) closeModal();
    };

    onMounted(() => {
      document.addEventListener("keydown", onKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", onKeyDown);
    });

    return () =>
      h(
        "div",
        { class: modal.value?.length ? "frog-modal" : "frog-modal hide" },
        [
          ...modal.value.map((m, index) => [
            h(
              "div",
              { class: "frog-modal__entity", style: `z-index: ${index + 1}` },
              [
                h("div", {
                  class: "frog-modal__overlay",
                  onClick: m?.config?.closeOnOverlayClick
                    ? closeModal
                    : undefined,
                }),
                h("div", { class: "frog-modal__content" }, [
                  h(m?.component ?? "span", m?.options ? { ...m.options } : {}),
                ]),
              ]
            ),
          ]),
        ]
      );
  },
};
