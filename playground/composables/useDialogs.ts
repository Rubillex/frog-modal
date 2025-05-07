import { useMetaDialogs, type MetaDialogState } from './meta/useMetaDialogs';
import type { SimpleResponse } from '~/common/types/api';
import type { Filters } from '~/common/filters/types';
import type { RequestFormState } from '~/widgets/dialog/request-modal/request-modal.types';
import type { PresentationFormState } from '~/entities/business-center/ui/presentation-form/presentation-form.types';
import type { RentBlockResource, SaleBlockResource } from '~/common/types/client';
import type { NewsQuestionFormState } from '~/widgets/dialog/news-question-modal/news-question-modal.types';

type Dialogs = {
    searchModal: {
        result: { query: string; type: string; filters: string[] } | null;
    };
    metroSelectModal: {
        params: {
            metro: number[];
        };
        result: { selected: number[] } | null;
    };
    locationSelectModal: {
        params: {
            filters: Filters;
        };
        result: { selected: number[] } | null;
    };
    aboutCompanyModal: {};
    getPresentationModal: {
        params: {
            submitter(state: PresentationFormState): Promise<SimpleResponse<any>>;
        };
        result: true | null;
    };
    additionalFiltersModal: {
        params: {
            filters: Filters;
            formType: 'rent' | 'sale';
        };
        result: { filters: Filters; formType: 'rent' | 'sale' } | null;
    };
    filterSearchModal: {
        params: {
            getResultsCount: (query: string, filters: Filters) => Promise<number> | number;
            filters: Filters;
        };
        result: {
            query: string;
            filters: Filters;
        } | null;
    };
    requestModal: {
        params: {
            title: string;
            submitter(state: RequestFormState): Promise<SimpleResponse<any>>;
        };
        result: true | null;
    };
    newsQuestionModal: {
        params: {
            submitter(state: NewsQuestionFormState): Promise<SimpleResponse<any>>;
        };
        result: true | null;
    };
    confirmModal: {
        params: {
            action: string;
            title: string;
            text?: string;
        };
        result: true | null;
    };
    thanksModal: {};
    sortModal: {
        params: {
            options: { label: string; value: string | number | undefined }[];
            current: string | number | null | undefined;
        };
        result: null | {
            value: string | number | undefined | null;
        };
    };
    officeGallery: {
        params: {
            startFrom?: number;
            officeType: 'rent' | 'sale';
            office: RentBlockResource | SaleBlockResource;
        };
    };
};

const components = {
    searchModal: defineAsyncComponent(() => import('~/widgets/dialog/search-modal/index.vue')),
    metroSelectModal: defineAsyncComponent(() => import('~/widgets/dialog/metro-select/index.vue')),
    locationSelectModal: defineAsyncComponent(() => import('~/widgets/dialog/location-select/index.vue')),
    aboutCompanyModal: defineAsyncComponent(() => import('~/widgets/dialog/about-company/index.vue')),
    getPresentationModal: defineAsyncComponent(() => import('~/widgets/dialog/get-presentation/index.vue')),
    additionalFiltersModal: defineAsyncComponent(() => import('~/widgets/dialog/additional-filters/index.vue')),
    filterSearchModal: defineAsyncComponent(() => import('~/widgets/dialog/filter-search/index.vue')),
    requestModal: defineAsyncComponent(() => import('~/widgets/dialog/request-modal/index.vue')),
    confirmModal: defineAsyncComponent(() => import('~/widgets/dialog/confirm/index.vue')),
    thanksModal: defineAsyncComponent(() => import('~/widgets/dialog/thanks/index.vue')),
    sortModal: defineAsyncComponent(() => import('~/widgets/dialog/sort/index.vue')),
    officeGallery: defineAsyncComponent(() => import('~/widgets/dialog/office-gallery/index.vue')),
    newsQuestionModal: defineAsyncComponent(() => import('~/widgets/dialog/news-question-modal/index.vue')),
};

export type DialogState<Name extends keyof Dialogs> = MetaDialogState<Dialogs, Name>;

export const useDialogs = () =>
    useMetaDialogs<Dialogs>({
        components,
        fadeInDelay: 100,
        fadeOutDelay: 300,
    });
