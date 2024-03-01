'use client';

import { Todo } from '@prisma/client';
import { TodoItem } from './TodoItem';

import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({todos = []}: Props) => {

    console.log(todos);
    const router = useRouter();
    const onToggleTodo = async(id: string, complete: boolean) => {
        const updatedTodo = await todosApi.updateTodo(id, complete);
        router.refresh();
        return updatedTodo;
    }; 

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
            {
                todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={onToggleTodo}/>
                ))
            }
        </div>
    );
};
