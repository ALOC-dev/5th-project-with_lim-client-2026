import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { fetchTodos, createTodo, updateTodo, deleteTodoApi } from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async (): Promise<void> => {
      setLoading(true); // 로딩 시작
      try {
        const data = await fetchTodos(); // API 호출
        setTodos(data);
      } catch (e) {
        setError('목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const addTodo = async (title: string): Promise<void> => {
    try {
      const newTodo = await createTodo({ title }); // 서버에 추가 요청
      setTodos([...todos, newTodo]);
    } catch (e) {
      setError('추가에 실패했습니다.');
    }
  };

const editTodo = async (id: number, title: string): Promise<void> => {
  console.log("1. editTodo 시작, ID:", id, "Title:", title);
  
  const target = todos.find(t => t.id === id);
  console.log("2. 찾은 대상:", target);

  if (!target) {
    console.log("3. 대상을 못 찾아서 종료됨!");
    return;
  }

  try {
    console.log("4. 서버에 요청 보냄...");
    const updated = await updateTodo(id, { title, done: target.done });
    console.log("5. 서버 응답 완료:", updated);
    // ... 후속 로직
  } catch (e) {
    console.error("6. 에러 발생:", e);
    setError('수정에 실패했습니다.');
  }
};

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await deleteTodoApi(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (e) {
      setError('삭제에 실패했습니다.');
    }
  };

  const toggleTodo = async (id: number): Promise<void> => {
      const target = todos.find(t => t.id == id);
      if(!target) return;

      try {
        const updated = await updateTodo(id, { 
          title: target.title,
          done: !target.done
        });
        setTodos(todos.map(t => t.id === id ? updated : t));
      } catch (e) {
        setError('상태 변경에 실패했습니다.');
    }
  };

  return { todos, loading, error, addTodo, editTodo, deleteTodo, toggleTodo };
}