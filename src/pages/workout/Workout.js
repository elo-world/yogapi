import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Character from "../../components/Character";
import { ReactComponent as Hand } from "../../Images/Characters/hand.svg";
import { ReactComponent as Flower } from "../../Images/Elements/Flower.svg";
import { ReactComponent as TimerFlower } from "../../Images/Elements/TimerFlower.svg";
import { ReactComponent as Play } from "../../Images/Icons/play.svg";
import { ReactComponent as Pause } from "../../Images/Icons/pause.svg";
import PopUpMenu from "../../components/PopUpMenu";

const Workout = () => {
    const navigate = useNavigate();

    const switchSong = new Audio("./Audio/Ding.wav");

    const workoutDuration = 45;
    const breakDuration = 5;
    const maxPosition = 10;

    const [seconds, setSeconds] = useState(workoutDuration);
    const [position, setPosition] = useState(0);
    const [timerOn, setTimerOn] = useState(true);
    const [timerStyle, setTimerStyle] = useState("workout");
    const [images, setImages] = useState([]);

    const maxSeconds = maxPosition * workoutDuration;

    useEffect(() => {
        // Demande un verrouillage d'écran
        navigator.wakeLock
            .request("screen")
            .then((wakeLock) => {
                console.log("Le verrouillage d'écran a été activé.");

                // Maintient le verrouillage d'écran actif
                wakeLock.addEventListener("release", () => {
                    console.log("Le verrouillage d'écran a été libéré.");
                });
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de l'activation du verrouillage d'écran :",
                    error
                );
            });

        let temp = [];
        for (var i = 0; i < maxPosition; i++) {
            temp.push(i);
        }
        setImages(temp);
    }, []);

    useEffect(() => {
        let interval;
        if (timerOn) {
            if (
                position === maxPosition - 1 &&
                seconds <= 0 &&
                timerStyle === "workout"
            ) {
                setTimeout(() => {
                    setTimerOn(false);
                    navigate("/workout-completed");
                }, 1000);
            } else {
                interval = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds - 1);

                    if (seconds <= 0) {
                        if (timerStyle === "workout") {
                            setPosition((prevPosition) => prevPosition + 1);
                            setSeconds(breakDuration);
                            setTimerStyle("break");
                            switchSong.play();
                        } else {
                            setSeconds(workoutDuration);
                            setTimerStyle("workout");
                        }
                    }
                }, 1000);
            }
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn, seconds, position, timerStyle, navigate]);

    const displayPopUpmenu = () => {
        if (timerOn === false) {
            return <PopUpMenu setTimerOn={setTimerOn} navigate={navigate} />;
        }
    };

    return (
        <section className="workout">
            {displayPopUpmenu()}

            <button
                className="play"
                onClick={() => {
                    setTimerOn(!timerOn);
                }}
            >
                {timerOn ? <Pause /> : <Play />}
            </button>

            <div className="timer-flower">
                <p>{seconds}</p>
                <TimerFlower className={`flower ${timerStyle}-style`} />
            </div>

            <div className="display">
                <Character />
                <div className="images">
                    <div className="images-box">
                        {images.map((image) => (
                            <img
                                key={image + 1}
                                src={`./Images/Workout/Positions/${
                                    image + 1
                                }.png`}
                                alt=""
                                style={{
                                    display:
                                        images.indexOf(image) === position
                                            ? "block"
                                            : "none",
                                }}
                            />
                        ))}
                        <Hand
                            className="left-hand"
                            onClick={() => {
                                if (position > 0) {
                                    setTimerStyle("break");
                                    setSeconds(breakDuration);
                                    setPosition(position - 1);
                                    setTimerOn(true);
                                }
                            }}
                        />
                        <Hand
                            className="right-hand"
                            onClick={() => {
                                if (position < maxPosition - 1) {
                                    setTimerStyle("break");
                                    setSeconds(breakDuration);
                                    setPosition(position + 1);
                                    setTimerOn(true);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="progress">
                <div className="progress-bar">
                    <div
                        className="progress-cursor"
                        style={{
                            transform:
                                timerStyle === "break"
                                    ? `scaleX(${position / maxPosition})`
                                    : `scaleX(${
                                          (position * workoutDuration +
                                              (workoutDuration - seconds)) /
                                          maxSeconds
                                      })`,
                        }}
                    ></div>
                </div>
                <Flower
                    className="flower"
                    style={{
                        left:
                            timerStyle === "break"
                                ? `${(position / maxPosition) * 100}%`
                                : `${
                                      ((position * workoutDuration +
                                          (workoutDuration - seconds)) /
                                          maxSeconds) *
                                      100
                                  }%`,
                    }}
                />
            </div>
        </section>
    );
};

export default Workout;
