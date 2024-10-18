import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { SportService } from './sport.service';
import { Sport } from './sport.entity';

@Controller('sports')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Get()
  findAll(): Promise<Sport[]> {
    return this.sportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Sport> {
    return this.sportService.findOne(id);
  }

  @Post()
  create(@Body() sport: Sport): Promise<Sport> {
    return this.sportService.create(sport);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() sport: Partial<Sport>): Promise<Sport> {
    return this.sportService.update(id, sport);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sportService.remove(id);
  }
}
