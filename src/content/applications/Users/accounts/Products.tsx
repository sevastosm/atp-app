import { Container, Grid, SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { deleteProduct, fetchProducts, postProduct } from 'src/api/products';
import MultyTable from 'src/components/multyTable';
import TableContext from 'src/components/multyTable/TableContext';
import { AppContext } from 'src/context/AppContext';
import {
  productFilters,
  products2,
  productCategories
} from 'src/mocks/products';

const cols = [
  { name: 'name', label: 'Προιον', width: '300', required: true },
  { name: 'by', label: 'Ανα' },
  { name: 'energy', label: 'Ενέργεια (kcal)' },
  { name: 'fat', label: 'Λιπαρά (kcal)' },
  { name: 'saturated_fat', label: 'Κορεσμένα (γρ.)' },
  { name: 'carbs', label: 'Υδατάνθρακες (γρ.)' },
  { name: 'sugar', label: 'Σάκχαρα (γρ.)' },
  { name: 'edible', label: 'Εδώδιμες ίνες  (γρ.)' },
  { name: 'protein', label: 'Πρωτεϊνη (γρ.))' },
  { name: 'salt', label: 'Αλάτι (γρ.)' },
  { name: 'category', label: 'Κωδικός -Κατηγοριας', required: true }
];

const getCategoryName = (data) =>
  productCategories.find((p) => p.value === data);

const filters = [
  {
    name: 'ΚΑΤΗΓΟΡΙΕΣ',
    column: 'category',
    values: productCategories.map((p) => {
      return { ...p, value: p.label };
    })
  }
];

export default function Products() {
  const { setProducts, products, setMessage } = React.useContext(AppContext);
  const { rows } = useContext(TableContext);

  const getProducts = async () => {
    await fetchProducts().then((resp: any) => {
      setProducts(resp.data);
    });
  };

  const handleDelete = async (row) => {
    await deleteProduct(row._id).then((resp) => {
      console.log('RESP', resp);
      setProducts(resp.data);
    });
  };

  const handleSave = async (data) => {
    await postProduct(data, setMessage, data._id || null).then((resp) => {
      setProducts(resp.data.products);
    });
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  if (!products) return null;

  const getData: any = (data) => {
    // const tableDAta = getData();
  };

  const data = products.map((p) => {
    return { ...p, category: getCategoryName(p.category)?.label };
  });

  return (
    <Container maxWidth={false}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <MultyTable
            withSelect={false}
            data={data}
            title="ΤΡΟΦΙΜΑ"
            cols={cols}
            onDataChange={getData}
            filters={filters}
            excloudedFields={['_id']}
            onRecordDelete={handleDelete}
            onRecordSave={handleSave}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
