import hero_img1 from "../images/pexels-karolina-grabowska-5650043.jpg"
import hero_img2 from "../images/pexels-karolina-grabowska-5632402.jpg"
import hero_img3 from "../images/pexels-karolina-grabowska-5650040 (1).jpg"
import hero_img4 from "../images/pexels-karolina-grabowska-5650043.jpg"
import hero_img5 from "../images/pexels-karolina-grabowska-5632402.jpg"
import left_button from "../images/angle-circle-left-icon.svg"
import right_button from "../images/angle-circle-right-icon.svg"
import { useEffect, useRef, useState } from "react"


export default function Hero() {
    const [slide_state, set_slideState] = useState(-100)
    const animation_frame = useRef('0.2s')
    const auto_move_slide = useRef()
    const move_btn = useRef(true)


    let tracker_style = {
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: `translateX(${slide_state}%)`,
        transition: `linear  ${animation_frame.current}`
      };
   
      function move_slide_right() {
        if (move_btn.current === true) {
            move_btn.current = false
            if (slide_state === -300) {
                setTimeout(() => {
                    animation_frame.current = '0s'
                    set_slideState(-100)
                    setTimeout(()=>{
                        move_btn.current = true
                    }, 400)
                }, 250);
            }
            animation_frame.current = '0.2s'
            set_slideState(prev => prev + -100)
            
            if (slide_state !== -300){
                setTimeout(()=>{
                    move_btn.current = true
                }, 400)
            }
             
        }
      }

      function move_slide_left() {
        if (move_btn.current === true) {
                move_btn.current = false
            if (slide_state === -100) {
                setTimeout(() => {
                    animation_frame.current = '0s'
                    set_slideState(-300)
                    setTimeout(()=>{
                        move_btn.current = true
                    }, 400)
                }, 250);
            }
            animation_frame.current = '0.2s'
            set_slideState(prev => prev + 100)
            if (slide_state !== -100){
                setTimeout(()=>{
                    move_btn.current = true
                }, 400)
            }
        }
      }
     
   useEffect(()=>{
    clearTimeout(auto_move_slide.current)
    auto_move_slide.current = setTimeout(()=>{
        if (slide_state === -300) {
            setTimeout(() => {
                animation_frame.current = '0s'
                set_slideState(-100)
            }, 250);
        }
        animation_frame.current = '0.2s'
        set_slideState(prev => prev + -100)
    }, 15000)
   })   

    
     
    return( 
        <div className="hero-cont">
            <img src={left_button} alt="hero btn" className="hero-btn left-hero-btn" onClick={move_slide_left}/> 
            <img src={right_button} alt="hero btn" className="hero-btn right-hero-btn" onClick={move_slide_right} />  
            <div style={tracker_style}>
                <img src={hero_img1} alt="sales banner"  className="hero-img hero-img0"/>  
                <img src={hero_img2} alt="sales banner"  className="hero-img hero-img1"/>
                <img src={hero_img3} alt="sales banner"  className="hero-img hero-img2"/>
                <img src={hero_img4} alt="sales banner"  className="hero-img hero-img3"/>
                <img src={hero_img5} alt="sales banner"  className="hero-img hero-img4"/>
            </div> 
        </div>
    )
}
