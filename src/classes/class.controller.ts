import { Controller, Get, Post, Put, Param, Body, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from './class.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterClassDto } from './dto/filterClass.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.entity';

export type RequestWithUser = Request & { user: User }

@ApiTags('classes')
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Classes have been successfully reached.', type: [Class]})
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Class have been successfully reached.', type: Class})
  findOne(@Param('id') id: number, @Req() req: RequestWithUser): Promise<Class> {
    console.log(req.user)
    return this.classService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() classData: Class): Promise<Class> {
    return this.classService.create(classData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  update(@Param('id') id: number, @Body() classData: Partial<Class>): Promise<Class> {
    return this.classService.update(id, classData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.classService.remove(id);
  }

  @Get('/filter')
  async getClasses(@Query() data: FilterClassDto) {
    console.log('tu san')
    // Split the data query into an array (if provided)
    const dataArray = data.sports ? data.sports.split(',') : [];

    // Call the service to get filtered classes
    return this.classService.filterClasses(dataArray);
  }
}
