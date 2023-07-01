import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpCode, ParseFilePipe, FileTypeValidator, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/user/auth/auth.guard';
import { Roles } from 'src/user/auth/roles.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Get('/image/:id/download')
  @HttpCode(200)
  getProductImage(@Param('id') id: string, @Res() response: Response){
    this.categoryService.getProductImage(id).then((res) => {
      if (!res) {
        return response.status(404).send('Image not found');
      }else{
        response.setHeader('Content-Type', 'image/png');
        response.setHeader('Content-Disposition', 'attachment; filename=category.png');
        response.send(res);
      }
    });  
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  addCategoryImage(@Param('id') id: string, @UploadedFile(new ParseFilePipe({validators: [new FileTypeValidator({ fileType: 'image/png' })]})) file: Express.Multer.File){
  return this.categoryService.addCategoryImage(id, file);
}

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }
}
