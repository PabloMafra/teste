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

const CadastroDomicilio = () => {
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
    const [resultado, setResultado] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const botaoCadastro = (!resultado || !cep || !rua || !bairro || !numero || !estado || !cidade || !valorSelecionado || !coordenadas || !altura || !base || !angulo);

    useEffect(()=>{
        setResultado('');
    },[altura, base, angulo])

    const cadastroDomicilio = async () => {
        try {
            const response = await DomicilioRepository.CadastrarDomicilio(
                cep,
                rua,
                bairro,
                numero,
                estado,
                cidade,
                valorSelecionado,
                coordenadas,
                altura,
                base,
                angulo,
                resultado
            )

            if (response.status === 200) {
                setModalAberto(true);
                setRua('');
                setBairro('');
                setNumero('');
                setCep('');
                setEstado('');
                setCidade('');
                setCoordenadas('');
                setAltura('');
                setBase('');
                setAngulo('');
                setValorSelecionado('');
                setResultado('');
            }

        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const calcularVolume = async () => {
        try{
            const response = await CalcularVolumeRepository.CalcularVolume(altura, base, angulo);

            setResultado(response)    
        }catch(error){
            console.error('Erro no cálculo:', error);
        }
    }

    const handleInputChangeCep = async (event) => {
        const inputCep = event.target.value;
        setCep(inputCep);

        if (/^\d{8}$/.test(inputCep)) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${inputCep}/json/`);

                if (response.data && !response.data.erro) {
                    setRua(response.data.logradouro || '');
                    setBairro(response.data.bairro || '');
                    setEstado(response.data.uf || '');
                    setCidade(response.data.localidade || '');
                } else {
                    setRua('');
                    setBairro('');
                    setEstado('');
                    setCidade('');
                }
            } catch (error) {
                console.error('Erro ao buscar informações do CEP:', error);
            }
        }
    }

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);
    };

    const handleSelecao = (valor) => {
        setValorSelecionado(valor);
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
                        onChange={(e) => handleInputChange(e, setRua)}
                        label={"Rua"}
                    />
                </Grid>
            </Grid>

            <Grid container justifyContent={'space-evenly'}>
                <Grid item xs={5}>
                    <CampoBusca
                        value={bairro}
                        onChange={(e) => handleInputChange(e, setBairro)}
                        label={"Bairro"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CampoBusca
                        value={numero}
                        onChange={(e) => handleInputChange(e, setNumero)}
                        label={"Nº Residência"}
                    />
                </Grid>
            </Grid>

            <Grid container xs={12} justifyContent={'space-evenly'}>
                <Grid item xs={5}>
                    <CampoBusca
                        value={estado}
                        onChange={(e) => handleInputChange(e, setEstado)}
                        label={"Estado"}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CampoBusca
                        value={cidade}
                        onChange={(e) => handleInputChange(e, setCidade)}
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
                        onChange={(e) => handleInputChange(e, setCoordenadas)}
                        label={"Coordenadas"}
                    />
                </Grid>

            </Grid>

            <Grid container xs={10} justifyContent={'space-between'}>
                <Grid item xs={2}>
                    <CampoBusca
                        value={altura}
                        onChange={(e) => handleInputChange(e, setAltura)}
                        label={"Altura"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoBusca
                        value={base}
                        onChange={(e) => handleInputChange(e, setBase)}
                        label={"Base"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoBusca
                        value={angulo}
                        onChange={(e) => handleInputChange(e, setAngulo)}
                        label={"Inclinação"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoBusca
                        value={resultado}
                        label={"Volume Bacia"}
                        readOnly={true}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Botao
                        titulo={"Calcular"}
                        onClick={calcularVolume}
                        onSelect={handleSelecao}
                        className={classes.botao}
                        disabled={!altura || !base || !angulo}
                    />
                </Grid>
            </Grid>

            <Grid container xs={4}>
                <Botao
                    titulo={"Cadastrar"}
                    onClick={cadastroDomicilio}
                    onSelect={handleSelecao}
                    disabled={botaoCadastro}
                />
            </Grid>
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

export default CadastroDomicilio;
