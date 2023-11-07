import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';

const Home = () => {
    const classes = useStyles();

    useEffect(() => {
      document.body.style.backgroundColor = "cadetblue";
      return () => {
        document.body.style.backgroundColor = "";
      };
    }, []);

    return(
        <Grid container justifyContent="center">
          <form className={classes.form}>
              <p className={classes.formTitle}>Seja bem vindo ao Projeto Guarda Chuva</p>
              <NavLink to="/cadastros/setor" className={classes.navLink}>
                <div className={classes.inputContainer}>
                    <span className={classes.span}>Cadastro</span>
                </div>
              </NavLink>
              <br/>
              <NavLink to="/dados/funcionarios" className={classes.navLink}>
                <div className={classes.inputContainer}>
                    <span className={classes.span}>Associação</span>
                </div>
              </NavLink>
          </form>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'block',
      padding: '1rem',
      maxWidth: 350,
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      height: '450px',
      marginTop: '100px',
      backgroundColor: '#989ec7'
    },
    formTitle: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: 600,
      textAlign: 'center',
      color: '#000',
      marginTop: '66px',
      marginBottom: '100px'
    },
    inputContainer: {
      position: 'relative',
      paddingBottom: '10px',
      paddingTop: '10px',
      backgroundColor: 'rgb(123, 40, 110)',
      textAlign: 'center',
      borderRadius: '10px',
      width: '345px'
    },
    input: {
      outline: 'none',
      border: '1px solid #e5e7eb',
      margin: '8px 0',
      backgroundColor: '#fff',
      padding: '1rem',
      paddingRight: '3rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      width: 300,
      borderRadius: '0.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    submit: {
      display: 'block',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      backgroundColor: '#4F46E5',
      color: '#ffffff',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
      width: '100%',
      borderRadius: '0.5rem',
      textTransform: 'uppercase',
    },
    signupLink: {
      color: '#6B7280',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      textAlign: 'center',
    },
    signupLinkA: {
      textDecoration: 'underline',
    },
    span: {
        color: 'white',
    }
  }));

export default Home;