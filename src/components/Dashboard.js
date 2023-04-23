import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expired, setExpired] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getToken', {
        withCredentials: true,
      });
      setToken(res.data.accessToken);
      const decoded = jwt_decode(res.data.accessToken);
      setName(decoded.userName);
      setExpired(decoded.exp);
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        navigate('/');
      }
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (res) {
        var table = document.getElementById('tableUser');
        for (var i = 0; i < res.data.length; i++) {
          var row = `<tr >
            <td>${res.data[i].id}</td>
            <td>${res.data[i].name}</td>
            <td>${res.data[i].email}</td>
            <tr>`;
          table.innerHTML += row;
        }

        document.getElementById('btnGetUser').disabled = true;
        // setUsersData(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div class=" w-full  text-white justify-start">
      <div class="flex justify-between space-x-10  bg-cyan-600  p-4">
        <h1 class="text-xl p-2">DASHBOARD</h1>
        <div class="flex justify-start space-x-8 ">
          <button class="border-2 p-2 border- hover:bg-slate-700 rounded-lg">Profile</button>
          <button class="border-2 p-2 border-  hover:bg-slate-700 rounded-lg">About</button>
          <button class="border-2 p-2 border- hover:bg-slate-700 rounded-lg">Contact</button>
        </div>

        <div class="flex justify-end ">
          <button onClick={Logout} class="p-2 hover:bg-slate-700 rounded-lg">
            Logout
          </button>
        </div>
      </div>

      <div class="container m-10">
        <h2 class="text-black text-lg">Selamat datang, {name}!</h2>
        <button class="bg-teal-700 text-white p-3 rounded-lg hover:bg-slate-700 mt-4" onClick={getUser} id="btnGetUser">
          Show All Users
        </button>
        <br />
        <table class="bg-zinc-300 text-slate-800 m-5 rounded-md" cellPadding="20">
          <thead class="p-2 bg-zinc-500">
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody id="tableUser"></tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
