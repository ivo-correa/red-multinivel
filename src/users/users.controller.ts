import { Controller, Post, Get, Body, Param, Query, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('network/:id')
  async getMyNetwork(@Param('id') id: number) {
    return await this.usersService.getChildren(id);
  }

  @Post()
  async createReferral(@Body() userData: any, @Query('sponsorId') sponsorId?: string) {
    const finalSponsorId = sponsorId ? parseInt(sponsorId, 10) : (userData.sponsorId ? parseInt(userData.sponsorId, 10) : null);
    const { sponsorId: _, ...cleanUserData } = userData;
    return await this.usersService.addReferral(cleanUserData, finalSponsorId);
  }

  @Post('register-root')
  async createRoot(@Body() userData: any) {
    return await this.usersService.addReferral(userData, null);
  }

  @Get('roots')
  async getAllRoots() {
    return await this.usersService.findAllRoots();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.usersService.getUserById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: any) {
    return await this.usersService.updateUser(parseInt(id, 10), updateData);
  }

  @Get(':id/children')
  async getChildren(@Param('id') id: string) {
    return await this.usersService.getChildren(parseInt(id, 10));
  }
}