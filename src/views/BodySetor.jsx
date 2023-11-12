import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HouseIcon from '@mui/icons-material/House';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@mui/material';
import { azulClaro } from '../components/shared/Utils/constantes';
import logo from '../logo.png';
import CadastroDomicilio from '../components/CadastroDomicilio';
import CadastroSetor from '../components/CadastroSetor';
import Botao from '../components/shared/Botao';

const drawerWidth = 240;

function BodySetor(props) {
    const { window } = props;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [ehConsulta, setehConsulta] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Grid container justifyContent={'center'}>
                <Grid item style={{padding: '15px'}}>
                    <img src={logo} alt={'Logo'} />
                </Grid>
            </Grid>
            <Divider />
            <List>
                {[
                    { text: 'Setor', path: '/setor' },
                    { text: 'Domicílio', path: '/domicilio' },
                    { text: 'Estoque', path: '/estoque' },
                ].map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={NavLink} to={item.path} activeClassName="Mui-selected">
                            <ListItemIcon>
                                {index === 0 ? <SouthAmericaIcon /> : null}
                                {index === 1 ? <HouseIcon /> : null}
                                {index === 2 ? <InboxIcon /> : null}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className={classes.containerTitulo}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.titulo} component="div">
                        Domicílio
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Grid container style={{paddingTop: '15px'}} xs={12} justifyContent={'end'}>
                    <Grid item>
                        <Botao
                            titulo={'Cadastrar'}
                            className={classes.botaoCadastro}
                            onClick={() => setehConsulta(false)}
                            disabled={!ehConsulta}
                        />
                    </Grid>
                    <Grid item>
                    <Botao
                        titulo={'Consulta'}
                        className={classes.botaoConsulta}
                        disabled={ehConsulta}
                        onClick={() => setehConsulta(true)}
                    />
                    </Grid>
                </Grid>
                {ehConsulta ? (<CadastroSetor/>) : <CadastroSetor/>}
                
            </Box>

        </Box>
    );
}

BodySetor.propTypes = {
    window: PropTypes.func,
};

const useStyles = makeStyles({
    titulo: {
        position: 'absolute',
    },
    containerTitulo: {
        background: azulClaro,
        height: '83px'
    },
    botaoCadastro: {
        background: 'white',
        color: 'black',
        '&:hover': {
            background:'white',
            boxShadow: 'none',
            borderBottom: '0.1px solid black',
            borderRight: '0.1px solid black'
        },
        boxShadow: 'none',
        borderBottom: '0.1px solid black',
        borderRight: '0.1px solid black',
        borderRadius: 'none'

    },
    botaoConsulta: {
        background: 'white',
        color: 'black',
        '&:hover': {
            background:'white',
            boxShadow: 'none',
            borderBottom: '0.1px solid black',
        },
        boxShadow: 'none',
        borderBottom: '0.1px solid black',
        borderRadius: 'none'

    }
});


export default BodySetor;