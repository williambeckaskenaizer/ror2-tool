import React, { Component } from 'react';

export default class HomePage extends Component{
    render() {
       return (
        <div>
            <h1>
                Welcome to the unofficial Risk of Rain 2 Tool!
            </h1>
            <h4>Choose a table to get started</h4>

            <img src={require('../images/ror2wp.jpg')} alt="ror2wp" width="500px"/>
        </div>
       );
    }
}