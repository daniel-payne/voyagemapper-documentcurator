import { Reducer, Action,  ActionCreator } from 'redux';

// Actions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LOAD_UNCURATED = 'LOAD_DOCUMENTS';
export const loadUncurated: ActionCreator<Action> = (payload) => ({
  type:     LOAD_UNCURATED,
  payload:  payload
});

const LOAD_FACTS = 'LOAD_FACTS';
export const loadFacts: ActionCreator<Action> = (payload, target) => ({
  type:     LOAD_FACTS,
  target:   target,
  payload:  payload
});

const UPDATE_FACTS = 'UPDATE_FACTS';
export const updateFacts: ActionCreator<Action> = (payload) => ({
  type:     UPDATE_FACTS,
  payload:  payload
});

 

// Interfaces /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IDocument {
  documentId: number;
  title:      string;

  [propName: string]: any;
}

export interface IDocumentsState {
  count:            number;
  uncurated:        IDocument[];
  selectedDocument: IDocument | any;
};

export const initialDocumentsState: IDocumentsState = {
  count:             0,
  uncurated:         [],
  selectedDocument:  {}
};

// Reducer ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function processUncurated(state: IDocumentsState, newUncurated: any ): IDocumentsState {
  return Object.assign({}, state, { uncurated: newUncurated });
}

function processFacts(state: IDocumentsState, newFacts: any, oldDocument: any ): IDocumentsState {

  let oldUncurated  = state.uncurated;

  let documentIndex = oldUncurated.indexOf(oldDocument);

  let newDocument   = Object.assign( {}, oldDocument, {facts: newFacts} );
  let newUncurated  = [ ...oldUncurated.slice(0, documentIndex), newDocument, ...oldUncurated.slice(documentIndex + 1) ];

  return Object.assign({}, state, { uncurated: newUncurated, selectedDocument: newDocument });
}

function processFactUpdates(state: IDocumentsState, updatedFacts: any ): IDocumentsState {

  return state;

}

export const riskReducer: Reducer<IDocumentsState> =
  (state: IDocumentsState = initialDocumentsState, action: any): IDocumentsState => {

    let newState = Object.assign({}, state, {count: state.count + 1});

    switch (action.type) {

      case LOAD_UNCURATED:        return processUncurated(   newState, action.payload                );
      case LOAD_FACTS:            return processFacts(       newState, action.payload, action.target );
      case UPDATE_FACTS:          return processFactUpdates( newState, action.payload                );

      default:                    return newState;

    }
  };