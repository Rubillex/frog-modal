import {
  defineNuxtModule,
  createResolver,
  addComponent,
  addImports,
  addPlugin,
} from "@nuxt/kit";
import { fileURLToPath } from "node:url";

// Module options TypeScript interface definition
export interface ModuleOptions {
  componentName: string;
  composableName: string;
  wrapperComponentName: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "rubillex_frog-modal",
    configKey: "rubillex_frog-modal",
  },
  defaults: {
    componentName: "FrogModal",
    composableName: "useFrogModal",
    wrapperComponentName: "FrogModalWrapper",
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    addPlugin(resolver.resolve("runtime/plugins/prefetch.ts"));

    addComponent({
      name: options.componentName,
      export: "default",
      filePath: resolver.resolve("runtime/components/FrogModal.vue"),
    });

    addComponent({
      name: options.wrapperComponentName,
      export: "default",
      filePath: resolver.resolve(
        "runtime/components/FrogModalWrapper/index.vue"
      ),
    });

    addImports({
      name: options.composableName,
      as: options.composableName,
      from: resolver.resolve("runtime/composables/useFrogModal"),
    });

    addImports({
      name: "useAsyncComponentWrapper",
      as: "useAsyncComponentWrapper",
      from: resolver.resolve("runtime/composables/useAsyncComponentWrapper"),
    });

    addImports({
      name: "FrogModalWrapperPosition",
      as: "FrogModalWrapperPosition",
      from: resolver.resolve(
        "runtime/components/FrogModalWrapper/wrapper.types"
      ),
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolver.resolve(runtimeDir), "composables");
      dirs.push(resolver.resolve(runtimeDir), "components");
    });
  },
});
