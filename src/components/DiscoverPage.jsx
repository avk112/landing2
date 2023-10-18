import React, {useState} from 'react';
import classes from "./DiscoverPage.module.scss";
import phone from "../image/phone.png";
import background from "../image/perspective.png";
import backgroundSmall from "../image/perspective-small.png"
import UniversalInfoBlock from "./UniversalInfoBlock";

const DiscoverPage = () => {
    const [imgLoaded, setImgLoaded] = useState(false);

    const handleLoading = ()=> {
        setImgLoaded(true);
    };


    return (
        <div className={classes.discover}>
            <UniversalInfoBlock
                img={phone}
                alt="smartphone"
                title="Discover our App"
                text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati vel exercitationem eveniet vero maxime ratione"
            />

            <div className={classes.discover__background}>
                <img
                    src={background}
                    alt="iPhone X"
                    loading="lazy"
                    onLoad={handleLoading}
                />
                <img
                    className={classes.discover__background__smallImg}
                    src={backgroundSmall}
                    alt="iPhone X"
                    style={{display: imgLoaded ? "none": "block"}}
                />
            </div>

        </div>
    );
};

export default DiscoverPage;