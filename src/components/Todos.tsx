import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeTodo,
  completeTodo,
  updateTodo,
} from '../features/todos/todoSlice';
import type { ITodo, ITodoState } from '../features/todos/types';

const ToDo = () => {
  const [value, setValue] = useState<string>('');
  const [editID, setEditID] = useState<string | number | null>('');
  const dispatch = useDispatch();
  const todos = useSelector((state: ITodoState) => state.todos);
  console.log('todos', todos);

  return (
    <div>
      {todos.map((todo: ITodo) => {
        const isEditing: boolean = todo.id === editID;

        return (
          <div
            key={todo.id}
            style={{ display: 'flex', gap: '1rem', padding: '1rem' }}
          >
            <div>
              {isEditing ? (
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                <h2
                  style={{
                    textDecoration: todo.isComplete ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </h2>
              )}
              {isEditing ? (
                <button
                  onClick={() => {
                    dispatch(updateTodo({ id: editID, text: value }));
                    setEditID(null);
                    setValue('');
                  }}
                >
                  save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditID(todo.id);
                    setValue(todo.text);
                  }}
                >
                  edit
                </button>
              )}
            </div>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              remove
            </button>
            <button onClick={() => dispatch(completeTodo({ ...todo }))}>
              {todo.isComplete ? 'undone' : 'done'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToDo;
