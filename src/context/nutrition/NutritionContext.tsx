import React, { FC, useState, createContext, useReducer } from 'react';
import { addDiet } from 'src/api/users';

import { users } from 'src/mocks/users';
import { AppContext } from '../AppContext';
import nutritionReducer from './reducer';

const initialBoxes = [];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NutritionContext = createContext<any>({});
export const NutritionContextProvider: FC = ({ children }) => {
  const initialStore = {
    duration: {
      from: null,
      to: null
    },
    caloriesLimit: '',
    boxes: [{ name: '', data: [] }]
  };
  const [store, dispatch] = useReducer(nutritionReducer, initialStore);
  const [selectedBox, setSelectedBox] = useState(null);

  const { selectedRow, setMessage, setUsers, setSelectedRow } =
    React.useContext(AppContext);

  function handleSetStore(data) {
    dispatch({
      type: 'set',
      payload: data
    });
  }

  function handleAddNewNutririon() {
    dispatch({
      type: 'new',
      payload: initialStore
    });
  }

  function handleAddBox(data) {
    dispatch({
      type: 'added',
      payload: data
    });
  }
  function handleSaveBox(data, index) {
    dispatch({
      type: 'save',
      payload: data,
      index: index
    });
    console.log('handleSaveBox', store);
  }

  function handleDeleteBox(data) {
    dispatch({
      type: 'deleted',
      box: data
    });
  }

  function handleAddDuration(data) {
    dispatch({
      type: 'ADD_DATE',
      payload: data
    });
  }

  function saveBoxName(name) {
    dispatch({
      type: 'ADD_NAME',
      payload: name
    });
  }

  function handleAddLimit(e) {
    dispatch({
      type: 'addLimit',
      payload: e.target.value
    });
  }
  const handleSaveAll = () => {
    addDiet(store, setMessage, selectedRow._id, store._id).then(
      (response: any) => {
        setSelectedRow(response.data.user);
        setUsers(response.data.users);
      }
    );
  };

  console.log('NUTRITION_STORE', store);
  console.log('SELECTED_BOX', selectedBox);

  return (
    <NutritionContext.Provider
      value={{
        store,
        handleAddBox,
        handleAddNewNutririon,
        handleAddDuration,
        handleAddLimit,
        handleSetStore,
        dispatch,
        handleDeleteBox,
        selectedBox,
        setSelectedBox,
        saveBoxName,
        handleSaveBox,
        handleSaveAll
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};
