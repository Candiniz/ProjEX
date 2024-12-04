import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebase";

const auth = getAuth(app);
const db = getFirestore();

// Função de Registro
export const registerUser = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Salvar o nome do usuário no Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
  });

  return user;
};

// Função de Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Função de Logout
export const logoutUser = () => {
  return signOut(auth);
};
