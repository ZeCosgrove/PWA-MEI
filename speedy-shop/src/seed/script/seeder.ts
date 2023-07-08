import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { Category } from 'src/category/schemas/category.schema';
import { UserRole } from 'src/user/enums/user-role.enum';
import { UserSystemState } from 'src/user/enums/user-system-state.enum';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class Seeder {
  constructor(
    // constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async seed(): Promise<void> {
    //await this.seedUser();
    await this.seedCategory();
  }

  async seedUser(): Promise<void> {
    const address: Address = {
      address: 'a',
      city: 'b',
      zip: 'null',
    };

    const modelObj = {
      name: 'null',
      email: 'a@b.com',
      password: 'null',
      role: UserRole.Client,
      nif: 123456789,
      mobile: 933456789,
      address: address,
      systemState: UserSystemState.Active,
    };

    // await this.userModel.create(modelObj);
    await console.log(modelObj);
  }

  async seedCategory(): Promise<void> {
    const modelObj = {
      name: 'test',
    };

    await console.log(modelObj);
    // await this.categoryModel.create(modelObj);
  }
}
