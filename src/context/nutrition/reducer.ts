export default function nutritionReducer(store, action) {
  switch (action.type) {
    case 'added': {
      return {
        ...store,
        boxes: [...store.boxes, action.box.boxes]
      };
    }
    case 'ADD_DATE': {
      return {
        ...store,
        duration: { ...action.payload }
      };
    }
    // case 'added': {
    //   return [...boxes, {
    //            boxes: action.box.boxes
    //   }];
    // }
    case 'changed': {
      return store.boxes.map((t, i) => {
        if (i === action.index) {
          return action.task;
        } else {
          return t;
        }
      });
    }
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
