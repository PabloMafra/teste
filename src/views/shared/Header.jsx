import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Logo from '../../imgs/logo.jpg'
import { Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.header} justifyContent="space-between">
            <Grid item>
                <img src={Logo} className={classes.imagem}/>
            </Grid>
            <Grid item>
                <ul className={classes.container}>
                    <li className={classes.linha}>
                        <NavLink className="nav-link" activeClassName="active" to="/dados/funcionarios">Dados</NavLink>
                    </li>
                </ul>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles({
    header: {
        padding: '10px',
        borderBottom: '1px solid black'
    },
    linha:{
        padding: '10px',
        listStyle: 'none'
    },
    container: {
        display: 'flex',
        justifyContent: 'end',
        fontWeight: 'bold'
    },
    imagem: {
        width: '200px',
    }
});

export default Header;
