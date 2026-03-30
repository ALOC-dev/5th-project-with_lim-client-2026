import ky from 'ky';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// 전체 목록 가져오기
export async function fetchTodos(): Promise<Todo[]> {
  return api.get('todolist').json<Todo[]>(); // JSON으로 파싱하면서 동시에 타입
}

export async function createTodo(body: CreateTodoRequest): Promise<Todo> {
  return api.post('todolist', { json: body }).json<Todo>();
}

export async function updateTodo(id: number, body: UpdateTodoRequest): Promise<Todo> {
  return api.patch(`todolist/${id}`, { json: body }).json<Todo>();
}

export async function deleteTodoApi(id: number): Promise<void> {
  await api.delete(`todolist/${id}`); // 삭제는 돌려받는 데이터가 없으므로 .json() 호출하지 않음
}