import React, {useState, FC} from 'react';
import classes from "./DoMorePage.module.scss";
import tableData from "../data/doMoreTable";
import img from "../image/graphic.png";

const DoMorePage: FC = () => {
    const [itemToShow, setItemToShow] = useState<any>(tableData[0]);
    const [appearance,setAppearance] = useState<boolean>(false);


    const handleItem = (id:number=1)=>{
        if(id !== itemToShow.id){
            const newId = Number(id);
            const newItem = tableData.find(item=> item.id === newId);

            setAppearance(true);
            setItemToShow(newItem);
            setTimeout(()=>{
                setAppearance(false);
            }, 500)
        }
    }

    const headersBlock = tableData.map(item=>{
        return <li key={item.id}
                    className={`${classes.doMore__table__headers__item} ${itemToShow.id === item.id && classes.doMore__table__headers__itemActive}`}
                    onClick={()=>handleItem(item.id)}
        >
                    {item.name}
                </li>
    });


    return (
        <div className={classes.doMore}>
            <div className={classes.doMore__titleBlock}>
                <small className={classes.doMore__titleBlock__subTitle}>Features</small>
                <h3 className={classes.doMore__titleBlock__title}>Do more with our app</h3>
            </div>
            <div className={classes.doMore__table}>
                <ul className={classes.doMore__table__headers}>
                    {headersBlock}
                </ul>
                <div className={`${classes.doMore__table__body} ${itemToShow.id%2 === 0 && classes.doMore__table__bodyReverse} ${appearance && classes.appear}`}>
                    <div className={classes.doMore__table__body__info}>
                        <h2 className={classes.doMore__table__body__info__title}>{itemToShow.title}</h2>
                        <h4 className={classes.doMore__table__body__info__subTitle}>{itemToShow.subtitle}</h4>
                        <>{itemToShow.text}</>
                    </div>
                    <div className={classes.doMore__table__body__imgBlock}>
                        <img src={img} alt="graphics of phone interaction"/>
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default DoMorePage;