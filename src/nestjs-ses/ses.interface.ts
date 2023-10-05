import { FactoryProvider, ModuleMetadata, Type } from "@nestjs/common";

export const SES_CONFIG_OPTIONS = "SES_CONFIG_OPTIONS";

export interface SesOptions {
  secret: string;
  apiKey: string;
  region: string;
}

// export type SesAsyncOptions = Pick<ModuleMetadata, "imports"> &
//   Pick<FactoryProvider<SesOptions>, "useFactory" | "inject">;

export interface SesOptionsFactory {
  createSesOptions(): Promise<SesOptions> | SesOptions;
}

export interface SesAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * The `useExisting` syntax allows you to create aliases for existing providers.
   */
  useExisting?: Type<SesOptionsFactory>;
  /**
   * The `useClass` syntax allows you to dynamically determine a class
   * that a token should resolve to.
   */
  useClass?: Type<SesOptionsFactory>;
  /**
   * The `useFactory` syntax allows for creating providers dynamically.
   */
  useFactory?: (...args: any[]) => Promise<SesOptions> | SesOptions;
  /**
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: any[];
}

