import { defineAsyncComponent } from "vue";

export function useAsyncComponentWrapper(loader: () => Promise<any>): {
  component: ReturnType<typeof defineAsyncComponent>;
  loader: () => Promise<any>;
} {
  return {
    component: defineAsyncComponent({
      loader,
      delay: 200,
      timeout: 5000,
    }),
    loader,
  };
}
