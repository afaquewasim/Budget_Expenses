// Header.js
import React from 'react';
import './Header.css';

const Header = ({ spent, budget, setBudget, setRemaining }) => {
    const remaining = budget - spent;

    const handleBudgetChange = (event) => {
        const newBudget = event.target.value === "" ? 0 : parseInt(event.target.value);
        const newRemaining = newBudget - spent;
        setBudget(newBudget);
        setRemaining(isNaN(newRemaining) ? 0 : newRemaining);
    };

    return (
        <div className="header">
            <div className='budget'>
                Budget
                <span>$</span>
                <input type="number" value={budget} onChange={handleBudgetChange} />
            </div>
            <div className='remaining'>
                Remaining
                <span>$</span>
                <span>{remaining}</span>
            </div>
            <div className='spent'>
                Spent so far
                <span>$</span>
                <span>{spent}</span>
            </div>
        </div>
    );
};

export default Header;
