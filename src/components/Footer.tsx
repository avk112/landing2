import React, { RefObject, FC} from 'react';
import fbLogo from "../image/fb.png";
import twitterLogo from "../image/twitter.png";
import instLogo from "../image/instagram.png";
import pin from "../image/pin.png";
import mail from "../image/mail.png";
import support from "../image/support.png"

interface FooterProps {
    myRef:  RefObject<any>
}
const Footer: FC<FooterProps> = ({myRef=null}) => {
    return (
        <div id="contact" className="footer" ref={myRef}>
            <div className="footer__top">
                <ul className="footer__top__info">
                    <li><img src={pin} alt="location"/> 1485 Pacific St, Brooklyn, NY 11216 USA</li>
                    <li><a href="mailto:support@mobileapp.com"><img src={mail} alt="mail"/> support@mobileapp.com</a></li>
                    <li><a href="tel:51836362800"><img src={support} alt="support"/> 518-3636-2800</a></li>
                </ul>
                <ul className="footer__top__social">
                    <li><a href="#"><img src={fbLogo} alt="facebook logo"/></a></li>
                    <li><a href="#"><img src={twitterLogo} alt="twitter logo"/></a></li>
                    <li><a href="#"><img src={instLogo} alt="instagram logo"/></a></li>
                </ul>
            </div>
            <span>COPYRIGHT © 2023. ALL RIGHTS RESERVED. THIS TEMPLATE IS MADE AS A DEMONSTRATION </span>
        </div>
    );
};

export default Footer;