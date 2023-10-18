import React from 'react';
import classes from "./UniversalInfoBlock.module.scss";

const UniversalInfoBlock = ({img, alt, title, text}) => {
    return (
            <div className={classes.universalInfo}>
                <div className={classes.universalInfo__imgBlock}>
                    <img src={img} alt={alt}/>
                </div>
                <h2 className={classes.universalInfo__title}>{title}</h2>
                <p>{text}</p>
                <span className={classes.universalInfo__btn}>
                    <a href="#">Read more</a>
                </span>
            </div>
    );
};

export default UniversalInfoBlock;