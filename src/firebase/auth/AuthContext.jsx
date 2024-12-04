import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Usuário logado:', currentUser);
        setUser(currentUser);
      } else {
        console.log('Usuário não logado');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);  // Chama o Firebase para deslogar o usuário
      console.log("Usuário deslogado com sucesso.");
      setUser(null);  // Atualiza o estado local
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const value = { user, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
