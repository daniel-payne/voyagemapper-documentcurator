import { Reducer, combineReducers} from 'redux';
// import { OpaqueToken }             from '@angular/core';

import {IDocumentsState, initialDocumentsState, documentsReducer} from './reducers/documents-reducer';

// export const AppStore = new OpaqueToken('App.store');


export interface IApplicationState {
    documents: IDocumentsState;
};

export const initialState = {
    documents: initialDocumentsState
}

export const rootReducer: Reducer<IApplicationState> = combineReducers<IApplicationState>({
    documents: documentsReducer
});

