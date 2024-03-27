// // LoginForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function LoginForm({ setToken }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3005/login', {
//         username,
//         password,
//       });
//       const token = response.data.token;
//       setToken(token);
//       // Сохраните токен в локальном хранилище или куках
//     } catch (error) {
//       console.error('Ошибка аутентификации:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Логин"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Пароль"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Войти</button>
//     </form>
//   );
// }

// export default LoginForm;
