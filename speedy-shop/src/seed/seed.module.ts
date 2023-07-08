import { Module } from '@nestjs/common';
import { Seeder } from './script/seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';

@Module({
  providers: [Seeder],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class SeedModule {}
