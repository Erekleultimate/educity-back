import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async find() {
    const categories = await this.categoryService.findMany();
    return { data: categories, meta: categories.length };
  }
}
