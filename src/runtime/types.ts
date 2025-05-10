import type { DefineComponent } from "vue";

export interface IFrogModalConfig {
  fadeInDelay?: number;
  fadeOutDelay?: number;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface modal {
  key: number;
  component: DefineComponent | {};
  options: any;
  config: IFrogModalConfig;
  isShown: boolean;
}
