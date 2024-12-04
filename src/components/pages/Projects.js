import Message from "../layout/Message";
import Loading from "../layout/Loading";
import LinkButton2 from "../layout/LinkButton2";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Importando funções auxiliares e o banco de dados
import { readData, removeData } from "../../firebase/firebase"
import styles from "./Projects.module.css";

export function formatToBrazilianCurrency(value) {
    if (value !== undefined && value !== null) {
        const numericValue = parseFloat(value);
        
        if (!isNaN(numericValue)) {
            return numericValue.toFixed(2).replace('.', ',');
        }
    }
    
    return '0,00'; // Retorna um valor padrão caso o valor seja inválido
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    let message = "";
    if (location.state) {
        message = location.state.message;
    }

    // Buscar projetos do Firebase
    useEffect(() => {
        setTimeout(() => {
            readData("projects")
                .then((data) => {
                    setProjects(Object.values(data)); // Converte o objeto em um array
                    setRemoveLoading(true);
                })
                .catch((error) => {
                    console.error("Erro ao buscar projetos:", error);
                    setRemoveLoading(true);
                });
        }, 300);
    }, []);

    function removeProject(id) {
        
        console.log('ID do projeto:', id);
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este projeto?");
    
        if (confirmDelete) {
            // Exclui o projeto no Firebase
            removeData(`projects/${id}`)
                .then(() => {
                    console.log("Projeto excluído com sucesso!");
    
                    // Atualiza o estado local
                    setProjects(prevProjects => prevProjects.filter((project) => project.id !== id));
                    
                    // Atualiza removeLoading para forçar re-renderização
                    setRemoveLoading(true);
    
                    // Redireciona com a mensagem de sucesso
                    navigate("/projects", {
                        state: { message: "Projeto excluído com sucesso!" },
                    });
                })
                .catch((error) => {
                    console.error("Erro ao excluir o projeto:", error);
                });
        } else {
            console.log("Exclusão do projeto cancelada");
        }
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton2 to="/newproject" text="Criar Projeto" />
            </div>

            {message && <Message type="success" msg={message} />}

            <div className={styles.projectsDiv}>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={formatToBrazilianCurrency(project.budget)}
                            category={project.category?.name || "Categoria desconhecida"}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p className={styles.projectsDiv_p}>Não há projetos cadastrados.</p>
                )}
            </div>
        </div>
    );
}

export default Projects;
