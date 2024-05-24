import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
    controllers: [CourseController],
    providers: [CourseService, PrismaService, CloudinaryService]
})
export class CourseModule { }
