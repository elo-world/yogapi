import React, { useEffect, useState } from "react";
import Character from "../../components/Character";
import { useNavigate } from "react-router-dom";
import Gem from "../../components/Gem";

const WorkoutCompleted = () => {
    const navigate = useNavigate();
    const [gemsToAdd, setGemsToAdd] = useState(0);

    const series = parseInt(localStorage.getItem("series"));
    const gems = parseInt(localStorage.getItem("gems"));
    const gemsToAddCalc = 10 * ((series % 6) + 1);

    useEffect(() => {
        var storageDate = localStorage.getItem("date");
        if (storageDate) {
            var date = new Date();
            var strDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            setGemsToAdd(gemsToAddCalc);
            localStorage.setItem("date", strDate);
        } else {
            setGemsToAdd(gemsToAddCalc);
            var date = new Date();
            var strDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            localStorage.setItem("date", strDate);
        }
    }, []);

    return (
        <div className="workout-completed">
            <div className="confetti">
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
                <div className="confetti-piece"></div>
            </div>

            <div className="gems">
                <p className="gems-to-add">
                    {gemsToAdd > 0 ? `+${gemsToAdd}` : ""}
                </p>
                <Gem />
            </div>

            <h1>
                Entrainement
                <br /> Terminé
            </h1>
            <Character />
            <button
                className="main-button"
                onClick={() => {
                    localStorage.setItem("series", `${series + 1}`);
                    if (gemsToAdd > 0) {
                        localStorage.setItem("gems", `${gems + gemsToAdd}`);
                    }
                    navigate("/");
                }}
            >
                Continuer
            </button>
        </div>
    );
};

export default WorkoutCompleted;
