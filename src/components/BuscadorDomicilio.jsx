import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Botao from './shared/Botao';
import { Grid } from '@material-ui/core';
import CampoBusca from './shared/CampoBusca';
import axios from 'axios';
import SelectSetor from './SelectSetor';
import BasicModal from './Modal';

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
    const [resultado, setResultado] = useState('');
    const [modalAberto, setModalAberto] = useState(false);

    const handleClose = () => {
        setModalAberto(false);
    };

    const cadastroDomicilio = async () => {
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
                AnguloInclinacao: angulo,
                VolumeBacia: resultado
            });
            console.log(response)

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
            const response = await axios.get('https://localhost:7024/api/endereco/calcular-volume', {
                params:{
                    Altura: altura,
                    Base: base,
                    AnguloInclinacao: angulo
                }
            })

            const resultadoConvertido = response.data.replace(',', '.');

            setResultado(resultadoConvertido)    
        }catch(error){
            console.error('Erro no cálculo:', error);
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
    };

    useEffect(()=>{
        setResultado('');
    },[altura, base, angulo])

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
                        label={"Nº Residência"}
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
                <Grid item xs={2}>
                    <CampoBusca
                        value={altura}
                        onChange={handleInputChangeAltura}
                        label={"Altura"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoBusca
                        value={base}
                        onChange={handleInputChangeBase}
                        label={"Base"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CampoBusca
                        value={angulo}
                        onChange={handleInputChangeAngulo}
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
                    disabled={!resultado}
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
