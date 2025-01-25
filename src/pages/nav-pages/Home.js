import React, { useEffect, useState } from "react";
import Character from "../../components/Character";
import Gem from "../../components/Gem";
import { Link } from "react-router-dom";
import { ReactComponent as Background } from "../../Images/Elements/Background.svg";

const Home = () => {
    const [series, setSeries] = useState(0);

    useEffect(() => {
        const number = localStorage.getItem("series");
        if (number) {
            setSeries(parseInt(number));
        } else {
            localStorage.setItem("series", "0");
        }
    }, []);

    return (
        <section className="home">
            <header>
                <div className="header-padding">
                    <div className="workout-day-bar">
                        <div className="bar">
                            <div
                                className="cursor"
                                style={{
                                    transform: `scaleX(${(series % 7) / 7})`,
                                }}
                            ></div>
                            <p>{series % 7}/7</p>
                        </div>
                    </div>
                    <Gem />
                </div>
            </header>
            <div className="start-workout">
                <div className="images">
                    <Character />
                    <Background className="background" />
                </div>
                <Link to="/workout">
                    <button className="main-button">
                        Commencer la session
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Home;
