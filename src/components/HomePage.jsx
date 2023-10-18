import React from 'react';
import classes from "./HomePage.module.scss";
import phone from "../image/iphonex.png";
import clientLogos from "../image/client-logos.png";

const HomePage = ({myRef=null, watchRef}) => {
    return (
        <div  className={classes.home} ref={myRef}>
            <div className={classes.home__topBlock}>
                <h1 ref={watchRef}>Mobile App Landing Page Template</h1>
                <p>The one and only solution for any kind of mobile app landing needs. Just change the screenshots and texts and you are good to go.</p>
                <div className={classes.home__topBlock__imgBlock}>
                    <img src={phone} alt="iphone"/>
                </div>
            </div>
            <div className={classes.home__clientsLogos}>
                <img src={clientLogos} alt="clients logos"/>
            </div>
        </div>
    );
};

export default HomePage;