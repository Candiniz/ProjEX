import styles from "./NewProject.module.css";
import ProjectForm from "../project/ProjectForm";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, set } from 'firebase/database';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        const db = getDatabase();
        const projectsRef = ref(db, 'projects');
        const newProjectRef = push(projectsRef);

        set(newProjectRef, {
            ...project,
            id: newProjectRef.key,
            services: [], // Garante que seja inicializado como array vazio
        })
            .then(() => {
                console.log("Projeto criado com sucesso!");
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
            })
            .catch((error) => {
                console.error("Erro ao criar projeto:", error);
            });
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    );
}


export default NewProject;
