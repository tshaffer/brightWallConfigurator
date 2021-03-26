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
  action: SetIsMasterAction & SetRowIndexAction & SetColumnIndexAction & SetNumRowsAction & SetNumColumnsAction,
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
    default:
      return state;
  }
};


