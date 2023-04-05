import React, { FC, useState, createContext, useReducer } from 'react';
type AppContext = {
  selectedRow: any;
  setSelectedRow: any;
  users: any;
  nutritions: any;
};

import { users } from 'src/mocks/users';
import nutritionReducer from './reducer';

const initialBoxes = [];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NutritionContext = createContext<any>({});
export const NutritionContextProvider: FC = ({ children }) => {
  const [boxes, dispatch] = useReducer(nutritionReducer, initialBoxes);
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
  const [selectedRow, setSelectedRow] = useState(users[0]);
  const [customers, setUsers] = useState(users);
  const [nutritions, setNutritions] = useState(null);
  const [activeUser, setActiveUser] = useState(users[0]);

  console.log('boxes', boxes);

  return (
    <NutritionContext.Provider
      value={{
        boxes,
        handleAddBox,
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
