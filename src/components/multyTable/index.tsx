import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import EnhancedTableHead from './head/EnhancedTableHead';
import EnhancedTableToolbar from './head/EnhancedTableToolbar';
import { Container, TableHead } from '@mui/material';
import TableContext from './TableContext';
import MultyTableBody from './body/MultyTableBody';
import {
  DELETE_WARNING_MESSAGE,
  NEW_RECORD_TITLE,
  NO_RECORDS_FOUND,
  REQUEST_FILELD_MESSAGE,
  SELECT_OPTION_LABEL
} from '../../constants';
import { ro } from 'date-fns/locale';
import { Height } from '@mui/icons-material';

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
  onDataChange?: (data: any) => void;
  onRecordDelete?: (id: any) => void;
  onRecordSave?: (data: any) => void;
  withSelect?: boolean;
  data: any;
  title?: string;
  cols: { name: string; label: string; width?: string }[];
  refersTo?: string;
  filters?: {
    name: string;
    column: string;
    values: { value: string; label: string }[];
  }[];
  selectOpitionLabel?: string;
  noRecordsFoundText?: string;
  deleteWarningMessage?: string;
  requredFiledsMessage?: string;
  newRecordTitle?: string;
  hideToolbar?: boolean;
  excloudedFields?: string[];
  defaultFilter?: string;
  height?: number;
  hideAddButton?: boolean;
  hideSearchButton?: boolean;
  hideDeleteButton?: boolean;
  hideEditButton?: boolean;
}

export default function MultyTable({
  onRowClick = () => false,
  onDataChange = () => false,
  onRecordDelete = () => false,
  onRecordSave = () => false,
  withSelect = false,
  data,
  title,
  cols = null,
  filters,
  refersTo = '',
  selectOpitionLabel = SELECT_OPTION_LABEL,
  noRecordsFoundText = NO_RECORDS_FOUND,
  deleteWarningMessage = DELETE_WARNING_MESSAGE,
  requredFiledsMessage = REQUEST_FILELD_MESSAGE,
  newRecordTitle = NEW_RECORD_TITLE,
  hideToolbar = false,
  excloudedFields = [],
  defaultFilter = 'name',
  height = 400,
  hideAddButton = false,
  hideSearchButton = false,
  hideDeleteButton = false,
  hideEditButton = false
}: Iprops) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedFilters, setFilters] = React.useState(null);
  const [rows, setData] = React.useState([]);

  React.useEffect(() => {
    setData(data);
  }, [data]);

  const headCells = cols.map((col) => {
    return {
      id: col.name,
      numeric: false,
      disablePadding: false,
      label: col.label,
      width: col?.width
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

    const selectedRow: any = withSelect ? newSelected : [name];
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

  const handleDelete = () => {
    setData(rows.filter((row) => row !== selectedRow));
    onRecordDelete(selectedRow);
  };

  const addRecord = (newData) => {
    setData([...rows, newData]);
  };

  const editRecord = (newData) => {
    const index = rows.indexOf(selectedRow);

    rows[index] = newData;

    setData([...rows]);
    setSelectedRow(null);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    onDataChange({ rows, selectedRow });
  }, [rows, selectedRow]);

  return (
    <TableContext.Provider
      value={{
        data: rows,
        withSelect,
        selected,
        search,
        page,
        rowsPerPage,
        order,
        orderBy,
        emptyRows,
        noRecordsFoundText,
        selectOpitionLabel,
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
        filters,
        setFilters,
        addRecord,
        editRecord,
        selectedFilters,
        deleteWarningMessage,
        requredFiledsMessage,
        newRecordTitle,
        onRecordSave,
        defaultFilter,
        setSelectedRow,
        height,
        hideAddButton,
        hideSearchButton,
        hideDeleteButton,
        hideEditButton
      }}
    >
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }} variant="outlined" elevation={0}>
            {!hideToolbar && (
              <EnhancedTableToolbar
                numSelected={selected.length}
                setSearch={setSearch}
              />
            )}
            <TableContainer sx={{ maxHeight: height }}>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                stickyHeader
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
