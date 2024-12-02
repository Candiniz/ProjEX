import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../services/ServiceForm';
import ServiceCard from '../services/ServiceCard'

function Project() {
    const { id } = useParams();

    const [project, setProject] = useState(null) // Inicialize como `null`
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true) // Controle de loading
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        setTimeout(() => {
            fetch(`https://projex-backend.onrender.com/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Corrigi o Content-Type
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setIsLoading(false); // Finaliza o loading após receber os dados
                    setServices(data.services)
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false); // Mesmo em erro, finaliza o loading
                });
        }, 500);
    }, [id]);

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`https://projex-backend.onrender.com/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json()).then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
        })
        .catch(err => console.log(err))

    }

    function editPost(project) {
        setMessage('')
        
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`https://projex-backend.onrender.com/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data) => {

            setProject(data)
            setShowProjectForm(false)

            setMessage('Projeto atualizado!')
            setType('success')

        })
        .catch(err => console.log(err))
    }

    function createService() {

        setMessage('')
        
        //last service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado. Verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //add service cost to project total cost
        project.cost = newCost
        
        //update project
        fetch(`https://projex-backend.onrender.com/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {
            //exibir os serviços
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                project && 

                <div className={styles.project_details}>
                    <Container customClass="column">

                        {message && <Message type={type} msg={message} />}

                        <div className={styles.details_container}>
                            
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toogleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>

                            {!showProjectForm ? (

                                <div className={styles.project_info}>
                                    <p> <span>Categoria:</span> {project.category.name} </p>
                                    <p> <span>Total do Orçamento:</span> R$ {project.budget} </p>
                                    <p> <span>Total Utilizado:</span> R$ {project.cost} </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                                </div>
                                )
                            }

                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toogleServiceForm}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}</button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm handleSubmit={createService} btnText="Adicionar serviço" projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>Serviços:</h2>
                        <Container customClass="start">
                            {
                                services.length > 0 &&
                                    services.map((service) => {
                                        return (
                                            <ServiceCard  
                                                id={service.id}
                                                name={service.name}
                                                cost={service.cost}
                                                description={service.description}
                                                key={service.id}
                                                handleRemove={removeService}
                                            />
                                        )
                                    })
                            }
                            {
                                services.length === 0 && <p>Não há serviços cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
                
            )}
        </>
    );
}

export default Project;
