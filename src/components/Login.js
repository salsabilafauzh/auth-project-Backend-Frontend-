import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMSG, setErrorMsg] = useState('');

  const navigate = useNavigate();

  console.log({ email, password });
  const Login = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      navigate('/Dashboard');
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.response.data.message);
    }
  };
  return (
    <div class="flex justify-center mt-48">
      <div class=" w-full max-w-md">
        <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={Login}>
          <h3 class="text-red-600 mb-5 text-center">{errorMSG}</h3>
          <h1 class="text-blue-500 mb-5 text-center">Selamat Datang!</h1>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
          </div>
        </form>
        <p>
          Belum memiliki akun? buat{' '}
          <a href="/Register" class="text-blue-400">
            disini.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
