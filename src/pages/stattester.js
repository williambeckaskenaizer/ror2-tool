import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 190,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    card: {
        minWidth: 375,
    },
    button:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

export default function StatTester() {


    const classes = useStyles();
    const [difficulty, setDifficulty] = React.useState('');
    const [time, setTime] = React.useState('');
    const [playerCount, setPlayerCount] = React.useState('')
    const [enemy, setEnemy] = React.useState('')
    const [stagesCompleted, setStagesCompleted] = React.useState('')

    const [enemyLevel, setEnemyLevel] = React.useState('');
    const [playerFactor, setPlayerFactor] = React.useState('');
    const [timeFactor, setTimeFactor] = React.useState('');
    const [coeff, setCoeff] = React.useState('');
    const [stageFactor, setStageFactor] = React.useState('');
    const [enemyHP, setEnemyHP] = React.useState('');


    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleDifficulty = event => {
        setDifficulty(event.target.value);
    };
    const handleTime = event => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setTime(onlyNums);
        
    };
    const handlePlayerCount = event => {
        setPlayerCount(event.target.value);
        
    };
    const handleEnemy = event => {
        setEnemy(event.target.value);
        populateValues(event.target.value)
        setCoeff(getCoeff(playerFactor, time, timeFactor, stageFactor))
    };
    const handleStagesCompleted = event => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setStagesCompleted(onlyNums)
        setStageFactor(getStageFactor(onlyNums))
        
    }
    function populateValues(enemy){
        setTimeFactor(getTimeFactor(difficulty, playerCount))
        setPlayerFactor(getPlayerFactor(playerCount))
        
        setEnemyLevel(getEnemyLevel(coeff, playerFactor))
        setEnemyHP(Math.round(getEnemyHP(enemy)[0] + (getEnemyHP(enemy)[1] * enemyLevel)))
    }
    



    return (
        <div>
            <h1>UNDER CONSTRUCTION</h1>
        </div>
    );
}


function getPlayerFactor(pc) {
    return 1 + 0.3 * (pc - 1)
}

function getTimeFactor(dv, pc) {
    var val = 0
    switch(dv){
        case 'Drizzle': val=1
        break;
        case 'Rainstorm': val=2
        break;
        case 'Monsoon': val=3
    }
    return 0.046 * val * (pc ** 0.2)
}

function getStageFactor(sc) {
    return 1.15 ** sc
}

function getCoeff(pf, min, tf, sf) {
    return (pf + min * tf) * sf
}

function getEnemyLevel(co, pf) {
    return 1 + (co - pf) / 0.33
}

function getEnemyHP(enemy){
    switch(enemy){
        case 'Imp': return [200, 75]
        case 'Beetle': return [80, 24]
        case 'Lemurian': return [80, 24]
        case 'Stone Golem': return [480, 144]
    }
}



//{Math.round(enemyLevel)}&nbsp; HP: {enemyHP}

{/* <div>
            <h2>Testing Grounds</h2>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select difficulty</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficulty}
                    onChange={(e) => handleDifficulty(e)}

                >
                    {['Drizzle', 'Rainstorm', 'Monsoon'].map((difficulty, index) => (
                        <MenuItem value={difficulty}>{difficulty}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Select player count</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={playerCount}
                    onChange={(e) => handlePlayerCount(e)}
                >
                    {[1, 2, 3, 4].map((playerCount, index) => (
                        <MenuItem value={playerCount}>{playerCount}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant="filled" className={classes.textField} id="minutes" label="Minutes" onChange={(e) => handleTime(e)} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField variant="filled" className={classes.textField} id="sc" label="Stages Completed" onChange={(e) => handleStagesCompleted(e)}/>
            </FormControl>
            <Divider />
            <div>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select Enemy</InputLabel>
                    <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={enemy}
                        onChange={(e) => handleEnemy(e)}
                    >
                        {["Beetle", "Imp", "Lemurian", "Stone Golem"].map((enemy, index) => (
                            <MenuItem value={enemy}>{enemy}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <FormControl>
                    <Button variant = "filled" className = {classes.button}></Button>
                </FormControl> } */
           /* </div>
            <div>
                <FormControl variant="filled" className={classes.formControl}>
                    <Card className={classes.card}>
                        <CardContent>
                        </CardContent>
                        <h3>
                            On difficulty {difficulty}
                        </h3>
                        <h3>
                            with {playerCount} players
                        </h3>
                        <h3>
                            at {time} minutes 
                        </h3>
                        <h2>
                            {enemy}
                        </h2>
                        <h3>
                            has the following stats:
                           <p>Level: 9&nbsp; HP: 675 &nbsp; Damage: 24 Speed: 10 m/s</p>

                        </h3>
                        <CardActions>
                        </CardActions>
                    </Card>
                </FormControl>
            </div>
        </div > */}