import React, {ChangeEvent, useState} from 'react';
import classes from "./OrderForm.module.scss";

const OrderForm = () => {
    const [input, setInput] = useState<string>("");
    const [confirmed, setConfirmed] = useState<boolean>(false);

    const handleInput = (e: ChangeEvent<HTMLInputElement>)=> {
        const value = e.target.value;
        setInput(value);
    };

    const handleForm = ()=> {
        setConfirmed(true);
    }


    return (
        !confirmed
        ?
        <form onSubmit={handleForm}>
            <input
                id="email"
                type="email"
                placeholder="Enter your e-mail to contact"
                value={input}
                onChange={handleInput}
                required={true}
            />
            <button>Send</button>
        </form>
        :
        <div className={classes.confirmation}>
            <span>You've chosen your plan!</span>
            <span>We will connect you soon!</span>
        </div>
    );
};

export default OrderForm;