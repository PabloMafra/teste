import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const ListaFuncionarios = ({ funcionarios }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.lista}>
            <Grid item xs={11}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.th}>Nome</th>
                            <th className={classes.th}>Cargo</th>
                            <th className={classes.th}>Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map((funcionario, index) => (
                            <tr key={index}>
                                <td className={classes.td}>{funcionario.nome}</td>
                                <td className={classes.td}>{funcionario.cargo}</td>
                                <td className={classes.td}>{funcionario.idade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles({
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    th: {
        backgroundColor: 'lightgray',
        border: '1px solid black',
        textAlign: 'center',
    },
    td: {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
    },
    lista: {
        display: 'flex',
        justifyContent: 'center'
    }
});

export default ListaFuncionarios;
