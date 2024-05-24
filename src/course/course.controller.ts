import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.model';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
export class CourseController {

    constructor(private readonly courseService: CourseService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createCourse(
        @Body() data: Course, @Res() res: Response,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(jpg|jpeg|png)' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
            ]
        })) file: Express.Multer.File
    ): Promise<void> {
        try {
            this.courseService.createCourse(data, file);
            res.status(HttpStatus.CREATED).json({ message: 'Course created successfully' });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }

    @Get()
    async getAllCourses(): Promise<Course[]> {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    async getCourseById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Course> {
        return this.courseService.getCourseById(id);
    }
}
