import React, { useState } from 'react';
import Header from './Components/Header.jsx';
import MainContainer from './Components/MainContainer.jsx';
import './App.css';

const App = () => {
    const [spent, setSpent] = useState(0);
    const [budget, setBudget] = useState(3000); // Initial budget value
    const [remaining, setRemaining] = useState(budget); // Initial remaining budget value

    return (
        <div className="parentContainer">
            <Header spent={spent} budget={budget} remaining={remaining} setBudget={setBudget} />
            <MainContainer setSpent={setSpent} setRemaining={setRemaining} />
        </div>
    );
};

export default App;
