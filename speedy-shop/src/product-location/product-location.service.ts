import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductLocationDto } from './dto/create-product-location.dto';
import { UpdateProductLocationDto } from './dto/update-product-location.dto';

import { ProductLocation } from './schemas/product-location.schema';
import { Product } from 'src/product/schemas/product.schema';
import { ShopLayout } from 'src/shop-layout/schemas/shopping-layout.schema';

@Injectable()
export class ProductLocationService {

  /**
   * Constructor to Initialize the Injectable Model
   */
  constructor(@InjectModel(ProductLocation.name) private productLocationModel: Model<ProductLocation>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ShopLayout.name) private shopLayoutModel: Model<ShopLayout>) { }

  /**
   * This method creates a new product location and updates the existing product
   * @param createProductLocationDto the verified body to create a new product location
   * @returns null if the product doesn't exist or the new product location if the product exists
   */
  async create(createProductLocationDto: CreateProductLocationDto): Promise<ProductLocation> {

    // Check if the product exists
    const findedProduct = await this.productModel.findById(createProductLocationDto.product);
    if (findedProduct == null) {
      return null;
    }

    // Check if the shop exists
    const shopLayout = await this.shopLayoutModel.findById(createProductLocationDto.shop);
    if (!shopLayout) {
      return null;
    }

    // create the new location
    const newProductLocation = new this.productLocationModel({
      product: findedProduct,
      shop: shopLayout,
      location: createProductLocationDto.location
    });

    // updates the product
    findedProduct.location = createProductLocationDto.location;
    findedProduct.save();

    // return
    return await newProductLocation.save();
  }

  /**
   * This methods finds all the product locations
   * @returns All the Products Locations in the database
   */
  async findAll(): Promise<ProductLocation[]> {
    return await this.productLocationModel.find();
  }

  /**
   * This methods finds the product location from the given product id
   * @param productId the product id to find the desire location
   * @returns the product location
   */
  async findByProduct(productId: string): Promise<ProductLocation> {

    // check if the product exists
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      return null;
    }

    // search for product location
    const productLocation = await this.productLocationModel.findOne({ "product._id": productId }).exec();
    return productLocation;
  }

  /**
   * This method returns all the products in the selected shop
   * @param shopId The shop Id
   * @returns All the products in the given shop 
   */
  async findByShop(shopId: string): Promise<ProductLocation[]> {
    // check if the shop exists
    const shop = await this.shopLayoutModel.findById(shopId).exec();
    if (!shop) {
      return null;
    }

    // search for all the products in the store
    const productLocation = await this.productLocationModel.find({ "shop._id": shopId }).exec();
    return productLocation;
  }


  /**
   * This method updates a product location
   * @param id Product Location Id to Update
   * @param updateProductLocationDto The Values to Update the Product Location
   * @returns The Product Location Updated
   */
  async update(id: string, updateProductLocationDto: UpdateProductLocationDto): Promise<ProductLocation> {

    // Check if the product exists
    const findedProduct = await this.productModel.findById(updateProductLocationDto.product);
    if (findedProduct == null) {
      return null;
    }

    // Check if the shop exists
    const shopLayout = await this.shopLayoutModel.findById(updateProductLocationDto.shop);
    if (!shopLayout) {
      return null;
    }

    findedProduct.location = updateProductLocationDto.location;
    findedProduct.save();

    // Update product location
    const productLocationUpdated = (await this.productLocationModel.findByIdAndUpdate(id, {
      product: findedProduct,
      shop: shopLayout,
      location: updateProductLocationDto.location
    })).save();

    return productLocationUpdated;
  }

  /**
   * This method removes a product Location
   * @param id Product Location Id to Remove
   * @returns 
   */
  async remove(id: string) {
    return await this.productLocationModel.findByIdAndRemove(id);
  }
}
