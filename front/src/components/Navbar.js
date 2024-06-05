import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import LogoutButton from "./LogoutButton";
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeButton from "./HomeButton";

const Navbar = () => {
    const { isLoggedIn, userEmail } = useAuth();

    let navmenu;
    if(isLoggedIn) {
        navmenu = (
            <NavMenu>
                <NavLink to="/">
                    Strona główna
                </NavLink>
                <NavLink to="/cars">
                    Samochody
                </NavLink>
                <NavLink to="/my-rents">
                    Moje wypozyczenia
                </NavLink>

                {userEmail && String(userEmail).startsWith("admin") && (
                    <NavLink to="/add-car">
                        Dodaj Samochód
                    </NavLink>
                )}
                <LogoutButton/>

            </NavMenu>
        )
    }
    else if (!isLoggedIn){
        navmenu = (
            <NavMenu>
                <NavLink to="/">
                    Strona główna
                </NavLink>
                <NavLink to="/cars">
                    Samochody
                </NavLink>
                <NavLink to="/login">
                    Zaloguj się
                </NavLink>
                <NavLink to="/register">
                    Zarejestruj się
                </NavLink>
            </NavMenu>
        )
    }
    return (
        <>
            <Nav>
                <HomeButton/>
                {navmenu}
            </Nav>
        </>
    );
};

export default Navbar;