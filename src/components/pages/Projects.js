import Message from "../layout/Message"
import Loading from "../layout/Loading"
import LinkButton2 from "../layout/LinkButton2"
import ProjectCard from "../project/ProjectCard"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './Projects.module.css'

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const navigate = useNavigate();

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [])

    function removeProject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                navigate('/projects', { state: { message: 'Projeto excluído com sucesso!' } });

            })
            .catch(err => console.log(err))
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
                            budget={project.budget}
                            category={project.category.name}
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
    )
}

export default Projects