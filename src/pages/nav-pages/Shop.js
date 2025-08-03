import React, { useEffect, useState } from "react";
import Gem from "../../components/Gem";
import { ReactComponent as Wonder } from "../../Images/Characters/character-wonder.svg";
import { ReactComponent as GemImage } from "../../Images/Elements/Gem.svg";

const Shop = () => {
    const gems = parseInt(localStorage.getItem("gems"));

    const [charactersToUnlock, setCharactersToUnlock] = useState([
        ["wonder", 500],
    ]);

    useEffect(() => {
        const charactersStorage = JSON.parse(
            localStorage.getItem("charactersToUnlock")
        );
        if (charactersStorage) {
            setCharactersToUnlock(charactersStorage);
        } else {
            localStorage.setItem(
                "charactersToUnlock",
                JSON.stringify(charactersToUnlock)
            );
        }
    }, []);

    return (
        <section className="shop">
            <header>
                <h1>Boutique</h1>
                <Gem />
            </header>

            <div className="styles">
                <div
                    className="style "
                    style={{
                        display:
                            charactersToUnlock[0][0].length > 0
                                ? "flex"
                                : "none",
                    }}
                    onClick={() => {
                        if (charactersToUnlock[0][1] <= gems) {
                            localStorage.setItem(
                                "gems",
                                `${gems - charactersToUnlock[0][1]}`
                            );

                            localStorage.setItem(
                                "character",
                                charactersToUnlock[0][0]
                            );

                            const charactersToUnlockModif =
                                charactersToUnlock.map((c, i) => {
                                    if (i === 0) {
                                        return ["", 0];
                                    } else {
                                        return c;
                                    }
                                });
                            setCharactersToUnlock(charactersToUnlockModif);

                            localStorage.setItem(
                                "charactersToUnlock",
                                JSON.stringify(charactersToUnlockModif)
                            );

                            window.location.reload();
                        }
                    }}
                >
                    <h3>{charactersToUnlock[0][0]}</h3>
                    <Wonder
                        className={`character-to-buy ${
                            charactersToUnlock[0][0].length > 0 ? "not-buy" : ""
                        }`}
                    />

                    <div className="prize">
                        <p>{charactersToUnlock[0][1]}</p>
                        <GemImage
                            className="gem"
                            style={{
                                filter:
                                    charactersToUnlock[0][1] > gems
                                        ? "grayscale(1)"
                                        : "none",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shop;
