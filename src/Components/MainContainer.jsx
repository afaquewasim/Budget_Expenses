import React, { useReducer,  useEffect} from 'react';
import './Header.css';

const initialState = [
    { department: 'Marketing', budget: 30 },
    { department: 'Finance', budget: 30 },
    { department: 'Sales', budget: 80 },
    { department: 'Human Resource', budget: 290 },
    { department: 'IT', budget: 500 }
];

const reducer = (state, action) => {
    switch (action.type) {
        case 'increase':
            return state.map((item, index) => index === action.index ? { ...item, budget: item.budget + action.amount } : item);
        case 'decrease':
            return state.map((item, index) => index === action.index ? { ...item, budget: item.budget - action.amount } : item);
        case 'remove':
            return state.map((item, index) => index === action.index ? { ...item, budget: 0 } : item);
        default:
            return state;
    }
};

const MainContainer = ({ setSpent, budget, setRemaining }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedDepartment, setSelectedDepartment] = React.useState('');
    const [allocationType, setAllocationType] = React.useState('Increase');
    const [amount, setAmount] = React.useState('');


    useEffect(() => {
        
        const totalSpent = state.reduce((acc, curr) => acc + curr.budget, 0);
        setSpent(totalSpent);
    }, [state, setSpent]);

    const handleSave = () => {
        if (selectedDepartment && amount !== '') {
            const index = state.findIndex(dep => dep.department === selectedDepartment);
            if (index !== -1) {
                dispatch({ type: allocationType.toLowerCase(), index: index, amount: parseInt(amount) });
            }
            setSelectedDepartment('');
            setAmount('');

            // Recalculate remaining budget
            const newRemaining = budget - state.reduce((acc, curr) => acc + curr.budget, 0);
            setRemaining(newRemaining);
        }
    };
    

    return (
        <div className="mainContainer">
            <h1 className='heading'>Allocation</h1>
            <div className="table">
                <table>
                    <tbody>
                        <tr className='mainTH'>
                            <th>Department</th>
                            <th>Allocation Budget</th>
                            <th>Increased by 10</th>
                            <th>Decreased by 10</th>
                            <th></th>
                        </tr>
                        {state.map((row, index) => (
                            <tr key={index}>
                                <td className='department'>{row.department}</td>
                                <td className='value'>$ {row.budget}</td>
                                <td><button className='increase' onClick={() => dispatch({ type: 'increase', index: index, amount: 10 })}>+</button></td>
                                <td><button className='decrease' onClick={() => dispatch({ type: 'decrease', index: index, amount: 10 })}>-</button></td>
                                <td><button className='cross' onClick={() => dispatch({ type: 'remove', index: index })}>x</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="additionalOptions">
                <div className="departmentOption">
                    <label>Department</label>
                    <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                        <option value="">Select Department</option>
                        {state.map((row, index) => (
                            <option key={index} value={row.department}>{row.department}</option>
                        ))}
                    </select>
                </div>

                <div className="allocation">
                    <label>Allocation</label>
                    <select value={allocationType} onChange={e => setAllocationType(e.target.value)}>
                        <option value="Increase">Increase</option>
                        <option value="Decrease">Decrease</option>
                    </select>
                </div>

                <div className="amount">
                    <label>$</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <button className="save" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default MainContainer;
