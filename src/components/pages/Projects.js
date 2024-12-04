import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { readData, removeData } from "../../firebase/firebase";
import styles from "./Projects.module.css";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import LinkButton2 from "../layout/LinkButton2";
import ProjectCard from "../project/ProjectCard";
import { motion } from "framer-motion";

export function formatToBrazilianCurrency(value) {
    if (value !== undefined && value !== null) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            return numericValue.toFixed(2).replace(".", ",");
        }
    }
    return "0,00"; // Retorna um valor padrão caso o valor seja inválido
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("Usuário não está logado.");
            navigate("/login");
            return;
        }

        setTimeout(() => {
            // Agora, a URL usa o nome do usuário
            readData(`users/${user.uid}/projects`)
                .then((data) => {
                    setProjects(Object.values(data || {}));
                })
                .catch((error) => {
                    console.error("Erro ao buscar projetos:", error);
                })
                .finally(() => {
                    setRemoveLoading(true);
                });
        }, 300);

        if (location.state?.message) {
            setMessage(location.state.message);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, location.pathname, navigate]);

    function removeProject(id) {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este projeto?");
        if (confirmDelete) {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.error("Usuário não autenticado.");
                return;
            }

            removeData(`users/${user.uid}/projects/${id}`)
                .then(() => {
                    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
                    navigate("/projects", {
                        state: { message: "Projeto excluído com sucesso!" },
                    });
                })
                .catch((error) => {
                    console.error("Erro ao excluir o projeto:", error);
                });
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
                    projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 14,
                                delay: index * 0.2,
                            }}
                        >
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                budget={formatToBrazilianCurrency(project.budget)}
                                category={project.category?.name || "Categoria desconhecida"}
                                handleRemove={removeProject}
                            />
                        </motion.div>
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
