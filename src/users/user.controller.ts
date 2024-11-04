import { Controller, Get, Post, Param, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/classes/class.controller';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Users have been successfully reached.', type: [User]})
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiResponse({ status: 200, description: 'User have been successfully found.', type: User})
  findOne(@Param('id') id: number, @Req() req: RequestWithUser): Promise<User> {
    console.log(req.user)
    return this.userService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiBody({
      type: CreateUserDto,
      description: 'Json structure for user object',
  })
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  // * dodat find by email
}
