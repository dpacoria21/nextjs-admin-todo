import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { object} from 'yup';
import * as yup from  'yup';

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url);


    const take = +(searchParams.get('take') ?? '10');
    const skip = +(searchParams.get('skip') ?? '0');

    if(isNaN(take)) {
        return NextResponse.json({
            message: 'Take tiene que ser un numero',
        }, {status: 400});
    }

    if(isNaN(take)) {
        return NextResponse.json({
            message: 'Skip tiene que ser un numero',
        }, {status: 400});
    }
    

    const todos = await prisma.todo.findMany({
        take, 
        skip
    });

    
    return NextResponse.json({
        count: todos.length,
        todos,
    });
}


const postSchema = object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {

    const user = await getUserSessionServer();

    if(!user) {
        return NextResponse.json({
            message: 'No autorizado'
        }, {status: 401});
    }

    try{
        const {description, complete} = await postSchema.validate( await request.json() );
    
        const repeatTodo = await prisma.todo.findFirst({
            where: {
                description
            }
        });

        if(repeatTodo) {
            return NextResponse.json({
                message: 'Todo con descripcion repetida'
            }, {status: 400});
        }

        const todo = await prisma.todo.create({
            data: {
                description,
                complete,
                userId: user.id
            }
        });
    
        return NextResponse.json({
            todo
        });

    }catch(err) {
        return NextResponse.json({
            err
        }, {status: 400});
    }
}

export async function DELETE(requets: Request) {

    try{

        const todosDeleted = await prisma.todo.deleteMany({
            where: {
                complete: true
            }
        });
        
        return NextResponse.json({
            ...todosDeleted
        });

    }catch(err) {
        return NextResponse.json({
            err
        }, {status: 400});
    }

}

