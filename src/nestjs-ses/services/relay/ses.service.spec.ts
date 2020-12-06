import { Test, TestingModule } from '@nestjs/testing';
import { API_KEY, REGION, SECRET } from '../../tokens/tokens';
import { SesService } from './ses.service';

describe('SesService', () => {
  let service: SesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: API_KEY, useValue: 'config.apiKey' },
        {
          provide: REGION,
          useValue: 'config.region',
        },
        { provide: SECRET, useValue: 'config.secret' },
        SesService,
      ],
    }).compile();

    service = module.get<SesService>(SesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
