import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase";

export const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (error) {
    throw error;
  }
};
