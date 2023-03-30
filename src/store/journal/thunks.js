import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

//cuando tengo que despachar tareas asincronas
export const startNewNote = () => {
  return async (dispatch, getState) => {
    // console.log(getState());
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error("El UID del usuario no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    //se remueve el id para que no se vuelva a generar
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    //referencia al documento que quiero actualizar
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    //db de firebase
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    //bloquea los botones
    dispatch(setSaving());

    //subir archivos
    // await fileUpload(files[0]);
    const fileUploadpromises = [];
    for (let file of files) {
      fileUploadpromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadpromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};
export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    //referencia al documento
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    //eliminar nota
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
