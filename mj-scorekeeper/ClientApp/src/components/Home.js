import React, { Component } from 'react';
import * as moment from 'moment';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            gameList: []
        };
    }

    componentDidMount() {
        this.getGames();
    }

    getGames = () => {
        fetch('/api/game', {
            method: 'get',
            headers: { 'content-type': 'application/json' }
        }).then((response) => {
            if (response.status === 200 && response.body) {
                return response.json();
            } else {
                return null;
            }
        }).then((data) => {
            data.map((item) => {
                item.friendlyDate = moment(item.date).format('MMM D, YYYY h:mm A')
            });

            this.setState({
                gameList: data
            });
        });
    }

    render() {
        return (
            <div>
                <h1>mj-scorebuddy</h1>
                <p>Here are the last 5 games:</p>
                <ul>
                    {
                        this.state.gameList.map((game) => (
                            <li key={game.gameId}><a href={`/game/${game.gameId}`}>{game.gameId}</a> - {game.friendlyDate}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
