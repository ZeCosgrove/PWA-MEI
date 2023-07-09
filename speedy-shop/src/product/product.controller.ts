import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseFilePipe,
  FileTypeValidator
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductQuantityDto } from './dto/update-product-quantity.dto';
import { UpdateProductSystemStateDto } from './dto/update-product-systemstate.dto';
import { AuthGuard } from '../user/auth/auth.guard';
import { Roles } from '../user/auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';
import { UpdateProductHighlightDto } from './dto/update-product-highlight.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Post('/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff)
  updateProducteImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productService.uploadProductImage(id, file);
  }

  @Get()
  @HttpCode(200)
  getProducts(@Query() queryParam) {
    var page = queryParam['page'];
    var perPage = queryParam['perPage'];
    var product = queryParam['product'];
    var category = queryParam['category'];
    var shop = queryParam['shop'];
    return this.productService.getProducts(
      page,
      perPage,
      product,
      category,
      shop,
    );
  }

  @Get('category/:category')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getProductsByCategory(@Param('category') category: string) {
    return this.productService.getProductsByCategory(category);
  }

  @Get('location/:location')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getProductsByLocation(@Param('location') location: string) {
    return this.productService.getProductsByLocation(+location);
  }

  @Get('id/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getProductById(@Param('id') id: string) {
    return this.productService.getProductsById(id);
  }

  @Get('name/:name')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff, UserRole.Client)
  getProductByName(@Param('name') name: string) {
    return this.productService.getProductsByName(name);
  }

  @Get('highlights')
  @HttpCode(200)
  getHighlightedProducts() {
    return this.productService.getHighlightProducts();
  }

  @Get('weekly-product')
  @HttpCode(200)
  getWeeklyProduct() {
    return this.productService.getWeeklyProduct();
  }

  @Get('/image/:id/download')
  @HttpCode(200)
  getProductImage(@Param('id') id: string, @Res() response: Response) {
    this.productService.getProductImage(id).then((res) => {
      if (!res) {
        return response.status(404).send('Image not found');
      } else {
        response.setHeader('Content-Type', 'image/png');
        response.setHeader(
          'Content-Disposition',
          'attachment; filename=product.png',
        );
        response.send(res);
      }
    });
  }

  @Patch(':id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff)
  changeProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.changeProduct(id, updateProductDto);
  }

  @Patch('changeQuantity/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin, UserRole.Staff)
  updateProductQuantity(
    @Param('id') id: string,
    @Body() updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    return this.productService.changeProductQuantity(
      id,
      updateProductQuantityDto,
    );
  }

  @Patch('changeSystemState/:id')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateProductSystemState(
    @Param('id') id: string,
    @Body() updateProductSystemState: UpdateProductSystemStateDto,
  ) {
    return this.productService.changeProductSystemState(
      id,
      updateProductSystemState,
    );
  }

  @Patch('changeHighlight/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateProductHighlight(
    @Param('id') id: string,
    @Body() updateProductHighlight: UpdateProductHighlightDto,
  ) {
    return this.productService.changeHighlights(id, updateProductHighlight);
  }
}
