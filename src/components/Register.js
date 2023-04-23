import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comPassword, setComPassword] = useState('');
  const [errorMSG, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/register',
        {
          name: name,
          email: email,
          password: password,
          comPassword: comPassword,
        },
        {
          withCredentials: true,
        }
      );
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div class="flex justify-center mt-28">
      <div class=" w-full max-w-md">
        <form onSubmit={Register} class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          <h3 class="text-red-600 mb-5 text-center">{errorMSG}</h3>
          <h1 class="text-blue-500 mb-5 text-center">Selamat Datang!</h1>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Confirm Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setComPassword(e.target.value)}
              placeholder="******************"
            />
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
          </div>
        </form>
        <p>
          Belum memiliki akun? buat{' '}
          <a href="/" class="text-blue-400">
            disini.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
