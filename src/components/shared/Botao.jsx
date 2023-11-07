import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Botao = props => {
  const classes = useStyles(props);

  const botaoCustomizado = (
    <Button
      id={props.id}
      variant='contained'
      color={props.type}
      disabled={props.disabled || props.carregando}
      className={`${classes.botao} ${props.className}`}
      onClick={props.onClick}
      size={props.tamanho}
      href={props.href}
      target={props.target}
      fullWidth={props.fullWidth}
      component={props.component}
      to={props.to}
    >
      {props.titulo} {props.atalho ? props.atalho : null}
    </Button>
  );

  let botaoRetorno = botaoCustomizado;
  if (props.carregando) {
    botaoRetorno = (
      <div className={classes.wrapper}>
        {botaoCustomizado}
        <CircularProgress size={24} className={classes.buttonProgress} />
      </div>
    );
  }

  return botaoRetorno;
};

const useStyles = makeStyles(theme => ({
  botao: {
    backgroundColor: props => (props.type === 'primary' ? 'rgb(123, 40, 110)' : 'rgb(123, 40, 110)'),
    textTransform: props => (props.uppercase ? 'uppercase' : 'none'),
    '&:hover': {
      backgroundColor: props => (props.type === 'primary' ? 'rgb(123, 40, 110)' : 'rgb(123, 40, 110)')
    },
    color: props => (props.type === 'primary' ? 'white' : 'white'),
    width: '100%',

  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -12
  },
  wrapper: {
    position: 'relative'
  }
}));

export default Botao;