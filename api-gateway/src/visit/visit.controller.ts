import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post('/create')
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitService.createVisit(createVisitDto);
  }

  @Get('/getAll')
  findAll() {
    return this.visitService.getAllVisits();
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: string) {
    return this.visitService.getVisit(id);
  }

  @Patch('/edit/:id')
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitService.updateVisit(id, updateVisitDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.visitService.deleteVisit(id);
  }
}
