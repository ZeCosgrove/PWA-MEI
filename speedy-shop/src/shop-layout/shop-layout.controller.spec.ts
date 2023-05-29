import { Test, TestingModule } from '@nestjs/testing';
import { ShopLayoutController } from './shop-layout.controller';
import { ShopLayoutService } from './shop-layout.service';

describe('ShopLayoutController', () => {
  let controller: ShopLayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopLayoutController],
      providers: [ShopLayoutService],
    }).compile();

    controller = module.get<ShopLayoutController>(ShopLayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
