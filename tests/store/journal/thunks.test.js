import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe("Pruebas en Journal Thunks", () => {
  const uid = "TEST-UID";
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  afterEach(async () => {
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const { docs } = await getDocs(collectionRef);
    await Promise.all(docs.map((doc) => deleteDoc(doc.ref)));
  });

  test("startNewNote debe crear una nueva nota en blanco", async () => {
    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );

    //Borrar de firebase los datos de testing
    //se utiliza el afterEach que esta definido arriba

    // const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    // const { docs } = await getDocs(collectionRef);

    // // console.log(docs);

    // const deletePromises = [];
    // docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    // await Promise.all(deletePromises);
  });
});
