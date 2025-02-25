import React, { useState } from 'react';
import './InputTodo.css';

interface InputTodoProps {
  addTask: (text: string) => void;
}

const InputTodo: React.FC<InputTodoProps> = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введите новую задачу"
      />
      <button onClick={handleAddTask}>Добавить</button>
    </div>
  );
};

export default InputTodo;