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
        const resposta = await axios.get('https://localhost:7024/api/setor/listar');
        console.log(resposta)
    
        if (resposta.status === 200) {
            alert('status 200 ok')
            setSetorList(resposta.data);
        }
    }

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