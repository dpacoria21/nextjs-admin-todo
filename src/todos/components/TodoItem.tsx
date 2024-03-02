import { Todo } from '@prisma/client';

import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface Props {
    todo: Todo,
    toggleTodo: (id: string, complete: boolean) => Promise<Todo|null>
}

export const TodoItem = ({todo, toggleTodo}: Props) => {

    return (
        <div className={todo.complete ? styles.todoDone: styles.todoPending}>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
                <div onClick={() => toggleTodo(todo.id, !todo.complete)} className={`flex p-2 rouded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${todo.complete ? 'bg-blue-100': 'bg-red-100'}`}>
                    {
                        todo.complete
                            ? <IoCheckboxOutline size={30}/>
                            : <IoSquareOutline size={30}/>
                    }
                </div>
                <div className='text-center sm:text-left'>
                    {todo.description}
                </div>
            </div>
        </div>
    );
};