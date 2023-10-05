import { Test, TestingModule } from '@nestjs/testing';
import { SesService } from './ses.service';
import { SES_CONFIG_OPTIONS } from '../../ses.interface';

describe('SesService', () => {
  let service: SesService;

  describe('with all keys specified', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: SES_CONFIG_OPTIONS, useValue: { apiKey: 'config.apiKey', region: 'config.region', secret: 'config.secret' } },
          SesService,
        ],
      }).compile();

      service = module.get<SesService>(SesService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have the apiKey', () => {
      expect(service['ses']['key']).toEqual('config.apiKey');
    });
    it('should have the region', () => {
      expect(service['ses']['amazon']).toEqual('https://email.config.region.amazonaws.com');
    });
    it('should have the secret', () => {
      expect(service['ses']['secret']).toEqual('config.secret');
    });
  });
});
