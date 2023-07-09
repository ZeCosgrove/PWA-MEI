import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';
import { UpdateShoppingCartSystemStateDto } from './dto/update-shopping-cart-system-state.dto';
import { UpdateShoppingCartProductsDto } from './dto/update-shopping-cart-products.dto';
import { ShoppingCartSystemState } from './enums/shopping-cart-system-state.enum';
import { CartProduct } from 'src/cart-product/schemas/cart-product.schema';

@Injectable()
export class ShoppingCartService {
  // Imports the necessary models to this endpoints
  constructor( 
    @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCart>,
    @InjectModel(User.name) private userModel: Model<User>, 
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  //#region CREATE Shopping Cart
  /**
   * this method creates a new shopping cart 
   * @param createShoppingCartDto the shopping cart received
   * @returns a new shopping cart 
   */
  async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    const { user, products, startDate, endDate, systemState } = createShoppingCartDto;

    const userFounded = await this.userModel.findById(user);
    if (!userFounded) {
      throw new Error('404 Not Found: User not found');
    }

    const shoppingCart = new this.shoppingCartModel({
      user: userFounded,
      products: products,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      systemState: systemState,
    });


    return await shoppingCart.save();
  }

  //#endregion

  //#region GET Shopping Cart

  /**
   * This method returns all the shopping carts in the database
   * @returns All the shopping carts in the database
   */
  async getAllShoppingCarts() : Promise<ShoppingCart[]>{
    return await this.shoppingCartModel.find();
  }

  /**
   * This method returns a shopping cart filtered by the id received
   * @param id the id of the shopping cart
   * @returns one shopping cart if exists
   */
  async getShoppingCartById(id: string) :  Promise<ShoppingCart>{
    return await this.shoppingCartModel.findById(id);
  }

  /**
   * This method returns all the shopping carts filtered by a received user
   * @param userId The user id to filter the shopping carts
   * @returns the shopping carts of the user received
   */
  async getShoppingCartByUser(userId: string): Promise<ShoppingCart[]> {
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
  async getActiveShoppingCartByUser(userId: string) : Promise<ShoppingCart>{
    const shoppingCarts = await this.getShoppingCartByUser(userId);
    const activeShoppingCarts = shoppingCarts.find(s => s.systemState == ShoppingCartSystemState.Active)
  
    return activeShoppingCarts;
  }

  /**
   * This method returns the previous shops by User
   * @param userId user identifier
   * @returns a list of shopping carts closed
   */
  async getClosedShoppingCartByUser(userId : string) : Promise<ShoppingCart[]>{
    const allShoppingCarts = await this.getShoppingCartByUser(userId);

    const activeShoppingCarts = [];
    for (let i = 0; i < allShoppingCarts.length; i++) {
      const shoppingCart = allShoppingCarts[i];
      if (shoppingCart.systemState == ShoppingCartSystemState.Terminated) {
        activeShoppingCarts.push(shoppingCart);
      }
    }

    return activeShoppingCarts;
  }

  //#endregion

  //#region UPDATE Shopping Cart
  /**
   * This method updates a shopping cart
   * @param id id of shopping cart to update
   * @param updateShoppingCartDto the new values of the shopping cart
   * @returns the shopping cart update
   */
  async updateShoppingCart(id: string, updateShoppingCartDto: UpdateShoppingCartDto) : Promise<ShoppingCart> {

    const { user, products, startDate, endDate, systemState } = updateShoppingCartDto;

    const userFounded = await this.userModel.findById(user);
    if (!userFounded) {
      throw new Error('404 Not Found: User not found');
    }

    const shoppingCartUpdated = (await this.shoppingCartModel.findByIdAndUpdate(id, {
      user: userFounded,
      products: products,
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
  async updateShoppingCartSystemState(shoppingCartId: string, systemStateDto: UpdateShoppingCartSystemStateDto): Promise <ShoppingCart>{
    const shoppingCartUpdated = await this.shoppingCartModel.findById(shoppingCartId).exec();
    shoppingCartUpdated.systemState = systemStateDto.systemState;
    return await shoppingCartUpdated.save();
  }

  /**
   * This method updates the products in the shopping cart received
   * @param shoppingCartId Shopping Cart Identifier
   * @param productsDto The products of shopping cart
   * @returns the updated shopping cart
   */
  async updateShoppingCartProducts(shoppingCartId: string, productsDto: UpdateShoppingCartProductsDto){
    const shoppingCart = await this.getShoppingCartById(shoppingCartId);
    if (!shoppingCart) return null;

    const {productId, quantity, discount} = productsDto 
    const product = await this.productModel.findById(productId).exec()
    if (!product) {
      return null
    }
    const existingCartProduct = shoppingCart.products.find(p => p.product._id == productId);
    if (!existingCartProduct) {
      const cartProduct = {
        product : product,
        quantity : quantity,
        discount : discount
      }
      shoppingCart.products.push(cartProduct as CartProduct)
    }else{
      var cartProduct = shoppingCart.products.find(p => p.product._id == productId);
      const index = shoppingCart.products.indexOf(cartProduct);
      if (quantity == 0) {
        shoppingCart.products.splice(index, 1);
      }else{
        cartProduct.quantity = quantity
        cartProduct.discount = discount
  
        shoppingCart.products[index] = cartProduct
      }
    }
    
    
    return await shoppingCart.save();
  }

  //#endregion

}
