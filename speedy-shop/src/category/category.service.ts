import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategorySchema } from './schemas/category.schema';
import { GetCategoryOutput } from './entities/get-category-output.entity';
import { Pagination } from 'src/pagination/interface/pagination.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getCategories(page: string, perPage: string) {
    let categories: Category[] = [];

    if (page != undefined && perPage != undefined && +perPage > 0) {
      categories = await this.categoryModel
        .find()
        .skip(+perPage * +page)
        .limit(+perPage);
    } else {
      categories = await this.categoryModel.find().exec();
    }

    var output: GetCategoryOutput[] = new Array();

    categories.forEach((category) => {
      const singleCategory = new GetCategoryOutput(category._id, category.name);
      output.push(singleCategory);
    });

    let previous = null;
    let next = null;

    if (+page > 0) {
      previous = `http://localhost:3000/api/v1/users?page=${
        +page - 1
      }&perPage=${+perPage}`;
    }
    if (+perPage * +page + +perPage < (await this.categoryModel.count())) {
      next = `http://localhost:3000/api/v1/users?page=${
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

  async getCategoryById(id: string): Promise<GetCategoryOutput> {
    const category: GetCategoryOutput = await this.categoryModel
      .findById(id)
      .exec();

    console.log(category);

    const output = new GetCategoryOutput(category._id, category.name);

    return output;
  }

  async getProductImage(id: string): Promise<Buffer> {
    return this.categoryModel
      .findById(id)
      .exec()
      .then((res) => {
        if (res !== undefined && res.image !== undefined) {
          return res.image;
        } else return null;
      });
  }

  async createCategory(input: CreateCategoryDto): Promise<GetCategoryOutput> {
    const createdCategory: Category = new this.categoryModel(input);
    const category: Category = await createdCategory.save();

    const output = new GetCategoryOutput(category._id, category.name);

    return output;
  }

  async addCategoryImage(
    id: string,
    image: Express.Multer.File,
  ): Promise<Category> {
    var category = await this.categoryModel.findById(id).exec();
    if (!category) {
      return null;
    }
    category.image = image.buffer;

    return category.save();
  }

  async updateCategory(id: string, input: UpdateCategoryDto) {
    await this.categoryModel.updateOne({ _id: id }, input).exec();

    return this.getCategoryById(id);
  }

  async removeCategory(id: string) {
    //validate if it is being used
    return await this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
