import type { Component, Raw } from 'vue';

type Dialogs = {
    [key: string]: {
        params?: Record<string, any>;
        result?: any;
    };
};

type DialogResult<T extends Dialogs, Name extends keyof T> = T[Name] extends { result: any } ? T[Name]['result'] : void;

type DialogParams<T extends Dialogs, Name extends keyof T> = T[Name] extends { params: any } ? [params: T[Name]['params']] : [];

export type MetaDialogState<T extends Dialogs, Name extends keyof T> = {
    id: number;
    name: Name;
    shown: boolean;
    params: DialogParams<T, Name>[0];
    component: Raw<Component>;
    close: (result: DialogResult<T, Name>) => void;
};

type MetaDialogsSettings<T extends Dialogs> = {
    fadeInDelay?: number;
    fadeOutDelay?: number;
    components: Record<keyof T, Component>;
};

type DialogPromise<T extends Dialogs, Name extends keyof T> = Promise<DialogResult<T, Name>> & {
    close: (result: DialogResult<T, Name>) => void;
};

export const useMetaDialogs = <T extends Dialogs>(settings: MetaDialogsSettings<T>) => {
    const dialogIdCounter = useState('dialog-id-counter', () => 0);
    const openDialogs = useState<MetaDialogState<T, any>[]>('open-dialogs', () => []);

    const setDialogShown = (id: number, shown: boolean) => {
        const dialog = openDialogs.value.find((dialog) => dialog.id === id);
        if (dialog) {
            dialog.shown = shown;
        }
    };
    const removeDialog = (id: number) => (openDialogs.value = openDialogs.value.filter((dialog) => dialog.id !== id));

    const open = <Name extends keyof T>(name: Name, ...params: DialogParams<T, Name>) => {
        const id = dialogIdCounter.value++;

        let resolve: (result: DialogResult<T, Name>) => void;
        const promise = new Promise((res) => (resolve = res)) as any;

        promise.close = (res: DialogResult<T, Name>) => {
            resolve(res);
            setDialogShown(id, false);
            setTimeout(() => removeDialog(id), settings.fadeOutDelay ?? 0);
        };

        openDialogs.value.push({
            id,
            name,
            shown: false,
            params: params[0],
            component: markRaw(settings.components[name] as Component),
            close: promise.close,
        });
        setTimeout(() => setDialogShown(id, true), settings.fadeInDelay ?? 0);

        return promise as DialogPromise<T, Name>;
    };

    const isAnyOpen = <Name extends keyof T>(name?: Name) => {
        if (name === undefined) {
            return openDialogs.value.length > 0;
        }
        return openDialogs.value.some((state) => state.name === name);
    };

    const closeAll = <Name extends keyof T>(name: Name, result: DialogResult<T, Name>) => {
        for (const dialog of openDialogs.value) {
            if (dialog.name === name) {
                dialog.close(result);
            }
        }
    };

    const closeLast = <Name extends keyof T>(name: Name, result: DialogResult<T, Name>) => {
        openDialogs.value.findLast((dialog) => dialog.name === name)?.close(result);
    };

    return {
        open,
        isAnyOpen,
        closeAll,
        closeLast,
        openDialogs,
    };
};
