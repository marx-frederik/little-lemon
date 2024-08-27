import React from 'react';
import { Nav } from '../Nav';
import "./layout.css";

const Layout =({children}) =>{
    return(
        <>
            <Nav/>
            <main>{children}</main>
        </>
    )
}

export default Layout;
