import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./firebase";

export const signup = async (email, password, name) => {
  // প্রথমে user create করুন
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // তারপর profile update করে name সেভ করুন
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential;
};

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const sendPasswordReset = async (email) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

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
