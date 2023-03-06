import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedTableHead from './head/EnhancedTableHead';
import EnhancedTableToolbar from './head/EnhancedTableToolbar';
import { Container } from '@mui/material';
import TableContext from './TableContext';
import MultyTableBody from './body/MultyTableBody';
import { users } from 'src/mocks/users';

export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

type Order = 'asc' | 'desc';

interface Iprops {
  onRowClick?: (row: any) => void;
  withSelect?: boolean;
  data: any;
  title?: string;
  cols: { name: string; label: string }[];
  refersTo?: string;
}

export default function MultyTable({
  onRowClick = null,
  withSelect = false,
  data,
  title,
  cols = null,
  refersTo = ''
}: Iprops) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [rows, setData] = React.useState(data);

  const headCells = cols.map((col) => {
    return {
      id: col.name,
      numeric: false,
      disablePadding: false,
      label: col.label
    };
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    row: number
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    const selectedRow: any = withSelect ? [newSelected] : [name];
    onRowClick(row);
    setSelected(selectedRow);
    setSelectedRow(row);
  };

  const handleEdit = () => {
    onRowClick(selectedRow);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleDelete = () => setData(rows.filter((row) => row !== selectedRow));

  const addRecord = (newData) => {
    console.log('newData', newData);
    setData([...rows, newData]);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const excloudedFields = ['metrics'];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  console.log('DATATA', rows);

  return (
    <TableContext.Provider
      value={{
        data: rows,
        withSelect,
        search,
        page,
        rowsPerPage,
        order,
        orderBy,
        emptyRows,
        dense,
        selectedRow,
        title,
        isSelected,
        handleClick,
        handleDelete,
        handleEdit,
        headCells,
        excloudedFields,
        refersTo,
        cols,
        addRecord
      }}
    >
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              setSearch={setSearch}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  withSelect={withSelect}
                />
                <MultyTableBody />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
        </Box>
      </Container>
    </TableContext.Provider>
  );
}
