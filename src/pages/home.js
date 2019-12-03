import React, { Component } from 'react';

export default class HomePage extends Component{
    render() {
       return (
        <div>
            <h1>
                Welcome to the unofficial Risk of Rain 2 Tool!
            </h1>
            <h4>Yippee ki-yay</h4>
            <img src={require('../images/ror2wp.jpg')} alt="ror2wp" width="600px"/>
        </div>
       );
    }
}