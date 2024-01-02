import React, {FC} from 'react';
import classes from "./DownloadPage.module.scss";
import phoneImg from "../image/phone.png";
import appleLogo from "../image/apple.png";
import playmarketLogo from "../image/playmarket.png";

const DownloadPage: FC = () => {
    return (
        <div className={classes.download}>
            <div className={classes.download__imgBlock}>
                <img src={phoneImg} alt="phone icon"/>
            </div>
            <h2 className={classes.download__title}>Download anywhere</h2>
            <p>Available for all major mobile and desktop platforms. Rapidiously visualize optimal ROI rather than enterprise-wide methods of empowerment.</p>
            <div className={classes.download__btnsBlock}>
                <a href="#">
                    <img src={appleLogo} alt="apple logo"/>
                    App store
                </a>
                <a href="#">
                    <img src={playmarketLogo} alt="plaumarket logo"/>
                    Google play
                </a>
            </div>
            <small>
                <i>*Works on iOS 10.0.5+, Android Kitkat and above.</i>
            </small>
        </div>
    );
};

export default DownloadPage;