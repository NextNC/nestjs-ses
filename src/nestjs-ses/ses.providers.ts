import { Provider } from "@nestjs/common";
import { SES_CONFIG_OPTIONS, SesOptions } from "./ses.interface";

export function createSesProviders(options: SesOptions): Provider[] {
  return [{
    provide: SES_CONFIG_OPTIONS,
    useValue: options,
  }];
}