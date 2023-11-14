import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from '../shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from '../shared/CampoBusca';
import axios from 'axios';
import BasicModal from '../Modal';
import SetorRepository from '../../repository/SetorRepository';
import EstoqueRepository from '../../repository/EstoqueRepository';

const CadastroEstoque = () => {
    const classes = useStyles();
    const [nomeEstoque, setNomeEstoque] = useState('');
    const [modalAberto, setModalAberto] = useState(false);

    const cadastrarSetor = async () => {
        try {
            const response = await EstoqueRepository.CadastrarEstoque(nomeEstoque);
            if (response.status === 200) {
                setModalAberto(true)
                setNomeEstoque('')
            }

        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const handleInputChange = (event) => {
        setNomeEstoque(event.target.value);
    }

    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={10}>
                    <CampoBusca
                        value={nomeEstoque}
                        onChange={handleInputChange}
                        label={"Cadastre um recipiente (Em litros)"}
                        estoque={true}
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
            texto={`O recipiente foi cadastrado.`}/>

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
        padding: '15px',
    },
});

export default CadastroEstoque;
