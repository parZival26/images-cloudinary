import { Prisma } from "@prisma/client";

export class Course implements Prisma.CourseCreateInput {
    id?: number;
    title: string;
    description?: string | null | undefined;

}