import React, { useEffect, useState } from "react";
import { ReactComponent as GemImage } from "../Images/Elements/Gem.svg";

const Gem = () => {
    const [gems, setGems] = useState(0);

    useEffect(() => {
        const item = localStorage.getItem("gems");
        if (item) {
            setGems(parseInt(item));
        } else {
            localStorage.setItem("gems", "0");
        }
    }, []);

    return (
        <div className="gem-bar">
            <p>{gems}</p>
            <GemImage className="gem" />
        </div>
    );
};

export default Gem;
