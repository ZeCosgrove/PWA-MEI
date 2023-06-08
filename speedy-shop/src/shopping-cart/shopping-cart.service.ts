import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';
import { UpdateShoppingCartSystemStateDto } from './dto/update-shopping-cart-system-state.dto';

@Injectable()
export class ShoppingCartService {
  // Imports the necessary models to this endpoints
  constructor( 
    @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCart>,
    @InjectModel(User.name) private userModel: Model<User>, 
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  /**
   * this method creates a new shopping cart 
   * @param createShoppingCartDto the shopping cart received
   * @returns a new shopping cart 
   */
  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    const { user, products, startDate, endDate, systemState } = createShoppingCartDto;

    const userFounded = await this.userModel.findById(user);
    if (!userFounded) {
      throw new Error('404 Not Found: User not found');
    }

    const existingProducts = await Promise.all(
      products.map(async (product) => {
        const existingProduct = await this.productModel.findById(product);
        if (!existingProduct) {
          throw new Error(`404 Not Found: Product not found: ${product}`);
        }
        return existingProduct;
      })
    );
    const shoppingCart = new this.shoppingCartModel({
      user: userFounded,
      products: existingProducts,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      systemState: systemState,
    });


    return await shoppingCart.save();
  }

  /**
   * This method returns all the shopping carts in the database
   * @returns All the shopping carts in the database
   */
  async findAll() : Promise<ShoppingCart[]>{
    return await this.shoppingCartModel.find();
  }

  /**
   * This method returns a shopping cart filtered by the id received
   * @param id the id of the shopping cart
   * @returns one shopping cart if exists
   */
  async findOne(id: string) :  Promise<ShoppingCart>{
    return await this.shoppingCartModel.findById(id);
  }

  /**
   * This method returns all the shopping carts filtered by a received user
   * @param userId The user id to filter the shopping carts
   * @returns the shopping carts of the user received
   */
  async findByUser(userId: string): Promise<ShoppingCart[]> {
    const userFound = await this.userModel.findById(userId).exec();
    if (!userFound) {
      throw new Error('404 Not Found: User not found');
    }
  
    const shoppingCarts = await this.shoppingCartModel.find({"user._id": userId})
    return shoppingCarts;
  }

  /**
   * This method returns the active shopping carts of a user
   * @param userId the user identifier
   * @returns only the active shopping carts
   */
  async findActiveByUser(userId: string) : Promise<ShoppingCart[]>{
    const allShoppingCarts = await this.findByUser(userId);

    const activeShoppingCarts = [];
    for (let i = 0; i < allShoppingCarts.length; i++) {
      const shoppingCart = allShoppingCarts[i];
      if (shoppingCart.systemState == 1) {
        activeShoppingCarts.push(shoppingCart);
      }
    }

    return activeShoppingCarts;
  }

  /**
   * This method updates a shopping cart
   * @param id id of shopping cart to update
   * @param updateShoppingCartDto the new values of the shopping cart
   * @returns the shopping cart update
   */
  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto) : Promise<ShoppingCart> {

    const { user, products, startDate, endDate, systemState } = updateShoppingCartDto;

    const userFounded = await this.userModel.findById(user);
    if (!userFounded) {
      throw new Error('404 Not Found: User not found');
    }

    const existingProducts = await Promise.all(
      products.map(async (product) => {
        const existingProduct = await this.productModel.findById(product);
        if (!existingProduct) {
          throw new Error(`404 Not Found: Product not found: ${product}`);
        }
        return existingProduct;
      }),
    );

    const shoppingCartUpdated = (await this.shoppingCartModel.findByIdAndUpdate(id, {
      user: userFounded,
      products: existingProducts,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      systemState: systemState
    })).save();

  
    return await shoppingCartUpdated;
  }

  /**
   * This method updates a shopping cart state to another received
   * @param shoppingCartId the id of shopping cart to update
   * @param systemState the new system state
   */
  async updateSystemState(shoppingCartId: string, systemStateDto: UpdateShoppingCartSystemStateDto){
    const shoppingCartUpdated = (await this.shoppingCartModel.findByIdAndUpdate(shoppingCartId, systemStateDto)).save();
    return await shoppingCartUpdated;
  }

  /**
   * This method removes an shopping cart from the database
   * @param id shopping cart identifier
   * @returns the result of the remove action
   */
  async remove(id: string) {
    return await this.shoppingCartModel.findByIdAndDelete(id);
  }
}
