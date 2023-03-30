import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";

export const useChechAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;

      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(startLoadingNotes());
    });
  }, []);

  return {
    status,
  };
};
