import {DefineComponent, Ref} from "vue";
import {markRaw, ref, useState, watch} from "#imports";
import {IFrogModalConfig} from "../types";

const baseConfig = {
    closeOnOverlayClick: true,
    closeOnEsc: true
}

export const useFrogModal = <T>(config?: IFrogModalConfig): [(comp: DefineComponent | {}, opts?: T) => void, () => void, Ref<boolean>] => {
    const modal = useState<{ component: DefineComponent | {}; options: T | {}; config: IFrogModalConfig } | null>('frog-modal');
    const isOpen = ref<boolean>(false);

    const setter = (_cmp: DefineComponent | {}, _opts: T | {} = {}) => modal.value = {component: markRaw(_cmp), options: _opts, config: { ...baseConfig, ...config }};
    const clearer = () => modal.value = null;

    watch(() => modal.value, () => {
        isOpen.value = !!modal.value;
    })

    return [setter, clearer, isOpen];
}
