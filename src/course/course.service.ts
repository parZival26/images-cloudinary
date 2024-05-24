import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Course } from './course.model';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CourseService {

    constructor(private readonly prismaService: PrismaService, private readonly cloudinaryService: CloudinaryService) { }

    async createCourse(data: Course, file: Express.Multer.File): Promise<void> {
        const uploadImage = await this.cloudinaryService.uploadFile(file);
        await this.prismaService.course.create({
            data: {
                title: data.title,
                description: data.description,
                image: uploadImage.secure_url
            }
        })
    }

    async getAllCourses(): Promise<Course[]> {
        return this.prismaService.course.findMany();
    }

    async getCourseById(id: number): Promise<Course> {
        return this.prismaService.course.findUnique({ where: { id } });
    }
}
