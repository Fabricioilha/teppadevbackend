import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const verificaId = async (id: string) => {
    const docRef = doc(db, "filmes", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.data()) {
        return true
    }
    return false
}


