import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from '../shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from '../shared/CampoBusca';
import axios from 'axios';
import SelectSetor from '../SelectSetor';
import BasicModal from '../Modal';
import SetorRepository from '../../repository/SetorRepository';
import CalcularVolumeRepository from '../../repository/CalcularVolumeRepository';
import TabelaDomicilio from '../Domicilio/TabelaDomicilio';
import TabelaSetor from './TabelaSetor';

const BuscaSetor = () => {
    const classes = useStyles();
    const [modalAberto, setModalAberto] = useState(false);
    const [busca, setBusca] = useState('');
    const [resposta, setResposta] = useState(null)
    const [botaoAtivo, setBotaoAtivo] = useState(true)
    
    useEffect(() => {
        if(busca){
            setBotaoAtivo(false)
        }else{
            setBotaoAtivo(true)
        }
    },[busca])

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const buscarDomicilio = async () => {
        try {
          const resultado = await SetorRepository.BuscarSetor(busca);
          setResposta(resultado.data)
        } catch (error) {
          console.error("Erro ao buscar domicílio:", error);
        }
    };
    console.log(resposta)
    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={10}>
                    <CampoBusca
                        value={busca}
                        onChange={(e) => handleInputChange(e, setBusca)}
                        label={"Busque por setor"}
                    />
                </Grid>
                <Grid item >
                    <Botao
                        titulo={"Buscar"}
                        className={classes.botao}
                        onClick={buscarDomicilio}
                    />
                </Grid>
            </Grid>
            <TabelaSetor
            data={resposta}/>
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
        padding: '20px 10px 0px 10px',
    },
    content: {
        padding: '20px'
    },
    buscar: {
        display: 'flex',
        justifyContent: 'end'
    },
    botao: {
        padding: '15px 24.5px 15px 24.5px',
    },
});

export default BuscaSetor;
