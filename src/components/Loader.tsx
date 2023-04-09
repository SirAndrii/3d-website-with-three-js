import React from "react";
import AnimatedLogo from '../assets/images/logo-animated.gif'

export default function Loader() {
    return (

        <div className={"loader"}>
            <img className={"logo"} src={AnimatedLogo} alt={"Apple loader"}/>
        </div>

    )
}