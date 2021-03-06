import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from '../Layout';
import { Home } from '../Home';
import { NewGame } from '../NewGame';
import { Game } from '../Game';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/new' component={NewGame} />
                <Route path='/game/:id' component={Game} />
            </Layout>
        );
    }
}
