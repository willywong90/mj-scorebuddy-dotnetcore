import React, { useState, useReducer } from 'react';

const Game = () => {
    const numbers = [1, 2, 3];
    const list = ['A', 'B', 'C'];

    const [form, setForm] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            winner: '',
            loser: '',
            fan: '',
            isSelfDrawn: false
        }
    );

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setForm({ [name]: value });
    };

    return (
        <div className="section-block">
            <Dropdown
                label={'Winner'}
                value={form.letter1}
                options={list}
                name={'winner'}
                onChange={handleInputChange}
            />
            <Dropdown
                label={'Loser'}
                value={form.letter2}
                options={list}
                name={'loser'}
                onChange={handleInputChange}
            />
            <Dropdown
                label={'Fan'}
                value={form.number}
                options={numbers}
                name={'fan'}
                onChange={handleInputChange}
            />
            <div>
                Checkbox
				<input type="checkbox" name="isSelfDrawn" value={form.isSelfDrawn} onChange={handleInputChange} />
            </div>
            <button type="button">add</button>
        </div>
    );
};

const Dropdown = ({ label, value, options, name, onChange }) => {
    return (
        <div>
            {label}
            <select name={name} onChange={onChange} value={value}>
                <option value="" hidden></option>
                {
                    options.map((item, index) => <option key={index}>{item}</option>)
                }
            </select>
        </div>
    );
};

export default Game;
