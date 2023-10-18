import React from 'react';
import classes from "./UniversalHiddenScreen.module.scss";

const UniversalHiddenScreen = ({visible=false, handleVisibility=()=>{}, contentBlock=""}) => {


    return (
        <div className={classes.hidden}
             style={{display: visible ? "flex" : "none"}}

        >
            <div className={classes.hidden__background}
                 onClick={handleVisibility}>
            </div>
            <>
                {contentBlock}
            </>
        </div>
    );
};

export default UniversalHiddenScreen;