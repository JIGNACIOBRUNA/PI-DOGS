import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "./logodog.png";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () =>{
    return(
        <nav className={style.navbar}>
            <div className={style.logo}>
                <Link to="/"><img src={logo} alt="Logo"/></Link>
            </div>
            <div className={style.links}>
                <Link to="/home">Home</Link>
                <Link to="/form">Form</Link>
                {/* <Link to="/dog/:id">Detail</Link> */}
            </div>
            <SearchBar/>
        </nav>
    )
}

export default Navbar;