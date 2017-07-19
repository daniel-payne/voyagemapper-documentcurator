import { Reducer, combineReducers} from 'redux';
// import { OpaqueToken }             from '@angular/core';

import {IDocumentsState, initialDocumentsState, riskReducer} from '../reducers/risk-reducer';

// export const AppStore = new OpaqueToken('App.store');


export interface IApplicationState {
    risk: IDocumentsState;
};

export const initialState = {
    risk: initialDocumentsState
}

export const rootReducer: Reducer<IApplicationState> = combineReducers<IApplicationState>({
    risk: riskReducer
});

