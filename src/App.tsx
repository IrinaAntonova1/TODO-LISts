import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputTodo from './components/InputTodo';
import TaskTodo from './components/TaskTodo';
import FilterButtons from './components/FilterButtons';
import { Todo } from './model/todo.model';
import { v4 as uuidv4 } from 'uuid';
import './styles/index.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = (text: string) => {
    const newTask: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTask]);
  };

  const deleteTask = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTask = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, isEditing: false, completed: false }
          : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <div className="App">
      <Header />
      <InputTodo addTask={addTask} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      {filteredTodos.map((todo) => (
        <TaskTodo
          key={todo.id}
          todo={todo}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default App;