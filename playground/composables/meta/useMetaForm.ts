import { getNestedEntries, isEmptyObject, mapNestedValues, setNestedValue } from '~/common/helpers/objectUtils';

const fillWithStrings = <T extends object>(obj: T) => {
    type FilledWithStrings<T extends object> = {
        [K in keyof T]: T[K] extends object ? FilledWithStrings<T[K]> : string;
    };

    return mapNestedValues(obj, (v) => (isEmptyObject(v) ? {} : '')) as FilledWithStrings<T>;
};

type FieldError = {
    message: string;
    path?: (string | number)[];
};

type Pretransform<FieldsT> = {
    success: boolean;
    state?: FieldsT;
    errors?: FieldError[] | null;
};

type MetaFormSettings<FieldsT, ResponseT> = {
    prepareState?: (state: FieldsT) => Pretransform<FieldsT> | void | undefined;
    getResponseFieldErrors: (response: ResponseT) => FieldError[] | void | undefined;
};

export const useMetaForm = <ResponseT, FieldsT extends object>(settings: MetaFormSettings<FieldsT, ResponseT>, fields: FieldsT) => {
    const pending = ref(false);
    const state = ref(structuredClone(fields));
    const fieldErrors = ref(fillWithStrings(fields));
    const globalError = ref('');

    const resetState = () => {
        state.value = structuredClone(fields);
    };

    const resetErrors = () => {
        fieldErrors.value = fillWithStrings(fields);
        globalError.value = '';
    };

    const reset = () => {
        resetState();
        resetErrors();
    };

    const hasErrors = computed(() => {
        return (
            Boolean(globalError.value) || getNestedEntries(fieldErrors.value).some(([value]) => typeof value === 'string' && Boolean(value))
        );
    });

    const setErrors = (errors: FieldError[] | null | undefined) => {
        errors?.forEach((error) => {
            if (error.path && error.path.length) {
                setNestedValue(fieldErrors.value, error.path, error.message);
            } else {
                globalError.value = error.message;
            }
        });
    };

    watch(state, () => (globalError.value = ''), { deep: true });

    const submit = async (submitter: (state: FieldsT) => Promise<any>) => {
        if (pending.value) {
            return;
        }

        const transformedState: Pretransform<FieldsT> = settings.prepareState?.(state.value) ?? {
            success: true,
            state: state.value,
        };

        if (transformedState.success && transformedState.state) {
            pending.value = true;
            return submitter(transformedState.state)
                .catch(({ data: response }: any) => setErrors(settings.getResponseFieldErrors(response) ?? []))
                .finally(() => (pending.value = false));
        } else {
            setErrors(transformedState.errors);
        }
    };

    const getAllErrors = (): string[] => {
        return getNestedEntries(fieldErrors.value)
            .map(([value]) => value)
            .filter((value) => typeof value === 'string' && Boolean(value))
            .concat(globalError.value ? [globalError.value] : []);
    };

    watch(state, () => {
        if (hasErrors.value) resetErrors();
    });

    return {
        state,
        defaultState: fields,
        fieldErrors,
        globalError,
        hasErrors,
        pending,
        submit,
        reset,
        resetState,
        resetErrors,
        getAllErrors,
    };
};
