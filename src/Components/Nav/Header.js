import React, { useState } from 'react';

import { Menu } from 'antd';

import { Link } from 'react-router-dom';

import {  AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined ,LogoutOutlined} from '@ant-design/icons';

import firebase from 'firebase';

import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const { SubMenu, Item } = Menu;


const Header = () => {

  let dispatch = useDispatch();
  let {user} = useSelector((state) => ({...state}))
  let history = useHistory();

    const [current, setCurrent] = useState('home');

    const handleClick = (e) => {
      setCurrent(e.key);
    }

    const logout = () => {
      firebase.auth().signOut();
      dispatch({
        type: 'LOGOUT',
        payload: null,
      });
      history.push('/login');
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
         <Link to="/home" >Home</Link> 
        </Item>
        {
          (!user && (
            <Item key="register" icon={<UserAddOutlined />} className='float-right' >
          <Link to="/register" >Register</Link> 
          </Item>
          ))
        }
        {
          (!user && (
            <Item key="login" icon={<UserOutlined />} className='float-right' >
            <Link to="/login" >Login</Link> 
            </Item>
          ) 
            )
        }
        {
          user && (
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className='float-right'>
          <Menu.ItemGroup >
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LogoutOutlined/>} onClick={logout} >Logout</Item>
          </Menu.ItemGroup>
          
        </SubMenu>
          )
        }
        
      </Menu>

    )
}

export default Header ;