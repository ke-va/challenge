import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from './class.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Class> {
    return this.classService.findOne(id);
  }

  @Post()
  create(@Body() classData: Class): Promise<Class> {
    return this.classService.create(classData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() classData: Partial<Class>): Promise<Class> {
    return this.classService.update(id, classData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.classService.remove(id);
  }
}
