import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from '../shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from '../shared/CampoBusca';
import axios from 'axios';
import BasicModal from '../Modal';
import SetorRepository from '../../repository/SetorRepository';

const CadastroSetor = () => {
    const classes = useStyles();
    const [nomeSetor, setNomeSetor] = useState('');
    const [modalAberto, setModalAberto] = useState(false);

    const cadastrarSetor = async () => {
        try {
            const response = await SetorRepository.CadastrarSetor(nomeSetor);

            if (response.status === 200) {
                setModalAberto(true)
                setNomeSetor('')
            }

        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const handleInputChange = (event) => {
        setNomeSetor(event.target.value);
    }

    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={10}>
                    <CampoBusca
                        value={nomeSetor}
                        onChange={handleInputChange}
                        label={"Cadastre um setor"}
                    />
                </Grid>
                <Grid item >
                    <Botao
                        titulo={"Cadastrar"}
                        className={classes.botao}
                        onClick={cadastrarSetor}
                    />
                </Grid>
            </Grid>
            <BasicModal
            isOpen={modalAberto} 
            onClose={() => setModalAberto(false)} 
            titulo={'Sucesso!'}
            texto={`O setor foi cadastrado.`}/>

        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        padding: '30px 10px 0px 10px',
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

export default CadastroSetor;
