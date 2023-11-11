import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DomicilioRepository from '../repository/DomicilioRepository';
import { TableHead, Tooltip } from '@mui/material';
import { ufs } from './shared/Utils/constantes';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    alignItems: 'left'
  },
  textoEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'block',
    textOverflow: 'ellipsis',
  },
  tableHead: {
    background: '#e0e0e0',
  },
});

export default function TabelaDomicilio() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    
    useEffect(() => {
        const buscarDomicilio = async () => {
          try {
            const resposta = await DomicilioRepository.BuscarDomicilio('Tupi');
            setData(resposta.data);
            console.log(resposta.data);
          } catch (error) {
            console.error("Erro ao buscar domicílio:", error);
          } finally {
            setLoading(false);
          }
        };
    
        buscarDomicilio();
    }, []);
      
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  function TratarUf(value) {
    const state = ufs.find(state => state.value === value);
    return state ? state.label : value;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Setor</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Coordenadas</TableCell>
            <TableCell>Volume da Bacia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ minWidth: '50px', maxWidth: '50px' }} component="th" scope="row">
                <span className={classes.textoEllipsis} style={{ minWidth: '50px', maxWidth: '100px' }}>
                    <Tooltip title={row.nomeSetor}>
                        {row.nomeSetor}
                    </Tooltip>
                </span>
              </TableCell>
              <TableCell style={{ minWidth: '140px', maxWidth: '140px' }} component="th" scope="row">
                <span className={classes.textoEllipsis} style={{ width: '100%' }}>
                    <Tooltip title={`${row.rua} - ${row.numero}`}>
                        {`${row.rua} - ${row.numero}`}
                    </Tooltip>
                </span>
              </TableCell>
              <TableCell style={{ minWidth: '110px', maxWidth: '110px' }} component="th" scope="row">
                <span className={classes.textoEllipsis} style={{ minWidth: '107px', maxWidth: '107px' }}>
                    <Tooltip title={row.cidade}>
                        {row.cidade}
                    </Tooltip>
                </span>
              </TableCell>
              <TableCell style={{ minWidth: '110px', maxWidth: '145px' }} component="th" scope="row">
                <span className={classes.textoEllipsis} style={{ minWidth: '107px', maxWidth: '107px' }}>
                    <Tooltip title={TratarUf(row.estado)}>
                        {TratarUf(row.estado)}
                    </Tooltip>
                </span>
              </TableCell>
              <TableCell style={{ minWidth: '110px', maxWidth: '110px' }} component="th" scope="row">
                <span className={classes.textoEllipsis} style={{ minWidth: '107px', maxWidth: '107px' }}>
                    <Tooltip title={row.coordenadas}>
                        {row.coordenadas}
                    </Tooltip>
                </span>
              </TableCell>
              <TableCell style={{ minWidth: '100px', maxWidth: '100px' }} component="th" scope="row">
                <span className={classes.textoEllipsis} style={{ minWidth: '100px', maxWidth: '100px' }}>
                    <Tooltip title={row.volumeBacia}>
                        {row.volumeBacia}
                    </Tooltip>
                </span>
              </TableCell>

            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
