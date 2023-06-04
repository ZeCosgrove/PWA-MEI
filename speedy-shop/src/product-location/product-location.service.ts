import { Injectable } from '@nestjs/common';
import { CreateProductLocationDto } from './dto/create-product-location.dto';
import { UpdateProductLocationDto } from './dto/update-product-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductLocation } from './schemas/product-location.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class ProductLocationService {

  /**
   * Constructor to Initialize the Injectable Model
   */
  constructor(@InjectModel(ProductLocation.name) private productLocationModel: Model<ProductLocation>, 
    @InjectModel(Product.name) private productModel: Model<Product>) {}

  /**
   * This method creates a new product location and updates the existing product
   * @param createProductLocationDto the verified body to create a new product location
   * @returns null if the product doesn't exist or the new product location if the product exists
   */
  async create(createProductLocationDto: CreateProductLocationDto) :Promise<ProductLocation>{

    // Check if the product exist
    const findedProduct = await this.productModel.findById(createProductLocationDto.product);
    if (findedProduct == null) {
      return null;
    }

    // TODO: Implement the findedShop

    findedProduct.location = createProductLocationDto.location;
    findedProduct.save();
    
    const newProductLocation = new this.productLocationModel(createProductLocationDto);
    return await newProductLocation.save();
  }

  /**
   * This methods finds all the product locations
   * @returns All the Products Locations in the database
   */
  async findAll() : Promise<ProductLocation[]>{
    return await this.productLocationModel.find();
  }

  /**
   * This methods finds the product location from the given product id
   * @param productId the product id to find the desire location
   * @returns the product location
   */
  async findByProduct(productId: string) : Promise<ProductLocation>{
    const productLocation = await this.productLocationModel.findOne({product: {$eq: productId}}).exec();
    return productLocation;
  }

  /**
   * This method returns all the products in the selected shop
   * @param shopId The shop Id
   * @returns All the products in the given shop 
   */
  async findByShop(shopId: string) : Promise<ProductLocation[]>{
    const productLocation = await this.productLocationModel.find({shop: {$eq: shopId}}).exec();
    return productLocation;
  }


  /**
   * This method updates a product location
   * @param id Product Location Id to Update
   * @param updateProductLocationDto The Values to Update the Product Location
   * @returns The Product Location Updated
   */
  async update(id: string, updateProductLocationDto: UpdateProductLocationDto) : Promise<ProductLocation>{
    const productLocationUpdated = (await this.productLocationModel.findByIdAndUpdate(id, updateProductLocationDto)).save();
    return productLocationUpdated;
  }

  /**
   * This method removes a product Location
   * @param id Product Location Id to Remove
   * @returns 
   */
  remove(id: string) {
    return this.productLocationModel.findByIdAndRemove(id);
  }
}
