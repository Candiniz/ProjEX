// src/firebase/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set, get, child, remove } from 'firebase/database';

// Configuração do Firebase - use as credenciais que você já copiou
const firebaseConfig = {
  apiKey: "AIzaSyB0q0WaQ6ovb3lpInUSoBi-uLYuYNkKCW8",
  authDomain: "projex-3413c.firebaseapp.com",
  projectId: "projex-3413c",
  storageBucket: "projex-3413c.firebasestorage.app",
  messagingSenderId: "453851505864",
  appId: "1:453851505864:web:010651af581be7778471fd",
  measurementId: "G-1B8NRRBC9M"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Obter uma instância do Firebase Realtime Database
const database = getDatabase(app);

// Funções auxiliares para gravar e ler dados
const writeData = (path, data) => {
  return set(ref(database, path), data)  // Retorna a Promise do set do Firebase
      .then(() => {
          // Ação que deve ser realizada após a escrita com sucesso
          console.log("Dados gravados com sucesso!");
          return true;  // Pode retornar um valor ou true para indicar sucesso
      })
      .catch((error) => {
          // Captura qualquer erro na operação de gravação
          console.error("Erro ao gravar dados:", error);
          throw error;  // Lança o erro novamente para ser tratado no lugar onde a função é chamada
      });
};


const readData = (path) => {
    const dbRef = ref(database);
    return get(child(dbRef, path))  // Obtém os dados do Firebase usando o caminho
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();  // Retorna os dados se existirem
            } else {
                throw new Error("Projeto não encontrado!");  // Caso o projeto não exista
            }
        })
        .catch((error) => {
            console.error("Erro ao ler dados:", error);
            throw error;  // Propaga o erro
        });
};

const removeData = (path) => {
  const db = getDatabase();  // Obtenha a instância do banco de dados
  const dbRef = ref(db, path);  // Referência para o caminho desejado
  return remove(dbRef)  // Remove o nó
      .then(() => {
          console.log('Dados removidos com sucesso!');
      })
      .catch((error) => {
          console.error('Erro ao remover dados:', error);
      });
};


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export { writeData, readData, database, remove, removeData, ref };

export default app