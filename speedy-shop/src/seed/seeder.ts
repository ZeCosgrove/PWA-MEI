import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
require('dotenv').config();

import { User, UserSchema } from '../user/schemas/user.schema';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import {
  ShopLayout,
  ShopLayoutSchema,
} from '../shop-layout/schemas/shopping-layout.schema';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import { ShopLayoutSystemState } from '../shop-layout/enums/shop-layout-system-state.enum';
import { UserSystemState } from '../user/enums/user-system-state.enum';
import { UserRole } from '../user/enums/user-role.enum';
import { ProductSystemState } from '../product/enums/product-system-state.enum';

let users = [];
let categories = [];
let shops = [];
let products = [];

const userModel = mongoose.model(User.name, UserSchema);
const categoryModel = mongoose.model(Category.name, CategorySchema);
const shopModel = mongoose.model(ShopLayout.name, ShopLayoutSchema);
const productModel = mongoose.model(Product.name, ProductSchema);

const data = [];

async function connectToDB() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.8704wbn.mongodb.net/?retryWrites=true&w=majority`,
  );
}

async function createUsers(records: number) {
  for (let i = 0; i < records; i++) {
    const user = new userModel({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRole.Client,
      nif: faker.number.int({ min: 100000000, max: 999999999 }),
      mobile: `9${faker.number.int({ min: 10000000, max: 99999999 })}`,
      address: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zip: faker.location.zipCode(),
      },
      systemState: UserSystemState.Active,
    });

    data.push(user.save());
    users.push(user);
  }
}

async function createCategory(records: number) {
  for (let i = 0; i < records; i++) {
    const category = new categoryModel({
      name: faker.lorem.word(),
    });

    data.push(category.save());
    categories.push(category);
  }
}

async function createShop(records: number) {
  for (let i = 0; i < records; i++) {
    const width = faker.number.int({ min: 100, max: 1000 });
    const lenght = faker.number.int({ min: 100, max: 1000 });

    const shop = new shopModel({
      name: faker.company.name(),
      realWorldCoordinates: [
        faker.location.latitude(),
        faker.location.longitude(),
      ],
      systemState: ShopLayoutSystemState.Created,
      layout: {
        upperLeft: [0, 0],
        upperRight: [0, lenght],
        bottomLeft: [width, 0],
        bottonRigh: [width, lenght],
      },
    });

    data.push(shop.save());
    shops.push(shop);
  }
}

async function createProduct(records: number) {
  for (let i = 0; i < records; i++) {
    const product = new productModel({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      quantity: faker.number.int({ min: 10, max: 1000 }),
      category: categories[Math.floor(Math.random() * categories.length)],
      systemState: ProductSystemState.Active,
      location: faker.number.int({ min: 0, max: 10 }),
      shop: shops[Math.floor(Math.random() * shops.length)],
      weeklyProduct: Math.random() < 0.3,
      highlight: Math.random() < 0.4,
    });

    data.push(product.save());
    products.push(product);
  }
}

async function generateData() {
  await createUsers(1);
  await createCategory(3);
  await createShop(2);
  await createProduct(5);

  await Promise.all(data);
}

async function run() {
  await connectToDB();
  await generateData();

  console.log('Data has been generated');
}

run();
