export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { TodosGrid } from '@/todos';
import { Metadata } from 'next';

import prisma from '@/lib/prisma';
import { NewTodo } from '@/app/components';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Lista de todos',
    description: 'Trayendo todos'
};

export default async function RestTodosPage() {

    const user = await getUserSessionServer();

    if(!user) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany(
        {
            orderBy: {description: 'asc'},
            where: {
                userId: user?.id
            }
        }
    );

    return (
        <div>
            {/*TODO: Formulario para agregar todos */}
            <div className='w-full px-5 mx-5 mb-5'>
                <NewTodo />
            </div>

            <TodosGrid todos={todos}/>
        </div>
    );
}