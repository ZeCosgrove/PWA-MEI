import { Injectable } from '@nestjs/common';
import { CreateProductLocationDto } from './dto/create-product-location.dto';
import { UpdateProductLocationDto } from './dto/update-product-location.dto';

@Injectable()
export class ProductLocationService {
  create(createProductLocationDto: CreateProductLocationDto) {
    return 'This action adds a new productLocation';
  }

  findAll() {
    return `This action returns all productLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productLocation`;
  }

  update(id: number, updateProductLocationDto: UpdateProductLocationDto) {
    return `This action updates a #${id} productLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} productLocation`;
  }
}
