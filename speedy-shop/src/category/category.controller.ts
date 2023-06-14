import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/user/auth/auth.guard';
import { Roles } from 'src/user/auth/roles.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';

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

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
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
