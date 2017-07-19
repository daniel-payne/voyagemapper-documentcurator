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
export interface IFact {
  factId:     number;
  documentId: number;

  [propName: string]: any;
}

export interface IDocument {
  documentId:         number;
  documentTitle:      string;

  facts?:             IFact[];

  [propName: string]: any;
}

export interface IDocumentsState {
  count:            number;
  documents:        IDocument[];
  selectedDocument: IDocument | any;
};

export const initialDocumentsState: IDocumentsState = {
  count:             0,
  documents:         [],
  selectedDocument:  {}
};

// Helpers ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function replaceSelectedDocumentIn(state: IDocumentsState, newDocument: IDocument): IDocumentsState {

  let newState = Object.assign({}, state, { selectedDocument: newDocument });

  return newState;
}

function replaceDocumentIn(state: IDocumentsState, newDocument: IDocument): IDocumentsState {

  let oldDocuments  = state.documents;

  let documentIndex = oldDocuments.findIndex( item => item.documentId === newDocument.documentId);

  let newDocuments  = [ ...oldDocuments.slice(0, documentIndex), newDocument, ...oldDocuments.slice(documentIndex + 1) ];

  let newState = Object.assign({}, state, { documents: newDocuments });

  return newState;
}

function replaceAllDocumentsIn(state: IDocumentsState, newDocuments: IDocument): IDocumentsState {

  let newState = Object.assign({}, state, { documents: newDocuments });

  return newState;
}

function replaceAllFactsIn(oldDocument: IDocument, newFacts: any): IDocument {

  let newDocument   = Object.assign( {}, oldDocument, {facts: newFacts} );

  return newDocument;
}

function replaceFactIn(oldDocument: IDocument, newFact: any): IDocument {

  let oldFacts  = oldDocument.facts;

  let factIndex = oldFacts.findIndex( item => item.factId === newFact.factId);

  let newFacts  = [ ...oldFacts.slice(0, factIndex), newFact, ...oldFacts.slice(factIndex + 1) ];

  let newDocument = Object.assign({}, oldDocument, { facts: newFacts });

  return newDocument;
}

// Processes ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function processLoadDocuments(oldState: IDocumentsState, newDocuments: any ): IDocumentsState {
  return replaceAllDocumentsIn(oldState, newDocuments);
}

function processLoadFacts(oldState: IDocumentsState, newFacts: any, oldDocument: any ): IDocumentsState {

  let newState      = oldState;
  let newDocument   = oldDocument;

  newDocument = replaceAllFactsIn(oldDocument, newFacts);

  newState    = replaceDocumentIn(        newState, newDocument);
  newState    = replaceSelectedDocumentIn(newState, newDocument);

  return newState;

}

function processFactUpdates(oldState: IDocumentsState, updatedFacts: any ): IDocumentsState {

  let newState = oldState;

  updatedFacts.forEach( item => {

    let oldDocuments  = newState.documents;

    let oldDocument   = oldDocuments.find( match => match.documentId === item.documentId);

    let newDocument   = replaceFactIn(oldDocument, item);

    if (newState.selectedDocument && newState.selectedDocument.documentId === item.documentId){
      newState = replaceSelectedDocumentIn(newState, newDocument);
    }

    newState = replaceDocumentIn(newState, newDocument);

  });

  return newState;

}

// Reducer ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const riskReducer: Reducer<IDocumentsState> =
  (state: IDocumentsState = initialDocumentsState, action: any): IDocumentsState => {

    let newState = Object.assign({}, state, {count: state.count + 1});

    switch (action.type) {

      case LOAD_UNCURATED:        return processLoadDocuments(   newState, action.payload                );
      case LOAD_FACTS:            return processLoadFacts(       newState, action.payload, action.target );
      case UPDATE_FACTS:          return processFactUpdates(     newState, action.payload                );

      default:                    return newState;

    }
  };
