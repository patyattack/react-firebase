import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Configurar firestore

const firebaseConfig = {
    apiKey: "AIzaSyCm4-RHPhl1IN89le5Dcu38xX7V4eIhZng",
    authDomain: "talleres-8ba05.firebaseapp.com",
    databaseURL: "https://talleres-8ba05.firebaseio.com",
    projectId: "talleres-8ba05",
    storageBucket: "talleres-8ba05.appspot.com",
    messagingSenderId: "907297384448",
    appId: "1:907297384448:web:6c71c0eba22a6f353750e5"
}

// inicializar firebase

firebase.initializeApp(firebaseConfig);

// configuracion de react-redux

const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

// state inicial
const initialState = {};

// Create store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;