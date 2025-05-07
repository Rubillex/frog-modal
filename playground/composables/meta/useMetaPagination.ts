type ResponseHandler<T, ResponseT> = {
    getPageItems: (response: ResponseT) => T[];
    getLastPage: (response: ResponseT) => number;
};

export type MetaPaginationSettings<ResponseT> = {
    key: string;
    fetcher: (pageIndex: number) => Promise<ResponseT>;
    loadOnSsr?: boolean;
    startPage?: number;
    onResponse?: (response: ResponseT) => void;
};

export function useMetaPagination<T, ResponseT>(handler: ResponseHandler<T, ResponseT>, settings: MetaPaginationSettings<ResponseT>) {
    const pages = useState<T[][]>('pages' + settings.key, () => []);
    const lastPage = useState('last-page' + settings.key, () => 1);
    const lastLoadedPage = useState('last-loaded-page' + settings.key, () => null as number | null);

    const isReplacingPage = ref(false);
    const isLoadingNewPage = ref(false);

    const items = computed(() => pages.value.flat());

    const isEndReached = computed(() => lastPage.value <= pages.value.length);

    const setPage = (page: number, items: T[]) => {
        if (items.length) {
            pages.value[page - 1] = items;
        } else {
            pages.value.splice(page - 1, 1);
        }
    };

    const loadPage = async (page: number) => {
        const response = await settings.fetcher(page);
        if (settings.onResponse) {
            settings.onResponse(response);
        }

        lastPage.value = handler.getLastPage(response);
        return handler.getPageItems(response);
    };

    const loadNextPage = async () => {
        if (isEndReached.value || isLoadingNewPage.value) return;

        isLoadingNewPage.value = true;

        const pageIndex = (lastLoadedPage.value ?? 0) + 1;
        const items = await loadPage(pageIndex);

        if (isLoadingNewPage.value) {
            setPage(pageIndex, items);
        }
        lastLoadedPage.value = pageIndex;
        isLoadingNewPage.value = false;
        return items;
    };

    const reset = (force = false) => {
        pages.value = [];
        if (force) {
            lastPage.value = 1;
            lastLoadedPage.value = null;
        }
        isLoadingNewPage.value = false;
        isReplacingPage.value = false;
    };

    const resetToPage = (page: number) => {
        lastLoadedPage.value = lastLoadedPage.value ? Math.min(page, lastLoadedPage.value) : null;
        pages.value = pages.value.slice(0, page);
        isLoadingNewPage.value = false;
        isReplacingPage.value = false;
    };

    const loadNthPage = async (page: number) => {
        isLoadingNewPage.value = true;
        lastLoadedPage.value = page;
        const items = await loadPage(page);

        if (isLoadingNewPage.value) {
            setPage(page, items);
        }

        lastLoadedPage.value = page;
        isLoadingNewPage.value = false;
        return items;
    };

    const invalidatePage = async (page: number) => {
        isReplacingPage.value = true;
        const items = await loadPage(page);

        if (isReplacingPage.value) {
            setPage(page, items);
        }

        isReplacingPage.value = false;
        return items;
    };

    if (settings.loadOnSsr !== false) {
        useAsyncData('ssr-load-page' + settings.key, () => {
            reset(true);
            return loadNextPage();
        });
    }

    return {
        pages,
        items,
        lastPage,
        lastLoadedPage,
        isReplacingPage,
        isLoadingNewPage,
        isEndReached,
        loadNextPage,
        loadNthPage,
        invalidatePage,
        reset,
        resetToPage,
    };
}
