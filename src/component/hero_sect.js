import React from "react";
import hero_img1 from "../images/pexels-karolina-grabowska-5632402.jpg"
import hero_img2 from "../images/pexels-karolina-grabowska-5650040 (1).jpg"
import hero_img3 from "../images/pexels-karolina-grabowska-5650043.jpg"
import hero_img4 from "../images/pexels-karolina-grabowska-5632402.jpg"


export default function Hero() {
    function f(e) {
       console.log(e)
    }

    return( 
        <div className="hero-cont">
            <div className="hero_track-slider"> 
                <div className="slider c1">
                    <img src={hero_img1}  className="hero-img1"/>
                </div>
                <div className="slider c2">
                    <img src={hero_img2}  className="hero-img2"/>
                </div>
                <div className="slider c3">
                    <img src={hero_img3}  className="hero-img3"/>
                </div>
                <div className="slider c4">
                    <img src={hero_img4}  className="hero-img4"/>
                </div>
                <button className="but" onClick={f}>button</button>
            </div>
        </div>
        
    )
}