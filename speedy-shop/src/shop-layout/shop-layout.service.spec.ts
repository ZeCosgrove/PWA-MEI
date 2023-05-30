import { Test, TestingModule } from '@nestjs/testing';
import { ShopLayoutService } from './shop-layout.service';

describe('ShopLayoutService', () => {
  let service: ShopLayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopLayoutService],
    }).compile();

    service = module.get<ShopLayoutService>(ShopLayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
