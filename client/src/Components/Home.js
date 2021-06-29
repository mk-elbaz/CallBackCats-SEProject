import React from 'react';
import cookie from 'react-cookie'

const Home = ()=>{
    console.log(cookie.load('token'))
    const x = document.cookie
    return x;
}
export default Home;