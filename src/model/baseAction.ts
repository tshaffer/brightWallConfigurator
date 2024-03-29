/** @module Model:base */

import {
  Action,
  // Dispatch,
  // ActionCreator,
} from 'redux';

// -----------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------

/** @internal */
/** @private */
interface BrightWallModelBaseAction extends Action {
  type: string;   // override Any - must be a string
  payload: unknown;
  error?: boolean;
  meta?: {};
}

/** @internal */
/** @private */
export interface BrightWallModelAction<T> extends BrightWallModelBaseAction {
  type: string;
  payload: T;
  error?: boolean;
  meta?: {};
}
