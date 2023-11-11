import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function SelectSetor({onSelect}) {
  const [selecao, setSelecao] = useState('');
  const [setorList, setSetorList] = useState([]);

  const handleChange = (event) => {
    const valorSelecionado = event.target.value;
    setSelecao(valorSelecionado);
    onSelect(valorSelecionado);
  };

  useEffect(() =>{
    const buscarSetor = async () => {
      try {
        const resposta = await axios.get('https://localhost:7024/api/setor/listar');

        if (resposta.status === 200) {
          setSetorList(resposta.data);
        }else{
          setSetorList([]);
        }

      } catch (error) {
        console.error('Erro', error);
        setSetorList([]);
      }
    };

    buscarSetor();

  },[])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Setor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selecao}
          label="Setor"
          onChange={handleChange}
        >
          {setorList.length === 0 && (
            <MenuItem value="" disabled>
              Resultado Não Encontrado
            </MenuItem>
          )}
          {setorList.map((setor) => (
            <MenuItem key={setor.id} value={setor.id}>
              {setor.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}