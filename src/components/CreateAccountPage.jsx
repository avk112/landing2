import React, {useState} from 'react';
import classes from "./CreateAccountPage.module.scss";
import listData from "../data/createAccountList";
import background from "../image/iphonex-full.png";
import backgroundSmall from "../image/iphonex-full-small.png";

const CreateAccountPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoading = ()=> {
        return setIsLoaded(true);
    };


    const listBlock = listData.map(item=>{
        const {id, number, title, text} = item;
        return <div key={id} className={classes.create__list__item}>
                    <div className={classes.create__list__item__number}>{number}</div>
                    <div className={classes.create__list__item__info}>
                        <h5 className={classes.create__list__item__info__title}>{title}</h5>
                        <p>{text}</p>
                    </div>
                </div>
    });


    return (
        <div className={classes.create}>
            <div className={classes.create__list}>
                {listBlock}
            </div>
            <div className={classes.create__imgBlock}>
                <img src={background}
                     alt="iPhone X"
                     // loading="lazy"
                     onLoad={handleLoading}
                     style={{display: !isLoaded ? "none" : "block"}}
                />
                <img src={backgroundSmall}
                     alt="iPhone X"
                     className={classes.create__imgBlock__small}
                     style={{display: isLoaded ? "none" : "block"}}
                />
            </div>
        </div>
    );
};

export default CreateAccountPage;