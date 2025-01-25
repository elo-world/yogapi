import React, { useEffect, useState } from "react";
import { ReactComponent as Simple } from "../Images/Characters/character-simple.svg";
import { ReactComponent as Wonder } from "../Images/Characters/character-wonder.svg";

const Character = () => {
    const [character, setCharacter] = useState("simple");

    useEffect(() => {
        var currentDate = new Date();
        if (
            `${currentDate.getDate()}/${currentDate.getMonth() + 1}` === "10/3"
        ) {
            setCharacter("wonder");
        } else {
            var characterStorage = localStorage.getItem("character");
            if (characterStorage) {
                setCharacter(characterStorage);
            } else {
                setCharacter("simple");
                localStorage.setItem("character", "simple");
            }
        }
    }, []);

    window.addEventListener("mousemove", (e) => {
        if (document.querySelector("#character")) {
            var px;
            var py;
            var sy;

            for (var i = 1; i < 3; i++) {
                var eye = document.querySelector(
                    `.character #character #head #eyes #eye-${i} #pupil`
                );

                if (eye) {
                    var x = e.clientX;
                    var y = e.clientY;

                    var positions = eye.getBoundingClientRect();
                    positions.x += positions.width / 2;

                    if (i === 1) {
                        if (x - positions.x > 0) {
                            px =
                                (x - positions.x) /
                                (window.innerWidth - positions.x);
                        } else {
                            px = ((x - positions.x) / positions.x) * 5;
                        }
                    } else {
                        if (x - positions.x > 0) {
                            px =
                                ((x - positions.x) /
                                    (window.innerWidth - positions.x)) *
                                5;
                        } else {
                            px = (x - positions.x) / positions.x;
                        }
                    }

                    if (y - positions.y < 0) {
                        py = ((y - positions.y) / positions.y) * 2;
                        sy = 1;
                    } else {
                        py = 0;
                        sy = 1 - ((y - positions.y) / positions.y) * 0.08;
                    }

                    const keyframes = {
                        transform: `translate(${
                            Math.round(px * 1000) / 1000
                        }%, ${Math.round(py * 1000) / 1000}%) scaleY(${
                            Math.round(sy * 100) / 100
                        })`,
                    };

                    eye.animate(keyframes, {
                        duration: 800,
                        fill: "forwards",
                    });
                }
            }
        }
    });

    if (character === "simple") {
        return (
            <div className="character">
                <Simple />
            </div>
        );
    } else if (character === "wonder") {
        return (
            <div className="character">
                <Wonder />
            </div>
        );
    }
};

export default Character;
