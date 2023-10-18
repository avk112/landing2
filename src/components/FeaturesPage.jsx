import React from 'react';
import classes from "./FeaturesPage.module.scss";
import cards from "../data/featuresCards";

const FeaturesPage = ({myRef=null}) => {

    const cardsBlock = cards.map(item=>{
        const {id, title, text, img, alt} = item;
        return <div key={id} className={classes.features__cardsBlock__card}>
                    <div className={classes.features__cardsBlock__card__imgBlock}>
                        <img src={img} alt={alt}/>
                    </div>
                    <div className={classes.features__cardsBlock__card__infoBlock}>
                        <h4 className={classes.features__cardsBlock__card__infoBlock__title}>
                            {title}
                        </h4>
                        <p>{text}</p>
                    </div>
                </div>
    })
    return (
        <div id="features" className={classes.features} ref={myRef}>
            <div className={classes.features__titleBlock}>
                <small className={classes.features__titleBlock__subTitle}>Highlights</small>
                <h3 className={classes.features__titleBlock__title}>Features you love</h3>
            </div>
            <div className={classes.features__cardsBlock}>
                {cardsBlock}
            </div>
        </div>
    );
};

export default FeaturesPage;