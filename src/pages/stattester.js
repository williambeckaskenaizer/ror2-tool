import React from 'react';

export default function StatTester(){
       return (
        <div>
            <p>
                for testing scenarios?
            </p>
        </div>
       );
}

function playerFactor(playerCount){
    return 1+0.3*(playerCount-1)
}

function timeFactor(difficultyValue, playerCount){
    return 0.046 * difficultyValue * playerCount ** 0.2
}

function stageFactor(stagesCompleted){
    return 1.15**stagesCompleted
}

function coeff(playerFactor, timeInMinutes, timeFactor, stageFactor){
    return (playerFactor + timeInMinutes * timeFactor) * stageFactor
}

function enemyLevel(coeff, playerFactor){
    return 1 + (coeff-playerFactor)/0.33
}