import ky from 'ky';
import { Todo, CreateTodoRequest } from '../types/todo';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. 전체 목록 가져오기 (기존 동일)
export async function fetchTodos(): Promise<Todo[]> {
  return api.get('todolist').json<Todo[]>();
}

// 2. 새 Todo 항목 추가 (기존 동일)
export async function createTodo(body: CreateTodoRequest): Promise<Todo> {
  return api.post('todolist', { json: body }).json<Todo>();
}

// 3. Todo 항목 제목 수정 (PATCH /todolist/:id/title)
export async function updateTodoTitle(id: number, title: string): Promise<Todo> {
  return api.patch(`todolist/${id}/title`, { json: { title } }).json<Todo>();
}

// 4. Todo 항목 완료 상태 직접 수정 (PATCH /todolist/:id/done)
export async function updateTodoDone(id: number, done: boolean): Promise<Todo> {
  return api.patch(`todolist/${id}/done`, { json: { done } }).json<Todo>();
}

// 5. Todo 항목 완료 상태 토글 (PATCH /todolist/:id)
// 데이터를 보내지 않고 호출만 하면 서버가 알아서 반전시킵니다.
export async function toggleTodoStatus(id: number): Promise<Todo> {
  return api.patch(`todolist/${id}`).json<Todo>();
}

// 6. 삭제 (기존 동일)
export async function deleteTodoApi(id: number): Promise<void> {
  await api.delete(`todolist/${id}`);
}