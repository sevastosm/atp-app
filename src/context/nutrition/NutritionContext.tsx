import React, { FC, useState, createContext, useReducer } from 'react';

import { users } from 'src/mocks/users';
import nutritionReducer from './reducer';

const initialStore = {
  userId: null,
  duration: {
    from: null,
    to: null
  },
  boxes: [{ name: '', data: [] }]
};

const initialBoxes = [];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NutritionContext = createContext<any>({});
export const NutritionContextProvider: FC = ({ children }) => {
  const [store, dispatch] = useReducer(nutritionReducer, initialStore);
  const [selectedBox, setSelectedBox] = useState(null);

  function handleAddBox(data) {
    dispatch({
      type: 'added',
      box: data
    });
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
  const [selectedRow, setSelectedRow] = useState(users[0]);
  const [customers, setUsers] = useState(users);
  const [nutritions, setNutritions] = useState(null);
  const [activeUser, setActiveUser] = useState(users[0]);

  return (
    <NutritionContext.Provider
      value={{
        store,
        handleAddBox,
        handleAddDuration,
        dispatch,
        handleDeleteBox,
        selectedBox,
        setSelectedBox
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};
