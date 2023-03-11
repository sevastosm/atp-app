import { TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
import { object } from 'prop-types';
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
    handleDelete
  } = useContext(TableContext);
  return (
    <TableBody>
      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
rows.sort(getComparator(order, orderBy)).slice() */}
      {stableSort(data, getComparator(order, orderBy))
        .filter((row: any) =>
          row.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row: any, index) => {
          const isItemSelected = isSelected(row.name);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              onClick={(event) => handleClick(event, row.name, row)}
              // role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.name}
              selected={isItemSelected}
            >
              {withSelect && (
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </TableCell>
              )}
              {Object.keys(row).map((key, i) => {
                if (excloudedFields.includes(key)) return;
                return (
                  <TableCell
                    key={i + key}
                    // component="th"
                    id={labelId}
                    scope="row"
                  >
                    {row[key]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default MultyTableBody;
