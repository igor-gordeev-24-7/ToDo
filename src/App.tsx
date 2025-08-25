import React, { useState } from 'react';
import './App.module.scss';
import { useTodos } from './hooks/useTodos';
import type { Todo } from './types/Todo';

import style from './App.module.scss'

import ErrorMessage from './components/ErrorMessage/ErrorMessage'; 

const App: React.FC = () => {
  const { todos, addTodo, toggleTodo, changeTextTodo, deleteTodo } = useTodos();
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      setError('Текст задачи не может быть пустым');
      return;
    }

    addTodo(trimmed);
    setInput('');
    if(error) setError(null);
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);

    if (error) setError(null);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      const trimmedText = editText.trim();

      if (!trimmedText) {
        setError('Текст задачи не может быть пустым');
        return;
      }

      changeTextTodo(editingId, trimmedText);
      setEditingId(null);
      setEditText('');
      if (error) setError(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.app}>
        <h1 className={style.heading}>Todo App</h1>

        {error && (
          <ErrorMessage
            message={error}
            onClose={() => setError(null)}
            autoHideDuration={5000}
          />
        )}

        <form onSubmit={handleSubmit} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Что нужно сделать"
            className={style.formInput}
            onFocus={() => error && setError(null)}
          />
          <button type="submit" className={style.button}>
            Добавить
          </button>
        </form>

        <ul className={style.todoList}>
          {todos.map((todo: Todo) => (
            <li key={todo.id} className={style.todoItemLi}>
              {editingId === todo.id ? (
                // Режим редактирования
                <div className={style.todoItem}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    className={style.editInput}
                  />
                  <button onClick={saveEdit} className={style.saveBtn}>
                    Сохранить
                  </button>
                  <button onClick={cancelEdit} className={style.cancelBtn}>
                    Отмена
                  </button>
                </div>
              ) : (
                // Обычный режим
                <div className={style.todoItem}>
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => startEditing(todo)}
                    className={style.spanText}
                  >
                    {todo.text}
                  </span>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox"
                  />
                  <button onClick={() => startEditing(todo)} className="edit-btn">
                    Редактировать
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                    Удалить
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;