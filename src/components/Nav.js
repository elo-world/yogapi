import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as HomeImage } from "../Images/Icons/home.svg";
import { ReactComponent as ExercicesImage } from "../Images/Icons/exercise.svg";
import { ReactComponent as PreferenceImage } from "../Images/Icons/preference.svg";
import { ReactComponent as ShopImage } from "../Images/Icons/shop.svg";

const Nav = () => {
    return (
        <>
            <Outlet />
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <HomeImage />
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link to="/exercices">
                            <ExercicesImage />
                            Exercices
                        </Link>
                    </li>
                    <li>
                        <Link to="/preferences">
                            <PreferenceImage />
                            Préférences
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop">
                            <ShopImage />
                            Boutique
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;
