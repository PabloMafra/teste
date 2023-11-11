import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from './shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from './shared/CampoBusca';
import axios from 'axios';
import SelectSetor from './SelectSetor';
import BasicModal from './Modal';
import DomicilioRepository from '../repository/DomicilioRepository';
import CalcularVolumeRepository from '../repository/CalcularVolumeRepository';
import TabelaDomicilio from './TabelaDomicilio';

const BuscaDomicilio = () => {
    const classes = useStyles();
    const [modalAberto, setModalAberto] = useState(false);
    const [busca, setBusca] = useState('');


    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };


    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={10}>
                    <CampoBusca
                        value={busca}
                        onChange={(e) => handleInputChange(e, setBusca)}
                        label={"Busque por Endereço, Setor, Bairro ou Cidade"}
                    />
                </Grid>
                <Grid item >
                    <Botao
                        titulo={"Buscar"}
                        disabled={false}
                        className={classes.botao}
                    />
                </Grid>
            </Grid>
            <TabelaDomicilio/>
            <BasicModal 
            isOpen={modalAberto} 
            onClose={() => setModalAberto(false)} 
            titulo={'Sucesso!'}
            texto={'Domicílio cadastrado com sucesso'}/>
        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        padding: '50px 10px 0px 10px',
    },
    content: {
        padding: '20px'
    },
    buscar: {
        display: 'flex',
        justifyContent: 'end'
    },
    botao: {
        padding: '15px',
    },
});

export default BuscaDomicilio;
