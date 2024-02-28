import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
    // const todo = await prisma.todo.findMany({
    //     where: {
    //         id: id
    //     }
    // });

    // if(todo.length===0) {
    //     return NextResponse.json({
    //         message: 'No hay el todo buscado'
    //     }, {status: 404});
    // }

    // return NextResponse.json({
    //     ...todo[0]
    // });
}