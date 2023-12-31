import React, {useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import { azulClaro, azulRoial, verdeClaro } from "../components/shared/Utils/constantes";

const Home = () => {
    const classes = useStyles();
    const [sobre, setSobre] = useState(false);

    useEffect(() => {
      document.body.style.backgroundColor = azulClaro;
      return () => {
        document.body.style.backgroundColor = "";
      };
    }, []);

    return (
      <Grid container justifyContent="center">
        <form className={sobre ? classes. form2 : classes.form}>
          {sobre ? (
            <Grid>
              <p>
                Integrantes:<br/><br/>
                Camila Lima de Sousa Delazari Perazzolli - camilalsdeperazzolli@gmail.com<br/><br/>
                Arthur Anjos Santos - arthuranjoscontato@gmail.com<br/><br/>
                André Henrique Albergaria Tiburcio - tiburcio.mec@gmail.com<br/><br/>
                Pablo Riquelme Mafra e Santos - 202108663875@alunos.estacio.br<br/><br/>
                Ryan Abranches Bueno Ricardo
              </p>
              <NavLink to="/" className={classes.navLink} onClick={() => setSobre(false)}>
              <div className={classes.inputContainer}>
                <span className={classes.span}>Voltar</span>
              </div>
            </NavLink>
          </Grid>
          ) : (
            <>
              <p className={classes.formTitle}>Bem vindo ao Projeto Guarda Chuva</p>
              <NavLink to="/setor" className={classes.navLink}>
                <div className={classes.inputContainer}>
                  <span className={classes.span}>Sistema</span>
                </div>
              </NavLink>
              <br />
              <NavLink
                onClick={() => setSobre(true)}
                className={classes.sobre}
              >
                <div className={classes.inputContainer}>
                  <span className={classes.span}>Sobre</span>
                </div>
              </NavLink>
            </>
          )}
        </form>
      </Grid>
    );
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
      backgroundColor: azulRoial
    },
    formTitle: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: 600,
      textAlign: 'center',
      color: 'white',
      marginTop: '66px',
      marginBottom: '100px'
    },
    inputContainer: {
      position: 'relative',
      paddingBottom: '10px',
      paddingTop: '10px',
      backgroundColor: verdeClaro,
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
        color: azulRoial,
        fontWeight: '900'
    },
    form2: {
      display: 'block',
      padding: '1rem',
      maxWidth: 350,
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      height: '450px',
      marginTop: '100px',
      backgroundColor: 'white'
    }
  }));

export default Home;