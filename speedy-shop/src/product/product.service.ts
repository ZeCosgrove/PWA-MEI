import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductService {
  /**
   * Constructor to initialize the Injectable Model
   */
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  /**
   * This method creates a new product
   * @param createProductDto product received to validate
   * @returns returns the result of the attempt to save this new product
   */
  async createProduct(createProductDto: CreateProductDto) : Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  /**
   * This method find all the products in the database
   * @returns returns all the products in the database
   */
  async getProducts() : Promise<Product[]> {
    return await this.productModel.find();
  }

  /**
   * This method returns the product with the selected id
   * @param id Id of the product
   * @returns One Product
   */
  async getProductsById(id: number) : Promise<Product>{
    return await this.productModel.findById(id);
  }

  /**
   * This method returns the products by a given category
   * @param category the filter category of products
   * @returns an array of products or null if none were found
   */
  async  getProductsByCategory(category: number): Promise<Product[] | null>{
    return await this.productModel.find({category: category})
  }

  /**
   * This method returns the products by a given location
   * @param location the location to find the products
   * @returns an array of products or null if none were found
   */
  async getProductsByLocation(location: number): Promise<Product[] | null>{
    return await this.productModel.find({location: location})
  }

  /**
   * This Method Updates a product in the database
   * @param id Product Id to Update
   * @param updateProductDto Product to Update validator
   * @returns Returns the Status of the Update Action
   */
  async changeProduct(id: number, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  /**
   * This Method Removes a product in the database
   * @param id Product Id to Remove
   * @returns Returns the status of the Remove Action
   */
  async remove(id: number) : Promise<void>{
    return await this.productModel.findByIdAndRemove(id);
  }
}
