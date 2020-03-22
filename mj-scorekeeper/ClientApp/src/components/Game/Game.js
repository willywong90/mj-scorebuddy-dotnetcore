import React, { Component } from 'react';
import './dropdown.css';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.match.params.id,
            playerList: [],
            loserList: [],
            numbers: [3, 4, 5, 6, 7, 8],
            formState: {
                winner: '',
                loser: '',
                fan: 3,
                isSelfDrawn: false
            }
        };
    }

    componentDidMount() {
        fetch(`/api/game/${this.state.game}`, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                playerList: [json.player1, json.player2, json.player3, json.player4],
                loserList: [json.player1, json.player2, json.player3, json.player4]
            })
        });
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        switch (name) {
            case 'isSelfDrawn':
                value = event.target.checked;
                break;
            case 'fan':
                value = parseInt(value, 10);
                break;
        }

        this.setState({
            formState: {
                ...this.state.formState,
                [name]: value
            }
        });
    };

    handleWinnerChange = (event) => {
        const value = event.target.value;
        const loserList = [];

        for (let i = 0; i < this.state.playerList.length; i++) {
            if (this.state.playerList[i] !== value) {
                loserList.push(this.state.playerList[i]);
            }
        }

        this.setState({
            loserList: loserList
        });

        this.handleInputChange(event);
    }

    handleSubmit = () => {
        fetch(`/api/game/${this.state.game}/score/add`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.state.formState),
        }).then((response) => {
            if (response.ok && response.body) {
                return response.json();
            } else {
                return null;
            }
        }).then((data) => {
            if (data) {
                this.setState({
                    formState: {
                        winner: '',
                        loser: '',
                        fan: 3,
                        isSelfDrawn: false
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className="section-block">
                <Dropdown
                    label={'Winner'}
                    value={this.state.formState.winner}
                    options={this.state.playerList}
                    name={'winner'}
                    onChange={this.handleWinnerChange}
                />
                <Dropdown
                    label={'Loser'}
                    value={this.state.formState.loser}
                    options={this.state.loserList}
                    name={'loser'}
                    onChange={this.handleInputChange}
                />
                <Dropdown
                    label={'Fan'}
                    value={this.state.formState.fan}
                    options={this.state.numbers}
                    name={'fan'}
                    onChange={this.handleInputChange}
                />
                <div>
                    <div>Is self touch?</div>
                    <input type="checkbox" name="isSelfDrawn" checked={this.state.formState.isSelfDrawn} onChange={this.handleInputChange} />
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
