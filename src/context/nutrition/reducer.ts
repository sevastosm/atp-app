export default function nutritionReducer(store, action) {
  switch (action.type) {
    case 'set': {
      return {
        ...action.payload
      };
    }
    case 'added': {
      return {
        ...store,
        boxes: [...store.boxes, action.payload]
      };
    }
    case 'save': {
      return {
        ...store,
        boxes: store.boxes.map((t, i) => {
          if (i === action.index) {
            return action.payload;
          } else {
            return t;
          }
        })
      };
    }
    case 'ADD_DATE': {
      return {
        ...store,
        duration: { ...action.payload }
      };
    }
    // case 'ADD_NAME': {
    //   return [
    //     ...store,
    //     {
    //       boxes: action.box.boxes
    //     }
    //   ];
    // }
    // case 'changed': {
    //   return store.boxes.map((t, i) => {
    //     if (i === action.index) {
    //       return action.payload;
    //     } else {
    //       return t;
    //     }
    //   });
    // }
    case 'deleted': {
      return {
        ...store,
        boxes: [...store.boxes.filter((box) => box !== action.box)]
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
