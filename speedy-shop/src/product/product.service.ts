import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductQuantityDto } from './dto/update-product-quantity.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductSystemStateDto } from './dto/update-product-systemstate.dto';
import { Category } from 'src/category/schemas/category.schema';
import { ShopLayout } from 'src/shop-layout/schemas/shopping-layout.schema';


@Injectable()
export class ProductService {
  /**
   * Constructor to initialize the Injectable Model
   */
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(ShopLayout.name) private shopModel: Model<ShopLayout>
  ) {}

  //#region Create Product
  /**
   * This method creates a new product
   * @param createProductDto product received to validate
   * @returns returns the result of the attempt to save this new product
   */
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // check if the category exists
    const categoryFinded = await this.categoryModel
      .findById(createProductDto.category)
      .exec();
    if (!categoryFinded) {
      return null;
    }

    // check if the shop exists
    const shopFinded = await this.shopModel.findById(createProductDto.shop).exec();
    if (!shopFinded) {
      return null;
    }

    // create the new product
    const createdProduct = new this.productModel({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
      category: categoryFinded,
      location: createProductDto.location,
      shop: shopFinded,
      systemState: createProductDto.systemState,
    });

    return await createdProduct.save();
  }
  //#endregion

  //#region Get Product(s)
  /**
   * This method find all the products in the database
   * @returns returns all the products in the database
   */
  async getProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }

  /**
   * This method returns the product with the selected id
   * @param id Id of the product
   * @returns One Product
   */
  async getProductsById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  /**
   * This method returns the products with the name passed by argument
   * @param name Product Name 
   * @returns returns an array of product
   */
  async getProductsByName(name: string): Promise<Product[]>{
    return await this.productModel.find({"name": {"$regex": name, "$options": "i"}})
  }

  /**
   * This method returns the products by a given category
   * @param category the filter category of products
   * @returns an array of products or null if none were found
   */
  async getProductsByCategory(category: string): Promise<Product[] | null> {
    // check if the category exists
    const categoryFinded = await this.categoryModel.findById(category).exec();
    if (!categoryFinded) {
      return null;
    }

    var productsByCategory = await this.productModel
      .find({ 'category._id': category })
      .exec();
    return productsByCategory;
  }

  /**
   * This method returns the products by a given location
   * @param location the location to find the products
   * @returns an array of products or null if none were found
   */
  async getProductsByLocation(location: number): Promise<Product[] | null> {
    // get the products
    const products = await this.productModel
      .find({ location: location })
      .exec();

    // return the products
    return products;
  }

  //#endregion

  //#region Update Product
  /**
   * This Method Updates a product in the database
   * @param id Product Id to Update
   * @param updateProductDto Product to Update validator
   * @returns Returns the Status of the Update Action
   */
  async changeProduct(id: string, updateProductDto: UpdateProductDto) {
     // check if the category exists
     const categoryFinded = await this.categoryModel.findById(updateProductDto.category).exec();
     if (!categoryFinded) {
       return null;
     }
     
     // Ceck if the shop exists
    const shopFinded = await this.shopModel.findById(updateProductDto.shop).exec();
    if (!shopFinded) {
      return null;
    }

    // update the product
    const updatedProduct = (
      await this.productModel.findByIdAndUpdate(id, {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        quantity: updateProductDto.quantity,
        category: categoryFinded,
        location: updateProductDto.location,
        shop: shopFinded,
        systemState: updateProductDto.systemState,
      })
    ).save();

    // return the product updated
    return await updatedProduct;
  }

  /**
   * This method updates the product quantity
   * @param id Product Id to Update
   * @param quantity New Quantity of Product
   * @returns the product updated
   */
  async changeProductQuantity(
    id: string,
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    const productToUpdate = await this.productModel.findById(id);
    productToUpdate.quantity = updateProductQuantityDto.quantity;
    return productToUpdate.save();
  }

  /**
   * This method updates the product system state
   * @param id Product Identifier to Update
   * @param updateProductSystemStateDto New System State
   * @returns the product updated
   */
  async changeProductSystemState(
    id: string,
    updateProductSystemStateDto: UpdateProductSystemStateDto,
  ) {
    const productToUpdate = await this.productModel.findById(id);
    productToUpdate.systemState = updateProductSystemStateDto.systemState;

    return productToUpdate.save();
  }

  //#endregion
}
