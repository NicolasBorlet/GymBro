import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzVffLYY5Aw-JEJV-WXZGHsp3tQ_saIok",
  authDomain: "gymbro-78d15.firebaseapp.com",
  projectId: "gymbro-78d15",
  storageBucket: "gymbro-78d15.appspot.com",
  messagingSenderId: "255441591946",
  appId: "1:255441591946:web:f8eebb297f8373da0c5773",
  measurementId: "G-KBBMGHJQQ0",
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const app = getApp();
const storage = getStorage(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { storage, db, auth, app as default };
