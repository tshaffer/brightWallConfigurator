import { BrightWallModelAction } from './baseAction';
import { BrightWallConfiguration, BezelMeasureByType } from '../type';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_IS_MASTER = 'SET_IS_MASTER';
export const SET_ROW_INDEX = 'SET_ROW_INDEX';
export const SET_COLUMN_INDEX = 'SET_COLUMN_INDEX';
export const SET_NUM_ROWS = 'SET_NUM_ROWS';
export const SET_NUM_COLUMNS = 'SET_NUM_COLUMNS';
export const SET_BEZEL_MEASURE_BY_TYPE = 'SET_BEZEL_MEASURE_BY_TYPE';
export const SET_BEZEL_WIDTH_PERCENTAGE = 'SET_BEZEL_WIDTH_PERCENTAGE';
export const SET_BEZEL_HEIGHT_PERCENTAGE = 'SET_BEZEL_HEIGHT_PERCENTAGE';
export const SET_BEZEL_WIDTH = 'SET_BEZEL_WIDTH';
export const SET_BEZEL_HEIGHT = 'SET_BEZEL_HEIGHT';
export const SET_BEZEL_SCREEN_WIDTH = 'SET_BEZEL_SCREEN_WIDTH';
export const SET_BEZEL_SCREEN_HEIGHT = 'SET_BEZEL_SCREEN_HEIGHT';

// ------------------------------------
// Actions
// ------------------------------------
export interface SetIsMasterPayload {
  isMaster: boolean;
}
type SetIsMasterAction = BrightWallModelAction<SetIsMasterPayload>;

export const setIsMaster = (
  isMaster: boolean,
): SetIsMasterAction => {
  return {
    type: SET_IS_MASTER,
    payload: {
      isMaster,
    },
  };
};

export interface SetRowIndexPayload {
  rowIndex: number;
}
type SetRowIndexAction = BrightWallModelAction<SetRowIndexPayload>;

export const setRowIndex = (
  rowIndex: number,
): SetRowIndexAction => {
  return {
    type: SET_ROW_INDEX,
    payload: {
      rowIndex,
    },
  };
};

export interface SetColumnIndexPayload {
  columnIndex: number;
}
type SetColumnIndexAction = BrightWallModelAction<SetColumnIndexPayload>;

export const setColumnIndex = (
  columnIndex: number,
): SetColumnIndexAction => {
  return {
    type: SET_COLUMN_INDEX,
    payload: {
      columnIndex,
    },
  };
};


export interface SetNumRowsPayload {
  numRows: number;
}
type SetNumRowsAction = BrightWallModelAction<SetNumRowsPayload>;

export const setNumRows = (
  numRows: number,
): SetNumRowsAction => {
  return {
    type: SET_NUM_ROWS,
    payload: {
      numRows,
    },
  };
};

export interface SetNumColumnsPayload {
  numColumns: number;
}
type SetNumColumnsAction = BrightWallModelAction<SetNumColumnsPayload>;

export const setNumColumns = (
  numColumns: number,
): SetNumColumnsAction => {
  return {
    type: SET_NUM_COLUMNS,
    payload: {
      numColumns,
    },
  };
};

export interface SetBezelMeasureByTypePayload {
  bezelMeasureByType: BezelMeasureByType;
}
type SetBezelMeasureByTypeAction = BrightWallModelAction<SetBezelMeasureByTypePayload>;

export const setBezelMeasureByType = (
  bezelMeasureByType: BezelMeasureByType,
): SetBezelMeasureByTypeAction => {
  return {
    type: SET_BEZEL_MEASURE_BY_TYPE,
    payload: {
      bezelMeasureByType,
    },
  };
};

export interface SetBezelWidthPercentagePayload {
  bezelWidthPercentage: number;
}
type SetBezelWidthPercentageAction = BrightWallModelAction<SetBezelWidthPercentagePayload>;

export const setBezelWidthPercentage = (
  bezelWidthPercentage: number,
): SetBezelWidthPercentageAction => {
  return {
    type: SET_BEZEL_WIDTH_PERCENTAGE,
    payload: {
      bezelWidthPercentage,
    },
  };
};

export interface SetBezelHeightPercentagePayload {
  bezelHeightPercentage: number;
}
type SetBezelHeightPercentageAction = BrightWallModelAction<SetBezelHeightPercentagePayload>;

export const setBezelHeightPercentage = (
  bezelHeightPercentage: number,
): SetBezelHeightPercentageAction => {
  return {
    type: SET_BEZEL_HEIGHT_PERCENTAGE,
    payload: {
      bezelHeightPercentage,
    },
  };
};

export interface SetBezelWidthPayload {
  bezelWidth: number;
}
type SetBezelWidthAction = BrightWallModelAction<SetBezelWidthPayload>;

export const setBezelWidth = (
  bezelWidth: number,
): SetBezelWidthAction => {
  return {
    type: SET_BEZEL_WIDTH,
    payload: {
      bezelWidth,
    },
  };
};

export interface SetBezelHeightPayload {
  bezelHeight: number;
}
type SetBezelHeightAction = BrightWallModelAction<SetBezelHeightPayload>;

export const setBezelHeight = (
  bezelHeight: number,
): SetBezelHeightAction => {
  return {
    type: SET_BEZEL_HEIGHT,
    payload: {
      bezelHeight,
    },
  };
};

export interface SetBezelScreenWidthPayload {
  bezelScreenWidth: number;
}
type SetBezelScreenWidthAction = BrightWallModelAction<SetBezelScreenWidthPayload>;

export const setBezelScreenWidth = (
  bezelScreenWidth: number,
): SetBezelScreenWidthAction => {
  return {
    type: SET_BEZEL_SCREEN_WIDTH,
    payload: {
      bezelScreenWidth,
    },
  };
};

export interface SetBezelScreenHeightPayload {
  bezelScreenHeight: number;
}
type SetBezelScreenHeightAction = BrightWallModelAction<SetBezelScreenHeightPayload>;

export const setBezelScreenHeight = (
  bezelScreenHeight: number,
): SetBezelScreenHeightAction => {
  return {
    type: SET_BEZEL_SCREEN_HEIGHT,
    payload: {
      bezelScreenHeight,
    },
  };
};


// ------------------------------------
// Reducer
// ------------------------------------

const initialState: BrightWallConfiguration = {
  isMaster: false,
  rowIndex: -1,
  columnIndex: -1,
  numRows: -1,
  numColumns: -1,
  bezelMeasureByType: BezelMeasureByType.Measurement,
  bezelWidthPercentage: 0,
  bezelHeightPercentage: 0,
  bezelWidth: 0,
  bezelHeight: 0,
  bezelScreenWidth: 0,
  bezelScreenHeight: 0,
};


export const brightWallConfigurationReducer = (
  state: BrightWallConfiguration = initialState,
  action: SetIsMasterAction & SetRowIndexAction & SetColumnIndexAction & SetNumRowsAction & SetNumColumnsAction & SetBezelMeasureByTypeAction & SetBezelWidthPercentageAction & SetBezelHeightPercentageAction & SetBezelWidthAction & SetBezelHeightAction & SetBezelScreenWidthAction & SetBezelScreenHeightAction,
): BrightWallConfiguration => {
  switch (action.type) {
    case SET_IS_MASTER:
      return {
        ...state,
        isMaster: action.payload.isMaster,
      };
    case SET_ROW_INDEX:
      return {
        ...state,
        rowIndex: action.payload.rowIndex,
      };
      break;
    case SET_COLUMN_INDEX:
      return {
        ...state,
        columnIndex: action.payload.columnIndex,
      };
    case SET_NUM_ROWS:
      return {
        ...state,
        numRows: action.payload.numRows,
      };
    case SET_NUM_COLUMNS:
      return {
        ...state,
        numColumns: action.payload.numColumns,
      };
    case SET_BEZEL_MEASURE_BY_TYPE:
      return {
        ...state,
        bezelMeasureByType: action.payload.bezelMeasureByType,
      };
    case SET_BEZEL_WIDTH_PERCENTAGE:
      return {
        ...state,
        bezelWidthPercentage: action.payload.bezelWidthPercentage,
      };
    case SET_BEZEL_HEIGHT_PERCENTAGE:
      return {
        ...state,
        bezelHeightPercentage: action.payload.bezelHeightPercentage,
      };
    case SET_BEZEL_WIDTH:
      return {
        ...state,
        bezelWidth: action.payload.bezelWidth,
      };
    case SET_BEZEL_HEIGHT:
      return {
        ...state,
        bezelHeight: action.payload.bezelHeight,
      };
    case SET_BEZEL_SCREEN_WIDTH:
      return {
        ...state,
        bezelScreenWidth: action.payload.bezelScreenWidth,
      };
    case SET_BEZEL_SCREEN_HEIGHT:
      return {
        ...state,
        bezelScreenHeight: action.payload.bezelScreenHeight,
      };
    default:
      return state;
  }
};


