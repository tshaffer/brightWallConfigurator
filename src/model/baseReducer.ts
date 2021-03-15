/** @module Model:base */

import {
  combineReducers
} from 'redux';
import { BrightSignState } from '../type';
import { appAttributesReducer } from './appAttributes';
import { 
  brightSignAttributesReducer, 
 } from './brightSignAttributes';
 import { 
  brightWallConfigurationReducer
 } from './brightWallConfiguration';
// -----------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------

// none

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const brightWallModelReducer = combineReducers<BrightSignState>({
  appAttributes: appAttributesReducer,
  brightSignAttributes: brightSignAttributesReducer,
  brightWallConfiguration: brightWallConfigurationReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------
