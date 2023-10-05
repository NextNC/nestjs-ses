import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SES_CONFIG_OPTIONS, SesAsyncOptions, SesOptions, SesOptionsFactory } from './ses.interface';
import { SesService } from './services/relay/ses.service';
import { createSesProviders } from './ses.providers';
@Module({})
export class SesModule {
  public static forRoot(options: SesOptions): DynamicModule {

    const providers = [...createSesProviders(options), SesService];

    return {
      module: SesModule,
      providers,
      exports: [SesService],
    };
  }

  // public static forRootAsync(options: SesAsyncOptions): DynamicModule {
  //   return {
  //     module: SesModule,
  //     imports: options.imports,
  //     providers: [
  //       {
  //         provide: SES_CONFIG_OPTIONS,
  //         useFactory: options.useFactory,
  //         inject: options.inject
  //       },
  //       SesService,
  //     ],
  //     exports: [SesService],
  //   };
  // }

  public static forRootAsync(options: SesAsyncOptions): DynamicModule {
    const providers = [...this.createAsyncProviders(options), SesService];
    return {
      module: SesModule,
      imports: options.imports || [],
      providers,
      exports: providers,
    };
  }
  private static createAsyncProviders(options: SesAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: SesAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SES_CONFIG_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SES_CONFIG_OPTIONS,
      useFactory: async (optionsFactory: SesOptionsFactory) =>
        await optionsFactory.createSesOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
