import React, { Component } from 'react';
import './dropdown.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.match.params.id,
            playerList: [],
            numbers: [3, 4, 5, 6, 7, 8, 9, 10],
            winner: '',
            loser: '',
            fan: '',
            isSelfDrawn: false
        };
    }

    componentDidMount() {
        fetch(`/api/game/${this.state.game}`, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                playerList: [json.player1, json.player2, json.player3, json.player4]
            })
        });
    }

    getGameData = () => {

    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    handleSubmit = () => {

    }

    render() {
        return (
            <div className="section-block">
                <Dropdown
                    label={'Winner'}
                    value={this.state.winner}
                    options={this.state.playerList}
                    name={'winner'}
                    onChange={this.handleInputChange}
                />
                <Dropdown
                    label={'Loser'}
                    value={this.state.loser}
                    options={this.state.playerList}
                    name={'loser'}
                    onChange={this.handleInputChange}
                />
                <Dropdown
                    label={'Fan'}
                    value={this.state.fan}
                    options={this.state.numbers}
                    name={'fan'}
                    onChange={this.handleInputChange}
                />
                <div>
                    <div>Is self touch?</div>
                    <input type="checkbox" name="isSelfDrawn" value={this.state.isSelfDrawn} onChange={this.handleInputChange} />
                </div>
                <button type="button" onClick={this.handleSubmit}>add</button>
            </div>
        );
    }
};

const Dropdown = ({ label, value, options, name, onChange }) => {
    return (
        <div className="dropdown">
            <div className="dropdown__label">{label}</div>
            <select className="dropdown__select" name={name} onChange={onChange} value={value}>
                <option value="" hidden></option>
                {
                    options.map((item, index) => <option key={index}>{item}</option>)
                }
            </select>
        </div>
    );
};

export default Game;
