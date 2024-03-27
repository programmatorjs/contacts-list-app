// import React, { useState } from 'react';

// function LoginForm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Действия по отправке данных, например, отправка на сервер или обработка локально
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={handleUsernameChange} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={handlePasswordChange} />
//       </label>
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginForm;
