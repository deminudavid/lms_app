"use server"

import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";

export async function CreateCourse(data: CourseSchemaType):Promise<ApiResponse> {

    try {
        const validation = courseSchema.safeParse(data);

        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid form data"
            };
        }

        const data = await prisma.course.create({
            data: {
                ...validation.data,
                userId: "se"
            },
        });

        return {
            status: "success",
            message: "course created successfully"
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'Failed to create course'
        };
    }
}