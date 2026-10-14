import { useReducer, useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Иван', active: true },
  { id: 2, name: 'Мария', active: false },
  { id: 3, name: 'Алексей', active: true },
];

function usersReducer(users, action) {
  switch (action.type) {
    case 'edit':
      return users.map((user) =>
        user.id === action.id
          ? { ...user, name: action.name }
          : user
      );

    case 'toggle':
      return users.map((user) =>
        user.id === action.id
          ? { ...user, active: !user.active }
          : user
      );

    case 'delete':
      return users.filter((user) => user.id !== action.id);

    default:
      return users;
  }
}

function UserList() {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);
  const [names, setNames] = useState({});

  return (
    <div>
      <h1>Список пользователей</h1>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            color: user.active ? 'green' : 'gray',
            marginBottom: '20px',
          }}
        >
          <h2>{user.name}</h2>
          <p>{user.active ? 'Активен' : 'Неактивен'}</p>

          <input
            value={names[user.id] ?? user.name}
            onChange={(event) =>
              setNames({ ...names, [user.id]: event.target.value })
            }
          />

          <button
            onClick={() => {
              dispatch({
                type: 'edit',
                id: user.id,
                name: names[user.id] ?? user.name,
              });
              setNames({ ...names, [user.id]: user.name });
            }}
          >
            Сохранить
          </button>

          <button
            onClick={() => dispatch({ type: 'toggle', id: user.id })}
          >
            Переключить статус
          </button>

          <button
            onClick={() => dispatch({ type: 'delete', id: user.id })}
          >
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserList;



