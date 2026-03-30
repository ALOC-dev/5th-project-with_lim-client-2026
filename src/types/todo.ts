export interface Todo {
  id: number;
  title: string;
  done: boolean;
};


// POST 요청 시에
export type CreateTodoRequest = {
  title: string;
};

// PUT 요청 시에
export interface UpdateTodoRequest {
  title?: string;
  done?: boolean;
};