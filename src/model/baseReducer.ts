/** @module Model:base */

import { combineReducers } from 'redux';
import { AppState } from '../type';
import { brightSignsStateReducer } from './brightSignsState';
import { brightWallAttributesReducer } from './brightWallAttributes';


// -----------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------

// none

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const appStateModelReducer = combineReducers<AppState>({
  brightSigns: brightSignsStateReducer,
  brightWallAttributes: brightWallAttributesReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------
