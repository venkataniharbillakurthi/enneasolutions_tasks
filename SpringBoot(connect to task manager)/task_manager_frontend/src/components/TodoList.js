import React from 'react';

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}
          onClick={() => onToggle(todo.id)}
        >
          <p className="todo-text">{todo.text}</p>
          <span onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}>×</span>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
