import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShopLayoutService } from './shop-layout.service';
import { UpdateShopLayoutDto } from './dto/update-shop-layout.dto';
import { UpdateShopLayoutSystemStateDto } from './dto/update-shop-layout-system-state.dto';
import { InnerLayout } from './entities/inner-layout.entity';
import { ShopLayout } from './schemas/shopping-layout.schema';
import { CoordinatesInputDto } from './dto/coordinates-input.dto';
import { AuthGuard } from 'src/user/auth/auth.guard';
import { Roles } from 'src/user/auth/roles.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';

@Controller('api/v1/shop-layouts')
export class ShopLayoutController {
  constructor(private readonly shopLayoutService: ShopLayoutService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  createShopFloor(@Body() createShopLayoutDto: ShopLayout) {
    return this.shopLayoutService.createShopFloor(createShopLayoutDto);
  }

  @Get()
  getShopFloors(@Query() queryParam) {
    var page = queryParam['page'];
    var perPage = queryParam['perPage'];
    return this.shopLayoutService.getShopFloors(page, perPage);
  }

  @Get(':id')
  getShopFloorById(@Param('id') id: string) {
    return this.shopLayoutService.getShopFloorById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateShopFloor(
    @Param('id') id: string,
    @Body() updateShopLayoutDto: UpdateShopLayoutDto,
  ) {
    return this.shopLayoutService.updateShopFloor(id, updateShopLayoutDto);
  }

  @Patch('/add-inner-layout/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  addShopFloorInnerLayout(
    @Param('id') id: string,
    @Body() updateShopLayoutDto: InnerLayout,
  ) {
    return this.shopLayoutService.addShopFloorInnerLayout(
      id,
      updateShopLayoutDto,
    );
  }

  @Patch('/remove-inner-layout/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  removeShopFloorInnerLayout(
    @Param('id') id: string,
    @Body() updateShopLayoutDto: InnerLayout,
  ) {
    return this.shopLayoutService.removeShopFloorInnerLayout(
      id,
      updateShopLayoutDto,
    );
  }

  @Patch('/change-system-state/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.Admin)
  updateShopFloorSystemState(
    @Param('id') id: string,
    @Body() updateShopLayoutDto: UpdateShopLayoutSystemStateDto,
  ) {
    return this.shopLayoutService.updateShopFloorSystemState(
      id,
      updateShopLayoutDto,
    );
  }

  @Post('/get-nearest')
  getNearestShopFloor(@Body() createShopLayoutDto: CoordinatesInputDto) {
    return this.shopLayoutService.getNearestShopFloor(createShopLayoutDto);
  }
}
