import { Injectable } from '@nestjs/common';
import { CreateShopLayoutDto } from './dto/create-shop-layout.dto';
import { UpdateShopLayoutDto } from './dto/update-shop-layout.dto';

@Injectable()
export class ShopLayoutService {
  create(createShopLayoutDto: CreateShopLayoutDto) {
    return 'This action adds a new shopLayout';
  }

  findAll() {
    return `This action returns all shopLayout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopLayout`;
  }

  update(id: number, updateShopLayoutDto: UpdateShopLayoutDto) {
    return `This action updates a #${id} shopLayout`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopLayout`;
  }
}
