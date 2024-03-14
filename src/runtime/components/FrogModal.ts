import './modal.css';
import {h, onMounted, onUnmounted, useState} from "#imports";
import {DefineComponent} from "vue";
import {useFrogModal} from "../composables/useFrogModal";
import {IFrogModalConfig} from "../types";

export const FrogModal = {
    setup() {
        const modal = useState<{ component: DefineComponent | {}; options: any; config: IFrogModalConfig } | null>('frog-modal');
        const [, closeModal] = useFrogModal();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.keyCode === 27 && modal.value?.config.closeOnEsc) closeModal();
        }

        onMounted(() => {
            document.addEventListener('keydown', onKeyDown)
        })

        onUnmounted(() => {
            document.removeEventListener('keydown', onKeyDown)
        })

        return () =>
            h('div', { class: modal.value ? 'frog-modal' : 'frog-modal hide' }, [
                h('div', { class: 'frog-modal__overlay', onClick: modal.value?.config.closeOnOverlayClick ? closeModal : undefined }),
                h('div', { class: 'frog-modal__content' }, [ h(modal.value?.component ?? 'span', modal.value?.options ? { ...modal.value.options } : {}, )]),
            ]);
    },
};
