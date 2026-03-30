import { useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, content: string) => Promise<void>;
  onToggle: (id: number) => Promise<void>;
};

function TodoItem({ todo, onDelete, onEdit, onToggle }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(todo.title);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEdit = async (): Promise<void> => {
    if (!editContent.trim()) return;
    setIsSubmitting(true);
    await onEdit(todo.id, editContent.trim());
    setIsSubmitting(false);
    setIsEditing(false);
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditContent(todo.title); // 원래 내용으로 복원
      setIsEditing(false);
    }
  };
  //console.log(`ID: ${todo.id}, 제목: ${todo.title}, 완료여부: ${todo.done}`);

  return (
    <li className={`todo-item ${todo.done ? 'completed' : ''}`}>
      <input
        type='checkbox'
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
        disabled={isSubmitting}
        />

      {isEditing ? (
        <input
          type="text"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          autoFocus
          className='edit-input'
        />
      ) : (
        <span
          className='todo-text'
          onDoubleClick={() => setIsEditing(true)}
          >
          {todo.title}
        </span>
      )}
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        삭제
      </button>
    </li>
  );
}

export default TodoItem;