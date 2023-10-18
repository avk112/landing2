import React, {useState} from 'react';
import classes from "./ScreenshotsPage.module.scss";
import slidesData from "../data/screenshotsSlides";
import leftArrow from "../image/left-arrow.png";
import rightArrow from "../image/right-arrow.png";


const ScreenshotsPage = ({myRef=null}) => {
    const absPosition=36.7;
    const stripeLength = 5;
    const mainSlidesCount = 3;
    const centralSlideIndex = Math.trunc(stripeLength/2);
    const createSlidesArr = ()=>{
        const arr = [];
        for(let i=-1; i<stripeLength-1; i++){
            arr.push({...slidesData[i+1], position: i * absPosition})
        }

        return arr;
    };

    const [slides, setSlides] = useState(createSlidesArr);
    const [animation, setAnimation] = useState(undefined);
    const [swipeData, setSwipeData] = useState({coordX:0, timeStamp:0, mouseDown:false});
    const [stripePosition, setStripePosition] = useState(0);
    const [slideToAnimateId, setSlideToAnimateId] = useState();
    const [centralSlideId, setCentralSlideId] = useState(slides[centralSlideIndex].id);


    const insertNewSlides = (slidesArr, fromStart = true, additionalSlides=1)=> {
        const newSlidesArr = [...slidesArr];
        if(fromStart){
            for(let i=0; i<additionalSlides; i++) {
                const multiplier = i+2;
                const firstSlide = newSlidesArr[0];
                const indexOfFirstSlide = slidesData.indexOf(slidesData.find(item => item.id === firstSlide.id));
                const slideToAdd = indexOfFirstSlide === 0 ? slidesData[slidesData.length - 1] : slidesData[indexOfFirstSlide - 1];
                newSlidesArr.unshift({...slideToAdd, position: -absPosition * multiplier});
            }

        }
        if(!fromStart){
            for(let i=0; i<additionalSlides; i++){
                const multiplier = newSlidesArr.length-1;
                const lastSlide = newSlidesArr[newSlidesArr.length - 1];
                const indexOfLastSlide = slidesData.indexOf(slidesData.find(item => item.id === lastSlide.id));
                const slideToAdd = indexOfLastSlide === slidesData.length - 1 ? slidesData[0] : slidesData[indexOfLastSlide + 1];
                newSlidesArr.push({...slideToAdd, position:  absPosition * multiplier});
            }
        }

        return newSlidesArr;
    };

    const prepareNewSlides = (slidesArr=[], moveLeft=true, cut=1, additionalSlides=1, indexOfSwitchSlide)=> {
        let newSlidesArr = [...slidesArr];

        if(additionalSlides>1){
            const zeroOrLast = moveLeft ? slidesArr.length-1 : 0;
            const position =  slidesArr[zeroOrLast].position;
            const indexOfSlideToInsert = moveLeft ? indexOfSwitchSlide-1 : indexOfSwitchSlide+1;
            const slideToInsert = {...slidesData[indexOfSlideToInsert]};
            newSlidesArr[zeroOrLast] = slideToInsert;
            newSlidesArr[zeroOrLast].position = position;
        }

        if(moveLeft) {
            if(cut>1){
                newSlidesArr.splice(0, cut);
                newSlidesArr=insertNewSlides(newSlidesArr, true, additionalSlides);
                cut=0;
            }
            newSlidesArr=insertNewSlides(newSlidesArr, false, additionalSlides);
            cut && newSlidesArr.shift();
        }
        if (!moveLeft) {
            if(cut>1){
                newSlidesArr.splice(centralSlideIndex+1, cut);
                newSlidesArr=insertNewSlides(newSlidesArr, false, additionalSlides);
                cut=0;
            }
            newSlidesArr=insertNewSlides(newSlidesArr, true, additionalSlides);
            cut && newSlidesArr.pop();
        }

        return newSlidesArr;
    };



    const handleSlides = (indexOfSwitchSlide, moveLeft = true, gap=0,)=> {
        if(!animation) {
            let direction = moveLeft ? "moveLeft" : "moveRight";
            const offset = moveLeft ? -absPosition : absPosition;
            const totalCut = gap<=1 ? 1 : mainSlidesCount;
            let slidesArr = [...slides];
            const slidesToAdd = (gap>1 && mainSlidesCount>1) ? 2: 1;
            const offsetRate = slidesToAdd+ 1;

            const tempSlides = prepareNewSlides([...slidesArr], moveLeft, 1, slidesToAdd, indexOfSwitchSlide);

            if(!gap) {
                const positionedSlides = tempSlides.map(item=>({...item, position: item.position+offset}));
                setAnimation(direction);
                setStripePosition(offset);
                setSlideToAnimateId(slides[moveLeft ? centralSlideIndex+1 : centralSlideIndex-1].id);

                setTimeout(() => {
                    setSlides(positionedSlides);
                    setStripePosition(0);
                    setAnimation(undefined);
                    setCentralSlideId(positionedSlides[centralSlideIndex].id);
                    setSlideToAnimateId(undefined)
                }, 800)
            }

            if (gap) {
                const newArr = prepareNewSlides(tempSlides, moveLeft, totalCut, 1);
                const finalSlides = newArr.map((item, index)=>({...item, position: (index-1)*absPosition}));
                setStripePosition(offset*offsetRate);
                setSlides(tempSlides);
                setAnimation(direction);
                setSlideToAnimateId(finalSlides[centralSlideIndex].id);

                setTimeout(() => {
                    setSlides(finalSlides);
                    setStripePosition(0);
                    setAnimation(undefined);
                    setCentralSlideId(finalSlides[centralSlideIndex].id);
                    setSlideToAnimateId(undefined)
                }, 800)
            }
        }
    };

    const handleSwitcher = (slideIndex)=> {
        if(!animation){
            const currentSlide = slides[centralSlideIndex];
            const indexOfCurrentSlide = slidesData.indexOf(slidesData.find(item=>item.id===currentSlide.id));
            const difference = slideIndex-indexOfCurrentSlide;
            const lastIndex = slidesData.length-1;
            const gap = Math.abs(difference) === lastIndex ? 0 : Math.abs(difference)-1;
            const leftDirection = (difference > 0 && difference !== lastIndex) || (difference === -lastIndex);

            handleSlides(slideIndex, leftDirection, gap);
        }
    }


    const handleDrag = (e)=> {
        if(!animation) {
            const coordX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;

            if (e.type === "mousedown" || e.type === "touchstart") {
                setSwipeData({coordX: coordX, timeStamp: e.timeStamp, mouseDown: true});
            }

            if ((e.type === "mousemove" || e.type === "touchmove") && swipeData.mouseDown) {
                const result = coordX - swipeData.coordX;
                setStripePosition(0 + result);
            }
            if ((e.type === "mouseup" || e.type === "touchend") && swipeData.mouseDown) {
                setSwipeData(prev => ({...prev, mouseDown: false}));
                if (coordX !== swipeData.coordX) {
                    const leftDirection = coordX <= swipeData.coordX;
                    handleSlides(false, leftDirection);
                }
            }
        }
    };




    const slidesBlock = slides.map((item, index)=>{
        let slideType;

       if (item.id === centralSlideId){
           slideType= animation ? classes.descaledSlide : classes.centralSlide;
       }
       if(item.id === slideToAnimateId){
           slideType = animation && classes.scaledSlide;
       }


        return <div key={index}
                    className={`${classes.screenshots__slider__stripe__imgBlock} ${slideType}`}
                    style={{left: item.position+"%"}}
        >
                    <img src={item.img} alt="app screenshot"/>
                </div>
    });


    const switchersBlock = slidesData.map((item, index)=>{
        return <button key={item.id}
                       className={`${classes.screenshots__slider__switchers__item} ${item.id === centralSlideId && classes.screenshots__slider__switchers__itemActive}`}
                       disabled={(animation || item.id === centralSlideId) && true}
                       onClick={()=>handleSwitcher(index)}
        >
        </button>
    });




    return (
        <div id="gallery" className={classes.screenshots} ref={myRef}>
            <div className={classes.screenshots__titleBlock}>
                <small className={classes.screenshots__titleBlock__subTitle}>Gallery</small>
                <h3 className={classes.screenshots__titleBlock__title}>App Screenshots</h3>
            </div>
            <div className={classes.screenshots__slider}>
                <div className={`${classes.screenshots__slider__stripe} ${animation ? classes[animation] : undefined}`}
                     style={{left: animation ? stripePosition+"%" : stripePosition+"px"}}
                     onTouchStart={handleDrag}
                     onTouchEnd={handleDrag}
                     onMouseDown={handleDrag}
                     onMouseMove={handleDrag}
                     onTouchMove={handleDrag}
                     onMouseUp={handleDrag}
                >
                    {slidesBlock}
                </div>
                <button className={classes.screenshots__slider__leftBtn}
                        onClick={()=>handleSlides(false)}
                >
                    <img src={leftArrow} alt="left arrow"/>
                </button>
                <button className={classes.screenshots__slider__rightBtn}
                        onClick={()=>handleSlides(false, false)}
                >
                    <img src={rightArrow} alt="right arrow"/>
                </button>
                <div className={classes.screenshots__slider__switchers}>
                    {switchersBlock}
                </div>
            </div>
        </div>
    );
};

export default ScreenshotsPage;