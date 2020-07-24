import React, { useState } from "react";
import { axiosWithAuth } from '../auth/axiosWithAuth';

const Login = (props) => {
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  });

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
        .post('/api/login', creds)
        .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.payload);
            props.history.push('/protected');
        })
        .catch(err => console.log('Error: ', err.error));
  };

  const handleChange = e => {
    setCreds({
    ...creds,
    [e.target.name]: e.target.value,
    })
  };

  return (
    <>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={creds.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
          />
          <button type='submit'>Log in</button>
        </form>
    </>
  );
};

export default Login;
