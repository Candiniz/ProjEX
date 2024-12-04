import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useAuth } from "../../firebase/auth/AuthContext";

function WelcomeMessage() {
    const { user } = useAuth(); // Pega o usuário autenticado do contexto
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user) {
            // Pega o nome do usuário do Firebase Realtime Database
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUserName(userData.name); // Armazena o nome do usuário no estado
                }
            }).catch((error) => {
                console.error("Erro ao buscar nome do usuário:", error);
            });
        }
    }, [user]); // Sempre que o usuário mudar (logar ou sair)

    return (
        <div>
            {userName ? (
                <h1>Bem-vindo de volta, {userName}!</h1>
            ) : (
                <h1>Bem vindo!</h1>
            )}
        </div>
    );
}

export default WelcomeMessage;
