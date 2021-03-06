import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class NewGame extends Component {
    static displayName = NewGame.name;

    constructor(props) {
        super(props);

        this.state = {
            isGameReady: false,
            gameId: '',
            formState: {
                player1: '',
                player2: '',
                player3: '',
                player4: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formState: {
                ...this.state.formState,
                [name]: value
            }
        });
    }

    submitForm(event) {
        event.preventDefault();

        fetch('/api/game/new', {
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
                    gameId: data.gameId,
                    isGameReady: true
                });
            }
        });
    }

    render() {
        const cssClassPrefix = 'new-game';

        return (
            <>
                {
                    this.state.isGameReady ?
                        <Redirect to={`/game/${this.state.gameId.toUpperCase()}`} />
                        : null
                }

                <form className={`${cssClassPrefix}__form`} onSubmit={this.submitForm}>
                    <h1>New game</h1>

                    <PlayerNameField
                        cssClassPrefix={cssClassPrefix}
                        name="player1"
                        changeHandler={this.handleInputChange}
                    />

                    <PlayerNameField
                        cssClassPrefix={cssClassPrefix}
                        name="player2"
                        changeHandler={this.handleInputChange}
                    />

                    <PlayerNameField
                        cssClassPrefix={cssClassPrefix}
                        name="player3"
                        changeHandler={this.handleInputChange}
                    />

                    <PlayerNameField
                        cssClassPrefix={cssClassPrefix}
                        name="player4"
                        changeHandler={this.handleInputChange}
                    />

                    <button type="submit">play</button>
                </form>
            </>
        );
    }
}

const PlayerNameField = (props) => {
    return (
        <div className={`${props.cssClassPrefix}__label`}>
            <div>Player name:</div>
            <input className={`${props.cssClassPrefix}__input`} type="text" name={props.name} onChange={props.changeHandler} />
        </div>
    );
}
