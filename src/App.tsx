import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const { todos, loading, error, addTodo, editTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoInput onAdd={addTodo} />
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}

export default App;