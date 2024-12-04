import { useAuth } from "../../firebase/auth/AuthContext";
import { useEffect, useState } from "react";
import { getDatabase, ref, push, set, get } from "firebase/database";
import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";
import { useNavigate } from "react-router-dom";

function NewProject() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Pega o usuário logado do contexto
    const [userName, setUserName] = useState('');  // Esse valor é utilizado para exibição ou outras lógicas

    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUserName(userData.name); // Atualiza o nome do usuário
                }
            });
        }
    }, [user]);

    function createPost(project) {
        const db = getDatabase();
        const projectsRef = ref(db, `users/${user.uid}/projects`); // A criação do projeto não precisa do userName aqui
        const newProjectRef = push(projectsRef);

        set(newProjectRef, {
            ...project,
            id: newProjectRef.key,
            services: [],
        }).then(() => {
            console.log("Projeto criado com sucesso!");
            navigate("/projects");
        }).catch((error) => {
            console.error("Erro ao criar projeto:", error);
        });
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Bem-vindo de volta, {userName}!</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    );
}

export default NewProject;
