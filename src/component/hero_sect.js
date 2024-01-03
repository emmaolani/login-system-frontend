import hero_img1 from "../images/pexels-karolina-grabowska-5650043.jpg"
import hero_img2 from "../images/pexels-karolina-grabowska-5632402.jpg"
import hero_img3 from "../images/pexels-karolina-grabowska-5650040 (1).jpg"
import hero_img4 from "../images/pexels-karolina-grabowska-5650043.jpg"
import hero_img5 from "../images/pexels-karolina-grabowska-5632402.jpg"
import left_button from "../images/angle-circle-left-icon.svg"
import right_button from "../images/angle-circle-right-icon.svg"
import { useEffect, useRef, useState } from "react"


export default function Hero() {
    const [carouselPosition, setCarouselPosition] = useState(-100)
    const animationFrame = useRef('0.2s')
    const moveSlideToTheRightAutomatically = useRef()
    const isButtonEnabled = useRef(true)


    let tracker_style = {
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: `translateX(${carouselPosition}%)`,
        transition: `linear  ${animationFrame.current}`
      };
   
      function move_slide_right() {
        if (isButtonEnabled.current === true) {
            isButtonEnabled.current = false
            setCarouselPositionToStartPostionIfCarouselEndIsReached()
            animationFrame.current = '0.2s'
            setCarouselPosition(prev => prev + -100)
            enableButtonWhenCarouselIsNotOnTheLastSlide()
        }
      }

    function setCarouselPositionToStartPostionIfCarouselEndIsReached() {
        if (carouselPosition === -300) {
            setTimeout(() => {
                animationFrame.current = '0s'
                setCarouselPosition(-100)
                enableButtonWhenCarouselIsOnTheLastSlide()
            }, 250);
        }
    }

      function enableButtonWhenCarouselIsOnTheLastSlide(){
        setTimeout(()=>{
            isButtonEnabled.current = true
        }, 400)
      }

      function enableButtonWhenCarouselIsNotOnTheLastSlide() {
        if (carouselPosition !== -300){
            setTimeout(()=>{
                isButtonEnabled.current = true
            }, 400)
        }
      }

      function move_slide_left() {
        if (isButtonEnabled.current === true) {
                isButtonEnabled.current = false
            if (carouselPosition === -100) {
                setTimeout(() => {
                    animationFrame.current = '0s'
                    setCarouselPosition(-300)
                    setTimeout(()=>{
                        isButtonEnabled.current = true
                    }, 400)
                }, 250);
            }
            animationFrame.current = '0.2s'
            setCarouselPosition(prev => prev + 100)
            if (carouselPosition !== -100){
                setTimeout(()=>{
                    isButtonEnabled.current = true
                }, 400)
            }
        }
      }
     
   useEffect(()=>{
    clearTimeout(moveSlideToTheRightAutomatically.current)
    moveSlideToTheRightAutomatically.current = setTimeout(()=>{
        if (carouselPosition === -300) {
            setTimeout(() => {
                animationFrame.current = '0s'
                setCarouselPosition(-100)
            }, 250);
        }
        animationFrame.current = '0.2s'
        setCarouselPosition(prev => prev + -100)
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
