import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, content: string) => Promise<void>;
  onToggle: (id: number) => Promise<void>;
};

function TodoList({ todos, onDelete, onEdit, onToggle }: Props) {
  if (todos.length === 0) {
    return <p>할 일이 없습니다.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
          
        />
      ))}
    </ul>
  );
}

export default TodoList;