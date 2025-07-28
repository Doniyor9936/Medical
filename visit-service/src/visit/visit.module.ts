import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitGrpcController } from './visit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  controllers: [VisitGrpcController],
  providers: [VisitService],
})
export class VisitModule {}
