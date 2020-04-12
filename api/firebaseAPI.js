import * as firebase from "firebase/app";
import "@firebase/firestore";
import "firebase/auth";
import { login } from "../features/auth/authSlice";
import store from "../store";

export const firebaseConfig = {
  apiKey: "AIzaSyCDAJ7I-6e-Z2Pfe5i1XPeMh6zrMZxa3C0",
  authDomain: "comoon-app.firebaseapp.com",
  databaseURL: "https://comoon-app.firebaseio.com",
  projectId: "comoon-app",
  storageBucket: "comoon-app.appspot.com",
  messagingSenderId: "455196192355",
  appId: "1:455196192355:web:cfd8092bdac77186465256",
  measurementId: "G-SB27PTDKVS",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const eventsRef = db.collection("events");

const authentication = firebase.auth();

authentication.onAuthStateChanged((user) => {
  store.dispatch(login(!!user));
});

const checkLoggedIn = async () =>
  new Promise((resolve, reject) => {
    try {
      authentication.onAuthStateChanged(() => resolve());
    } catch (err) {
      reject();
    }
  });

export { firebase, db as default, authentication, checkLoggedIn };

export const getEvent = async (id) => {
  const doc = await eventsRef.doc(id).get();
  return { ...doc.data(), id };
};

// const collectionName = "snack-SJucFknGX";

// class Fire {
//   constructor() {
// Initialize firebase

// // Some nonsense...
// firebase.firestore().settings({ timestampsInSnapshots: true });

// // Listen for auth
// firebase.auth().onAuthStateChanged(async user => {
//   if (!user) {
//     await firebase.auth().signInAnonymously();
//   }
// });
// }

//   // Download Data
//   getPaged = async ({ size, start }) => {
//     let ref = this.collection.orderBy("timestamp", "desc").limit(size);
//     try {
//       if (start) {
//         ref = ref.startAfter(start);
//       }

//       const querySnapshot = await ref.get();
//       const data = [];
//       querySnapshot.forEach(function(doc) {
//         if (doc.exists) {
//           const post = doc.data() || {};

//           // Reduce the name
//           const user = post.user || {};

//           const name = user.deviceName;
//           const reduced = {
//             key: doc.id,
//             name: (name || "Secret Duck").trim(),
//             ...post
//           };
//           data.push(reduced);
//         }
//       });

//       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//       return { data, cursor: lastVisible };
//     } catch ({ message }) {
//       alert(message);
//     }
//   };

//   // Upload Data
//   uploadPhotoAsync = async uri => {
//     const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
//     return uploadPhoto(uri, path);
//   };

//   post = async ({ text, image: localUri }) => {
//     try {
//       const { uri: reducedImage, width, height } = await shrinkImageAsync(
//         localUri
//       );

//       const remoteUri = await this.uploadPhotoAsync(reducedImage);
//       this.collection.add({
//         text,
//         uid: this.uid,
//         timestamp: this.timestamp,
//         imageWidth: width,
//         imageHeight: height,
//         image: remoteUri,
//         user: getUserInfo()
//       });
//     } catch ({ message }) {
//       alert(message);
//     }
//   };

// Helpers
//   get collection() {
//     return firebase.firestore().collection(collectionName);
//   }
//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }
//   get timestamp() {
//     return Date.now();
//   }
// }
