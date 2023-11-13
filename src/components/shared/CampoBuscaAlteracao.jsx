import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  },
}));

const CampoBuscaAlteracao = ({ value, onChange, label, readOnly, disabled }) => {
  const classes = useStyles();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          readOnly: readOnly,
          disabled: disabled
        }}
        onKeyPress={handleKeyPress}
      />
    </form>
  );
}

export default CampoBuscaAlteracao;
