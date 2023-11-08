import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from './shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from './shared/CampoBusca';
import axios from 'axios';

const BuscadorSetor = () => {
    const classes = useStyles();
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');

    const listarFuncionarios = async () => {
        try {
            const response = await axios.post('https://localhost:7024/api/domicilio/cadastro', {
                Endereco: endereco,
                Bairro: bairro,
                Numero: numero

            });
            console.log(response)

            if (response.status === 200) {
                alert('status 200 ok')
            }

        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const handleInputChangeEndereco = (event) => {
        setEndereco(event.target.value);
    }

    const handleInputChangeBairro = (event) => {
        setBairro(event.target.value);
    }

    const handleInputChangeNumero = (event) => {
        setNumero(event.target.value);
    }

    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid container xs={6}>
                <Grid item style={{ marginRight: '40px' }}>
                    <CampoBusca
                        value={endereco}
                        onChange={handleInputChangeEndereco}
                        label={"Endereço"}
                    />
                    <CampoBusca
                        value={bairro}
                        onChange={handleInputChangeBairro}
                        label={"Bairro"}
                    />
                    <CampoBusca
                        value={numero}
                        onChange={handleInputChangeNumero}
                        label={"Número"}
                    />
                    <CampoBusca
                        value={numero}
                        onChange={handleInputChangeNumero}
                        label={"Nome setor"}
                    />

                </Grid>
                <Grid container xs={6} justifyContent={'end'}>
                    <Grid item justifyContent={'end'}>
                        <CampoBusca
                            value={endereco}
                            onChange={handleInputChangeEndereco}
                            label={"Endereço"}
                        />
                        <CampoBusca
                            value={bairro}
                            onChange={handleInputChangeBairro}
                            label={"Bairro"}
                        />
                        <CampoBusca
                            value={numero}
                            onChange={handleInputChangeNumero}
                            label={"Número"}
                        />
                        <CampoBusca
                            value={numero}
                            onChange={handleInputChangeNumero}
                            label={"Nome setor"}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container xs={7}>
                <Botao
                    titulo={"Cadastrar"}
                    onClick={listarFuncionarios}
                />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles({
    container: {
        padding: '10px',
    },
    content: {
        padding: '20px'
    },
    buscar: {
        display: 'flex',
        justifyContent: 'end'
    },
    botao: {
        padding: '0 30px 0 30px',
        marginTop: '8px',
        marginBottom: '8px'
    },
});

export default BuscadorSetor;
