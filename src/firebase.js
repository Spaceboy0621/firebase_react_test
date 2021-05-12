import firebase from "firebase/app"
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true}

const firebaseConfig = {
    apiKey: "AIzaSyCvrBiUcuYld3AluBRMKbmly_9TQev6_Co",
    authDomain: "mythical-ember-309714.firebaseapp.com",
    projectId: "mythical-ember-309714",
    storageBucket: "mythical-ember-309714.appspot.com",
    messagingSenderId: "1086283057564",
    appId: "1:1086283057564:web:830acd2284b3d49c652059",
    measurementId: "G-9PPBMBCWMB"
}

firebase.initializeApp(firebaseConfig)
export default firebase