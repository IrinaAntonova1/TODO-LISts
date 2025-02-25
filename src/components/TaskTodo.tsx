import React, { useState } from 'react';
import { Todo } from '../model/todo.model';
import './TaskTodo.css';

interface TaskTodoProps {
  todo: Todo;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  editTask: (id: string, newText: string) => void;
}

const TaskTodo: React.FC<TaskTodoProps> = ({
  todo,
  deleteTask,
  toggleTaskCompletion,
  editTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      editTask(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTaskCompletion(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <button className="edit" onClick={handleEdit}>
        {isEditing ? 'Сохранить' : 'Редактировать'}
      </button>
      <button className="delete" onClick={() => deleteTask(todo.id)}>
        Удалить
      </button>
    </div>
  );
};

export default TaskTodo;