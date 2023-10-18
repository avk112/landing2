import React, {useState} from 'react';
import classes from "./UpgradePage.module.scss";
import plansData from "../data/upgradePlans";
import UniversalHiddenScreen from "./UniversalHiddenScreen";
import OrderForm from "./OrderForm";

const UpgradePage = ({myRef=null}) => {
    const [clickedPlan, setClickedPlan] = useState(2);
    const [visibleBackground, setVisibleBackground] = useState(false);


    const handleClick = (planId=1)=> {
        setClickedPlan(planId);
    };

    const handleVisibility = ()=> {
        setVisibleBackground(prev=>!prev);
    };


    const plansBlock = plansData.map(item=> {
        const {id, name, price, options} = item;
        const optionsList = options.map((unit, index)=>(<li key={index}>{unit}</li>));
        return <div key={id}
                    className={`${classes.upgrade__plans__item} ${clickedPlan === id && classes.clicked}`}
                    onClick={()=>handleClick(id)}
        >
                    <small className={classes.upgrade__plans__item__title}>{name}</small>
                    <span className={classes.upgrade__plans__item__price}>${price}<sub>/m</sub></span>
                    <ul>{optionsList}</ul>
                    <button
                        disabled={id!==clickedPlan}
                        onClick={handleVisibility}
                    >Choose this plan</button>
                </div>
    })

    return (
        <div id="pricing" className={classes.upgrade} ref={myRef}>
            <UniversalHiddenScreen
                visible={visibleBackground}
                handleVisibility={handleVisibility}
                contentBlock={<OrderForm/>}
            />
            <div className={classes.upgrade__titleBlock}>
                <small className={classes.upgrade__titleBlock__subTitle}>Pricing</small>
                <h3 className={classes.upgrade__titleBlock__title}>Upgrade to Pro</h3>
            </div>
            <div className={classes.upgrade__plans}>
                {plansBlock}
            </div>
        </div>
    );
};

export default UpgradePage;