import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCeZZVSB_ytaBslBZFFHbf7BuOpwtwEE6Y",
    authDomain: "tcc-clarisse-douglas.firebaseapp.com",
    projectId: "tcc-clarisse-douglas",
    storageBucket: "tcc-clarisse-douglas.appspot.com",
    messagingSenderId: "342467040720",
    appId: "1:342467040720:web:c98b8cbc29c4d315c715d5",
    measurementId: "G-Y16K1DHD4Z"
};

export const app = initializeApp(firebaseConfig);
