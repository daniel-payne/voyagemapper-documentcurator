import { Reducer, Action,  ActionCreator } from 'redux';

// Actions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LOAD_UNCURATED = 'LOAD_UNCURATED';
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

const UPDATE_FACT_CATEGORY = 'UPDATE_FACT_CATEGORY';
export const updateFactCategory: ActionCreator<Action> = (payload, target) => ({
  type:     UPDATE_FACT_CATEGORY,
  target:   target,
  payload:  payload
});

const UPDATE_FACT_TEXT = 'UPDATE_FACT_TEXT';
export const updateFactText: ActionCreator<Action> = (payload, target) => ({
  type:     UPDATE_FACT_TEXT,
  target:   target,
  payload:  payload
});

// Interfaces /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IDocument {
  documentId: number;
  title:      string;

  [propName: string]: any;
}

export interface IDocumentsState {
  count:            number,
  uncurated:        IDocument[];
  selected:         IDocument | any;
};

export const initialDocumentsState: IDocumentsState = {
  count:     0,
  uncurated: [],
  selected:  {}
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

  return Object.assign({}, state, { uncurated: newUncurated, selected: newDocument });
}

function processFactCategory(state: IDocumentsState, newCategory: any, oldFact: any ): IDocumentsState {

  let oldUncurated  = state.uncurated;
  let oldDocument   = oldUncurated.find( item => item.documentId === oldFact.documentId ) as any;
  let oldFacts      = oldDocument.facts;

  let factIndex     = oldFacts.indexOf(oldFact);
  let documentIndex = oldUncurated.indexOf(oldDocument);

  let newFact       = Object.assign({}, oldFact, { factCategory: newCategory });
  let newFacts      = [ ...oldFacts.slice(0, factIndex), newFact, ...oldFacts.slice(factIndex + 1) ];
  let newDocument   = Object.assign({}, oldDocument, {facts: newFacts });

  let newUncurated  = [ ...oldUncurated.slice(0, documentIndex), newDocument, ...oldUncurated.slice(documentIndex + 1) ];

  return Object.assign({}, state, { uncurated: newUncurated, selected: newDocument });

}


function processFactText(state: IDocumentsState, newText: any, oldFact: any ): IDocumentsState {

  let oldUncurated  = state.uncurated;
  let oldDocument   = oldUncurated.find( item => item.documentId === oldFact.documentId ) as any;
  let oldFacts      = oldDocument.facts;

  let factIndex     = oldFacts.indexOf(oldFact);
  let documentIndex = oldUncurated.indexOf(oldDocument);

  let newFact       = Object.assign({}, oldFact, { displayText: newText });
  let newFacts      = [ ...oldFacts.slice(0, factIndex), newFact, ...oldFacts.slice(factIndex + 1) ];
  let newDocument   = Object.assign({}, oldDocument, {facts: newFacts });

  let newUncurated  = [ ...oldUncurated.slice(0, documentIndex), newDocument, ...oldUncurated.slice(documentIndex + 1) ];

  return Object.assign({}, state, { uncurated: newUncurated, selected: newDocument });

}

export const documentsReducer: Reducer<IDocumentsState> =
  (state: IDocumentsState = initialDocumentsState, action: any): IDocumentsState => {

    let newState = Object.assign({}, state, {count: state.count + 1});

    switch (action.type) {

      case LOAD_UNCURATED:        return processUncurated(   newState, action.payload );
      case LOAD_FACTS:            return processFacts(       newState, action.payload, action.target );
      case UPDATE_FACT_CATEGORY:  return processFactCategory(newState, action.payload, action.target );
      case UPDATE_FACT_TEXT:      return processFactText(    newState, action.payload, action.target );

      default:                    return newState;

    }
  };