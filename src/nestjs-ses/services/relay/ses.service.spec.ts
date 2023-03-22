import { Test, TestingModule } from '@nestjs/testing';
import { API_KEY, REGION, SECRET } from '../../tokens/tokens';
import { SesService } from './ses.service';

describe('SesService', () => {
  let service: SesService;

  describe('with all keys specified', () => {
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

    it('should have the apiKey', () => {
      expect(service['apiKey']).toEqual('config.apiKey');
    });
    it('should have the region', () => {
      expect(service['region']).toEqual('config.region');
    });
    it('should have the secret', () => {
      expect(service['secret']).toEqual('config.secret');
    });
  });

  describe('with no keys specified', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [SesService],
      }).compile();

      service = module.get<SesService>(SesService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
