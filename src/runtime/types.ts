import { DefineComponent } from "vue";

export interface IFrogModalConfig {
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export interface modal {
  component: DefineComponent | {};
  options: any;
  config: IFrogModalConfig;
}
