import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
      marginBottom: '30px'
    },
  },
}));

const CampoBusca = ({ value, onChange, label, readOnly, disabled, estoque }) => {
  const classes = useStyles();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    if(estoque){
      const isNumber = /^\d+$/;
      if (!isNumber.test(event.key)) {
        event.preventDefault();
      }
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
          disabled: disabled,
          inputProps: {
            pattern: '[0-9]*',
          },
        }}
        onKeyPress={handleKeyPress}
      />
    </form>
  );
}

export default CampoBusca;
