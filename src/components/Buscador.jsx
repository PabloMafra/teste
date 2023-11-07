import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from './shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from './shared/CampoBusca';
import axios from 'axios';

const Buscador = () => {
    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);

    const listarFuncionarios = async () => {
        try {
            const response = await axios.post('https://localhost:7024/api/setor/cadastro', {
                Nome: nome
            });
            console.log(nome)
            console.log(response)
            const listaFuncionarios = response.data;
            if(response.status === 200){
                alert('teste')
            }

            if (listaFuncionarios.length > 0) {
                setFuncionarios(listaFuncionarios);
            } else {
                setFuncionarios([{ nome: 'Nenhum funcionário encontrado' }]);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            setFuncionarios([{ nome: 'Erro na solicitação' }]);
        }
    }
    
    const handleInputChange = (event) => {
        setNome(event.target.value);
    }

    return (
        <Grid container className={classes.container}>
            <Grid container justifyContent={'center'}>
                <Grid item xs={8}>
                    <CampoBusca
                        value={nome}
                        onChange={handleInputChange}
                        label={"Nome setor"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Botao
                        titulo={"Cadastrar"}
                        onClick={listarFuncionarios}
                    />
                </Grid>
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

export default Buscador;
