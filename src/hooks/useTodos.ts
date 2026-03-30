import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { 
  fetchTodos, 
  createTodo, 
  deleteTodoApi, 
  updateTodoTitle, // 제목 수정용
  updateTodoDone   // 체크 상태 수정용
} from '../api/todoApi';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. 목록 가져오기 (마운트 시 실행)
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  // 2. 새로운 할 일 추가
  const addTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({ title });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('추가에 실패했습니다.');
    }
  };

  // 3. 제목 수정 (Edit 기능)
  const editTodo = async (id: number, title: string) => {
    try {
      // 텍스트 수정 전용 API를 호출합니다!
      const updated = await updateTodoTitle(id, title);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError('제목 수정에 실패했습니다.');
    }
  };

  // 4. 체크 상태 수정 (Toggle 기능)
  const toggleTodo = async (id: number) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;

    try {
      // 체크 상태 전용 API를 호출합니다!
      // 현재 상태의 반대값(!target.done)을 직접 보냅니다.
      const updated = await updateTodoDone(id, !target.done);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError('상태 변경에 실패했습니다.');
    }
  };

  // 5. 할 일 삭제
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoApi(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError('삭제에 실패했습니다.');
    }
  };

  return { todos, loading, error, addTodo, editTodo, toggleTodo, deleteTodo };
};