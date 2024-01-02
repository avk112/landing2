import React, {FC} from 'react';
import classes from "./FaqPage.module.scss";
import faqData from "../data/faq";

const FaqPage: FC = () => {
    const questionsBlock = faqData.map(item=> {
        const {id, title, text} = item;
        return <div key={id} className={classes.faq__questions__item}>
                    <h4 className={classes.faq__questions__item__title}>{title}</h4>
                    <p>{text}</p>
                </div>
    })
    return (
        <div className={classes.faq}>
            <div className={classes.faq__titleBlock}>
                <small className={classes.faq__titleBlock__subTitle}>Faq</small>
                <h3 className={classes.faq__titleBlock__title}>Frequently Asked Questions</h3>
            </div>
            <div className={classes.faq__questions}>
                {questionsBlock}
            </div>
        </div>
    );
};

export default FaqPage;