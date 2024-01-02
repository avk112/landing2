import React, {FC} from 'react';
import classes from "./UniversalHiddenScreen.module.scss";

interface UniversalHiddenScreenProps {
    visible: boolean
    handleVisibility: Function
    contentBlock: any
}
const UniversalHiddenScreen: FC<UniversalHiddenScreenProps> = ({visible=false, handleVisibility=()=>{}, contentBlock=""}) => {


    return (
        <div className={classes.hidden}
             style={{display: visible ? "flex" : "none"}}

        >
            <div className={classes.hidden__background}
                 onClick={()=>handleVisibility()}>
            </div>
            <>
                {contentBlock}
            </>
        </div>
    );
};

export default UniversalHiddenScreen;