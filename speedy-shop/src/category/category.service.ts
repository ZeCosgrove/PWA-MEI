import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategorySchema } from './schemas/category.schema';
import { GetCategoryOutput } from './entities/get-category-output.entity'

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async getCategories(): Promise<GetCategoryOutput[]> {
    const categories: Category[] = await this.categoryModel.find().exec()

    var output: GetCategoryOutput[] = new Array

    categories.forEach(category => {
      const singleCategory = new GetCategoryOutput(category._id, category.name)
      output.push(singleCategory)
    });
    
    return output
  }

  async getCategoryById(id: string): Promise<GetCategoryOutput> {
    const category: GetCategoryOutput = await this.categoryModel.findById(id).exec()

    const output = new GetCategoryOutput(category._id, category.name)

    return output
  }

  async getProductImage(id: string): Promise<Buffer>{
    return this.categoryModel.findById(id).exec().then((res) => {
      if(res !== undefined && res.image !== undefined){
        return res.image;
      } else
        return null;
      
    });
  }

  async createCategory(input: CreateCategoryDto): Promise<GetCategoryOutput> {
    const createdCategory: Category = new this.categoryModel(input);
    const category: Category = await createdCategory.save();

    const output = new GetCategoryOutput(category._id, category.name)

    return output
  }


  async addCategoryImage(id: string, image: Express.Multer.File): Promise<Category>{
    var category = await this.categoryModel.findById(id).exec();
    if (!category) {
      return null;
    }
    category.image = image.buffer

    return category.save();

  }

  async updateCategory(id: string, input: UpdateCategoryDto) {
    await this.categoryModel.updateOne({ _id: id}, input).exec()

    return this.getCategoryById(id)
  }

  async removeCategory(id: string) {

    //validate if it is being used 
    return await this.categoryModel.deleteOne({ _id: id}).exec()
  }
}
