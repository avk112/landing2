import React, {useState} from 'react';
import classes from "./WhatClientsSayPage.module.scss";
import leftArrow from "../image/left-arrow.png";
import rightArrow from "../image/right-arrow.png";
import slidesData from "../data/clientsSaySlides";

const WhatClientSayPage = () => {
    const [position, setPosition] = useState(0);
    const [coordX, setCoordX] = useState("");

    const handleSlider = (toLeft = true)=> {
        const direction = toLeft ? -100 : 100;
        setPosition(prev=>prev+direction);
    };

    const handleSwiping = (e)=> {
        const newCoordX = e.changedTouches[0].clientX;
        if(e.type === "touchstart"){
            setCoordX(newCoordX);
        }
        if(e.type === "touchend"){
            const moveLeft = newCoordX < coordX;
            if((moveLeft && position > -100*(slidesData.length-1)) || (!moveLeft && position < 0)) {
                handleSlider(moveLeft);
            }
        }
    }


    const stripeBock = slidesData.map(item=>{
        const {id, name, img, location, text} = item;
        return <div key={id} className={classes.client__slider__central__stripe__item}>
                    <div className={classes.client__slider__central__stripe__item__imgBlock}>
                        <img src={img} alt="client photo"/>
                    </div>
                    <blockquote className={classes.client__slider__central__stripe__item__quote}>
                        {text}
                    </blockquote>
                    <div className={classes.client__slider__central__stripe__item__titleBlock}>
                        <h5 className={classes.client__slider__central__stripe__item__titleBlock__title}>{name}</h5>
                        <h6 className={classes.client__slider__central__stripe__item__titleBlock__subTitle}>{location}</h6>
                    </div>
                </div>
    });


    return (
        <div className={classes.client}>
            <div className={classes.client__titleBlock}>
                <small className={classes.client__titleBlock__subTitle}>Testimonials</small>
                <h3 className={classes.client__titleBlock__title}>What our Customers Says</h3>
            </div>

            <div className={classes.client__slider}>
                <button className={classes.client__slider__arrow}
                        onClick={handleSlider}
                        disabled={position <= -100*(slidesData.length-1)}
                >
                    <img src={leftArrow} alt="left arrow"/>
                </button>
                <div className={classes.client__slider__central}
                     onTouchStart={handleSwiping}
                     onTouchEnd={handleSwiping}
                >
                    <div className={classes.client__slider__central__stripe}
                         style={{left: `${position}%`}}
                    >
                        {stripeBock}
                    </div>
                </div>
                <button className={classes.client__slider__arrow}
                        onClick={()=>handleSlider(false)}
                        disabled={position >= 0}
                >
                    <img src={rightArrow} alt="right arrow"/>
                </button>
            </div>
        </div>
    );
};

export default WhatClientSayPage;