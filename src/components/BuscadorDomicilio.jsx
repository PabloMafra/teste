import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from './shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from './shared/CampoBusca';
import axios from 'axios';
import SelectSetor from './SelectSetor';

const BuscadorSetor = () => {
    const classes = useStyles();
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [coordenadas, setCoordenadas] = useState('');
    const [altura, setAltura] = useState('');
    const [base, setBase] = useState('');
    const [angulo, setAngulo] = useState('');
    const [valorSelecionado, setValorSelecionado] = useState('');

    const listarFuncionarios = async () => {
        try {
            const response = await axios.post('https://localhost:7024/api/endereco/cadastro', {
                Cep: cep,
                Rua: rua,
                Bairro: bairro,
                Numero: numero,
                Estado: estado,
                Cidade: cidade,
                IdSetor: valorSelecionado,
                Coordenadas: coordenadas,
                Altura: altura,
                Base: base,
                AnguloInclinacao: angulo
            });
            console.log(response)

            if (response.status === 200) {
                alert('status 200 ok')
            }

        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const handleInputChangeRua = (event) => {
        setRua(event.target.value);
    }

    const handleInputChangeBairro = (event) => {
        setBairro(event.target.value);
    }

    const handleInputChangeNumero = (event) => {
        setNumero(event.target.value);
    }

    const handleInputChangeCep = (event) => {
        setCep(event.target.value);
    }

    const handleInputChangeEstado = (event) => {
        setEstado(event.target.value);
    }

    const handleInputChangeCidade = (event) => {
        setCidade(event.target.value);
    }

    const handleInputChangeCoordenadas = (event) => {
        setCoordenadas(event.target.value);
    }

    const handleInputChangeAltura = (event) => {
        setAltura(event.target.value);
    }    
    
    const handleInputChangeBase = (event) => {
        setBase(event.target.value);
    }

    const handleInputChangeAngulo = (event) => {
        setAngulo(event.target.value);
    }

    const handleSelecao = (valor) => {
        setValorSelecionado(valor);
        console.log(valor);
    };

    return (
        <Grid container className={classes.container} justifyContent={'center'}>
            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={5}>
                    <CampoBusca
                        value={cep}
                        onChange={handleInputChangeCep}
                        label={"CEP"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CampoBusca
                        value={rua}
                        onChange={handleInputChangeRua}
                        label={"Rua"}
                    />
                </Grid>
            </Grid>

            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={5}>
                    <CampoBusca
                        value={bairro}
                        onChange={handleInputChangeBairro}
                        label={"Bairro"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CampoBusca
                        value={numero}
                        onChange={handleInputChangeNumero}
                        label={"Número Residência"}
                    />
                </Grid>
            </Grid>

            <Grid container xs={12} justifyContent={'space-evenly'}>
                <Grid item xs={5}>
                    <CampoBusca
                        value={estado}
                        onChange={handleInputChangeEstado}
                        label={"Estado"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CampoBusca
                        value={cidade}
                        onChange={handleInputChangeCidade}
                        label={"Cidade"}
                    />
                </Grid>
            </Grid>
            <Grid container xs={12} justifyContent={'space-evenly'}>
                <Grid item xs={5}>
                    <SelectSetor
                        onSelect={handleSelecao}
                        label={"Setor"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CampoBusca
                        value={coordenadas}
                        onChange={handleInputChangeCoordenadas}
                        label={"Coordenadas"}
                    />
                </Grid>

            </Grid>

            <Grid container xs={10} justifyContent={'space-between'}>
                <Grid item xs={3}>
                    <CampoBusca
                        value={altura}
                        onChange={handleInputChangeAltura}
                        label={"Altura"}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CampoBusca
                        value={base}
                        onChange={handleInputChangeBase}
                        label={"Base"}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CampoBusca
                        value={angulo}
                        onChange={handleInputChangeAngulo}
                        label={"Angulo Inclinação"}
                    />
                </Grid>
            </Grid>



            <Grid container xs={4}>
                <Botao
                    titulo={"Cadastrar"}
                    onClick={listarFuncionarios}
                    onSelect={handleSelecao}
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
        padding: '15px',
    },
});

export default BuscadorSetor;
