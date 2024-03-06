'use server';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sleep = (seconds: number = 0): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, seconds*1000);
    });
};

export const toggleTodo = async(id: string, complete: boolean): Promise<Todo> => {

    // await sleep(3);

    const todo = prisma.todo.findFirst({
        where: {
            id
        }
    });

    if(!todo) {
        throw `Todo con id ${id} no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {complete}
    });

    revalidatePath('/dashboard/server-todos');
    return updatedTodo;
};

export const addTodo = async(description: string) => {
    const user = await getUserSessionServer();
    if(!user) redirect('/api/auth/signin');
    try {

        const newTodo = prisma.todo.create({
            data: {
                description,
                userId: user.id
            }
        });

        revalidatePath('/dashboard/server-todos');

        return newTodo;

    }catch(err) {
        console.log(err);
        return { 
            message: 'Error al crear el todo'
        };
    }
};

export const deletedCompleted = async(): Promise<number> => {
    const user = await getUserSessionServer();
    if(!user) redirect('/api/auth/signin');
    const {count} = await prisma.todo.deleteMany({
        where: {
            complete: true,
            userId: user.id
        }
    });

    revalidatePath('/dashboard/server-todos');

    return count;
};