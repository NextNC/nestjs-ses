import { Module } from '@nestjs/common';
import { ConfigurationSes } from './configuration';
import { AKI_KEY, REGION, SECRET } from './tokens/tokens';
import { SesService } from './services/relay/ses.service';

@Module({})
export class SesModule {
  public static forRoot(config: ConfigurationSes) {
    return {
      module: SesModule,
      //   controllers: [
      //     ...controllers,
      //   ],
      providers: [
        { provide: AKI_KEY, useValue: config.AKI_KEY },
        {
          provide: REGION,
          useValue: config.REGION,
        },
        { provide: SECRET, useValue: config.SECRET },
        SesService,
      ],
      exports: [SesService],
    };
  }
}
