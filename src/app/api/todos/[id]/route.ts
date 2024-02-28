import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

import * as Yup from 'yup';

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, segments: Segments) {

    const {id} = segments.params;


    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    });

    if(!todo) {
        return NextResponse.json({
            message: 'No hay el todo buscado'
        }, {status: 404});
    }

    return NextResponse.json({
        ...todo
    });

}

const putSchema = Yup.object({
    description: Yup.string().optional(),
    complete: Yup.boolean().optional(),
});

export async function PUT(request: Request, segments: Segments) {

    try{

        const {id} = segments.params;
        const {description, complete} = await putSchema.validate(await request.json());
    
        const todo = prisma.todo.findFirst({
            where: {
                id
            }
        });
    
        if(!todo) {
            return NextResponse.json({
                message: `No se encontro el todo con id ${id}`
            }, {status: 404});
        }

        const updateTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                description,
                complete,
            }
        });
    
        return NextResponse.json({
            updateTodo
        });

    }catch(err) {
        return NextResponse.json({
            err
        }, {status: 400});
    }

}