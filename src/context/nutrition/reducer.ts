export default function nutritionReducer(boxes, action) {
  switch (action.type) {
    case 'added': {
      return [...boxes, {
               boxes: action.box.boxes
      }];
    }
    case 'changed': {
      return boxes.map((t,i) => {
        if (i === action.index) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return boxes.filter((box )=> box!== action.box);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


