
import { TodosGrid } from '@/todos';
import { Metadata } from 'next';

import prisma from '@/lib/prisma';
import { NewTodo } from '@/app/components';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Lista de todos',
    description: 'Trayendo todos'
};

export default async function RestTodosPage() {

    const todos = await prisma.todo.findMany();

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