import React, {useEffect, useRef, useState} from 'react';
import logo from "../image/logo.png";
import menu from "../image/menu.png";
import UniversalHiddenScreen from "./UniversalHiddenScreen";

const Header = ({mainRef, watchRef}) => {
    const myRef = useRef(null);
    const [headerClass, setHeaderClass] = useState(undefined);
    const [activeNav, setActiveNav] = useState("");
    const [visibleBackground, setVisibleBackground] = useState(false);

    const handleVisibility = ()=> {
        setVisibleBackground(prev=>!prev);
    };

    const handleScroll = ()=> {
        const lastRef = mainRef.length-1;

        if(window.scrollY > (watchRef.current.offsetTop/2)){
            setHeaderClass("headerScrolled");
        }
        if((window.scrollY < watchRef.current.offsetTop/2)){
            setHeaderClass(undefined);
        }

        if(window.scrollY >= (mainRef[lastRef]?.current.offsetTop - 2*mainRef[lastRef]?.current.clientHeight)){
            setActiveNav(mainRef[lastRef].current.id);
        }
        else
        {
            for(let i=0; i<= mainRef.length; i++){
                if(((window.scrollY + myRef?.current.clientHeight) >= mainRef[i]?.current.offsetTop) && ((window.scrollY + myRef?.current.clientHeight) <= mainRef[i+1]?.current.offsetTop)){
                    setActiveNav(mainRef[i].current.id);
                    break;
                }
            }
        }
    };


    const navBlock = (onClick=()=>{})=> {
        return (
            <ul>
                <li className={activeNav === "" ? "activeNav" : "passiveNav"}  onClick={onClick}><a href="#">Home</a></li>
                <li className={activeNav === "features" ? "activeNav" : "passiveNav"} onClick={onClick}><a href="#features">Features</a></li>
                <li className={activeNav === "gallery" ? "activeNav" : "passiveNav"} onClick={onClick}><a href="#gallery">Gallery</a></li>
                <li className={activeNav === "pricing" ? "activeNav" : "passiveNav"} onClick={onClick}><a href="#pricing">Pricing</a></li>
                <li className={activeNav === "contact" ? "activeNav" : "passiveNav"} onClick={onClick}><a href="#contact">Contact</a></li>
            </ul>
        )
    };

    const regularNav = <nav className="header__regularNav">
        {navBlock()}
    </nav>

    const hiddenNav = <nav className="header__hiddenNav">
        {navBlock(handleVisibility)}
    </nav>



    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        return ()=>window.removeEventListener("scroll", handleScroll)
    }, []);



    return (
        <header className={`header ${headerClass}`} ref={myRef}>
            <UniversalHiddenScreen
                visible={visibleBackground}
                handleVisibility={handleVisibility}
                contentBlock={hiddenNav}
            />
            <a href="#" className="header__logo">
                <img src={logo}/>
            </a>
            <div className="header__menuImgBlock">
                <img src={menu} alt="menu logo" onClick={handleVisibility}/>
            </div>
            {regularNav}
        </header>
    );
};

export default Header;