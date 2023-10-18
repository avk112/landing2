import React, {useState} from 'react';
import classes from "./LaunchPageArea.module.scss";
import UniversalInfoBlock from "./UniversalInfoBlock";
import rocket from "../image/rocket.png";
import background from "../image/dualphone.png";
import backgroundSmall from "../image/dualphone-small.png";

const LaunchPage = () => {
    const [imgLoaded, setImgLoaded] = useState(false);

    const handleLoading = ()=> {
        setImgLoaded(true);
    };


    return (
        <div className={classes.launch}>
            <div className={classes.launch__background}>
                <img
                    src={background}
                    alt="Two iPhone X"
                    // loading="lazy"
                    onLoad={handleLoading}
                    style={{display: !imgLoaded ? "none": "block"}}
                />
                <img
                    className={classes.launch__background__smallImg}
                    src={backgroundSmall}
                    alt="Two iPhone X"
                    style={{display: imgLoaded ? "none": "block"}}
                />
            </div>
            <UniversalInfoBlock
                img={rocket}
                alt="rockete"
                title="Launch your App"
                text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati vel exercitationem eveniet vero maxime ratione"
            />
        </div>
    );
};

export default LaunchPage;