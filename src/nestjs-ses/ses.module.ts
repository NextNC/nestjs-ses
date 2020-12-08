import { Module } from '@nestjs/common';
import { ConfigurationSes } from './configuration';
import { API_KEY, REGION, SECRET } from './tokens/tokens';
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
        { provide: API_KEY, useValue: config.apiKey },
        {
          provide: REGION,
          useValue: config.region,
        },
        { provide: SECRET, useValue: config.secret },
        SesService,
      ],
      exports: [SesService],
    };
  }
}
