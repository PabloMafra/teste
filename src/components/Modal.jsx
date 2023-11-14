import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Botao from './shared/Botao';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center'
};

export default function BasicModal({ isOpen, onClose, titulo, texto, doisBotoes }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" style={{fontWeight: 'bold'}}>
            {titulo}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{marginBottom: '40px'}}>
            {texto}
          </Typography>
          {doisBotoes ? (
            <Grid container justifyContent={'space-evenly'}>
              <Grid item xs={5}>
                <Botao titulo={'Fechar'} onClick={onClose} className={classes.botaoFechar}/>
              </Grid>
              <Grid item xs={5}>
                <Botao titulo={'Confirmar'} onClick={onClose} />
              </Grid>
            </Grid>
          ) : (
            <Botao titulo={'Fechar'} onClick={onClose} className={classes.botaoFechar} />
          )}
        </Box>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles({
  botaoFechar: {
    background: 'red',
  },
});
