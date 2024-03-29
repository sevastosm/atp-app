import { TableBody, TableRow, TableCell, Checkbox, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import React, { useContext } from 'react';
import TableContext from '../TableContext';

type Props = {};
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const MultyTableBody = () => {
  const {
    data,
    withSelect = false,
    search,
    page,
    rowsPerPage,
    order,
    orderBy,
    emptyRows,
    dense,
    isSelected,
    handleClick,
    excloudedFields,
    selectedFilters,
    noRecordsFoundText,
    selected,
    selectedRow,
    defaultFilter,
    cols
  } = useContext(TableContext);

  const theme = useTheme();

  const matches = useMediaQuery(() => theme.breakpoints.down('sm'));

  // // TO DO dynamic search options
  const fixedData = stableSort(data, getComparator(order, orderBy))
    .filter((row: any) =>
      row[defaultFilter]
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    )
    // TO DO add more than one filter

    .filter((row: any) => {
      // console.log('row', row);
      // console.log('selectedFilters', selectedFilters);

      if (!selectedFilters || selectedFilters.value === '0') return row;
      return row[selectedFilters?.filter] === selectedFilters.value;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const fillRequiredField: any = (row, key) => {
    if (key.name !== 'qi') return;
    if (key.name === 'qi' && !row[key.name]) {
      return { background: 'yellow', width: '30px', height: '20px' };
    }
  };

  return (
    <TableBody>
      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
rows.sort(getComparator(order, orderBy)).slice() */}
      {fixedData.map((row: any, index) => {
        const isItemSelected = isSelected(row._id);
        const isRowSelected = selectedRow?._id === row._id;
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            onClick={(event) => handleClick(event, row.name, row)}
            // role="checkbox"
            // aria-checked={isItemSelected}
            tabIndex={-1}
            key={index}
            selected={isRowSelected}
          >
            {withSelect && (
              <TableCell key={row.name}>
                <Checkbox
                  color="primary"
                  checked={isRowSelected}
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </TableCell>
            )}
            {cols.map((key, i) => {
              if (excloudedFields.includes(key.name)) return;
              return (
                <TableCell
                  sx={{ fontSize: '12px' }}
                  key={i + key}
                  // component="th"
                  id={labelId}
                  scope="row"
                >
                  <div style={fillRequiredField(row, key)}>
                    {key?.options
                      ? key?.options.find((p) => p.value === row[key.name])
                          ?.label
                      : row[key.name] || ''}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {!data.length && (
        <TableRow key={0}>
          <TableCell>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              {noRecordsFoundText}
            </Box>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default MultyTableBody;
