
import { TodosGrid } from '@/todos';
import { Metadata } from 'next';

import prisma from '@/lib/prisma';

export const metadata: Metadata = {
    title: 'Lista de todos',
    description: 'Trayendo todos'
};

export default async function RestTodosPage() {

    const todos = await prisma.todo.findMany();

    return (
        <>
            {/*TODO: Formulario para agregar todos */}

            <TodosGrid todos={todos}/>
        </>
    );
}