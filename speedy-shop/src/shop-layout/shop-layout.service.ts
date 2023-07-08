import { Injectable } from '@nestjs/common';
import { UpdateShopLayoutDto } from './dto/update-shop-layout.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShopLayout } from './schemas/shopping-layout.schema';

import { GetShopLayoutOutput } from './entities/get-shop-output.entity';
import { ShopLayoutSystemState } from './enums/shop-layout-system-state.enum';
import { InnerLayout } from './entities/inner-layout.entity';
import { UpdateShopLayoutSystemStateDto } from './dto/update-shop-layout-system-state.dto';
import { CoordinatesInputDto } from './dto/coordinates-input.dto';
import { Pagination } from 'src/pagination/interface/pagination.interface';
import { getCityByCoordinates } from './utils/shop-layout.utils';
import { CreateShopLayoutDto } from './dto/create-shop-layout.dto';

@Injectable()
export class ShopLayoutService {
  constructor(
    @InjectModel(ShopLayout.name) private shopModel: Model<ShopLayout>,
  ) {}

  async createShopFloor(input: CreateShopLayoutDto) {
    input.layout.innerLayout = new Array();

    const createdShop: ShopLayout = new this.shopModel(input);
    createdShop.systemState = ShopLayoutSystemState.Created;

    const shop: ShopLayout = await createdShop.save();

    const output = new GetShopLayoutOutput(
      shop._id,
      shop.name,
      shop.layout,
      shop.realWorldCoordinates,
    );

    return output;
  }

  async getShopFloors(page: string, perPage: string) {
    const filter = {
      systemState: {
        $in: [ShopLayoutSystemState.Active, ShopLayoutSystemState.Created],
      },
    };

    let shops: ShopLayout[] = [];

    if (page != undefined && perPage != undefined && +perPage > 0) {
      shops = await this.shopModel
        .find(filter)
        .skip(+perPage * +page)
        .limit(+perPage);
    } else {
      shops = await this.shopModel.find(filter).exec();
    }

    var output: GetShopLayoutOutput[] = new Array();

    shops.forEach((shop) => {
      const singleShop = new GetShopLayoutOutput(
        shop._id,
        shop.name,
        shop.layout,
        shop.realWorldCoordinates,
      );
      output.push(singleShop);
    });

    let previous = null;
    let next = null;

    if (+page > 0) {
      previous = `http://localhost:3000/api/v1/shop-layout?page=${
        +page - 1
      }&perPage=${+perPage}`;
    }
    if (+perPage * +page + +perPage < (await this.shopModel.count(filter))) {
      next = `http://localhost:3000/api/v1/shop-layout?page=${
        +page + 1
      }&perPage=${+perPage}`;
    }

    var outputPagination: Pagination = {
      object: output,
      previous: previous,
      next: next,
    };

    return outputPagination;
  }

  async getShopFloorById(id: string) {
    const shop: ShopLayout = await this.shopModel.findById(id).exec();

    const city = await getCityByCoordinates(
      shop.realWorldCoordinates[0],
      shop.realWorldCoordinates[1],
    );

    const output = new GetShopLayoutOutput(
      shop._id,
      shop.name,
      shop.layout,
      shop.realWorldCoordinates,
      city,
    );

    return output;
  }

  async updateShopFloor(id: string, input: UpdateShopLayoutDto) {
    await this.shopModel.updateOne({ _id: id }, input).exec();

    return this.getShopFloorById(id);
  }

  async addShopFloorInnerLayout(id: string, input: InnerLayout) {
    const shop: ShopLayout = await this.shopModel.findById(id).exec();

    if (shop.layout?.innerLayout !== undefined) {
      let highestIdentifier = 0;

      shop.layout?.innerLayout.forEach((innerLayout) => {
        if (innerLayout.identifier > highestIdentifier) {
          highestIdentifier = innerLayout.identifier;
        }
      });

      input.identifier = highestIdentifier + 1;
      shop.layout.innerLayout.push(input);
    } else {
      var innerLayout: InnerLayout[] = new Array();

      input.identifier = 0;
      innerLayout.push(input);

      shop.layout.innerLayout = innerLayout;
    }

    await this.shopModel.updateOne({ _id: id }, shop).exec();

    return this.getShopFloorById(id);
  }

  async removeShopFloorInnerLayout(id: string, input: InnerLayout) {
    const shop: ShopLayout = await this.shopModel.findById(id).exec();

    if (shop.layout?.innerLayout !== undefined) {
      var indexOfElementToRemove: number;
      var count: number = 0;

      shop.layout?.innerLayout.forEach((innerLayout) => {
        if (innerLayout.identifier === input.identifier) {
          indexOfElementToRemove = count;
        }
        count++;
      });

      shop.layout.innerLayout.splice(indexOfElementToRemove, 1);
    }

    await this.shopModel.updateOne({ _id: id }, shop).exec();

    return this.getShopFloorById(id);
  }

  async updateShopFloorSystemState(
    id: string,
    input: UpdateShopLayoutSystemStateDto,
  ) {
    await this.shopModel.updateOne({ _id: id }, input).exec();

    return this.getShopFloorById(id);
  }

  async getNearestShopFloor(
    input: CoordinatesInputDto,
  ): Promise<GetShopLayoutOutput> {
    const filter = {
      systemState: {
        $in: [ShopLayoutSystemState.Active, ShopLayoutSystemState.Created],
      },
    };
    const shops: ShopLayout[] = await this.shopModel.find(filter).exec();

    let x = input.coordinates[0];
    let y = input.coordinates[1];
    const origin = { x, y };

    let nearestShop = null;
    let lessDistance = Number.MAX_SAFE_INTEGER;

    shops.forEach((shop) => {
      let x = shop.realWorldCoordinates[0];
      let y = shop.realWorldCoordinates[1];
      const shopCoordinates = { x, y };

      const distanceDiff = distance(origin, shopCoordinates);

      if (distanceDiff < lessDistance) {
        lessDistance = distanceDiff;
        nearestShop = shop;
      }
    });

    return nearestShop;
  }
}

function distance(origin, shop) {
  return Math.sqrt(
    Math.pow(origin.x - shop.x, 2) + Math.pow(origin.y - shop.y, 2),
  );
}
