import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import './App.scss'

import App from './App.tsx'
import UserPage from './screens/users.page.tsx'


import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link
} from "react-router-dom";

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: <Link to={'/'}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={'/users'}>Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (<Menu
    onClick={onClick}
    selectedKeys={[current]}
    mode="horizontal"
    items={items}
  />
  )
};


const LayoutAdmin = () => {

  const getToken = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login",
      {
        method: "POST",
        body: JSON.stringify({
          username: "admin@gmail.com",
          password: "123456"
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
    const d = await res.json()
    if (d.data) {
      localStorage.setItem("access_token", d.data.access_token)
      }
    }

    useEffect(() => {
      getToken()
    }, [])

    return (
      <div>
        <Header />
        <Outlet />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutAdmin />,
      children: [
        { index: true, element: <App /> },
        {
          path: "/users",
          element: <UserPage />,
        },
        {
          path: "/tracks",
          element: <div>manage tracks</div>,
        },
      ]
    },
  ]);

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
