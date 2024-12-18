import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, update, remove, readData, get } from 'firebase/database';
import { useAuth } from "../../firebase/auth/AuthContext";

import { formatToBrazilianCurrency } from './Projects'

import styles from './Project.module.css';
import { motion } from "framer-motion";

import Cog from '../layout/Cog';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../services/ServiceForm';
import ServiceCard from '../services/ServiceCard';

function Project() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [project, setProject] = useState(null);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  
  const userName = user ? user.name : ''; // Pegue o nome do usuário do localStorage ou de um contexto

  // Carregar os dados do projeto a partir do Firebase
  useEffect(() => {
    if (!user) {  // Verifica se o usuário não está logado
        console.error("Usuário não está logado.");
        navigate("/login");
        return;
    }

    const projectPath = `users/${user.uid}/projects/${id}`;  // Agora pegamos o uid do usuário logado
    console.log("Caminho para o projeto:", projectPath);

    const db = getDatabase();  // Obtém a instância do Firebase Realtime Database
    const dbRef = ref(db, projectPath);  // Cria a referência para o caminho do projeto

    get(dbRef)  // Usa a função get() para ler os dados do Firebase
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Dados do projeto:", snapshot.val());
                setProject(snapshot.val());
                setServices(snapshot.val().services || []);
            } else {
                setMessage('Projeto não encontrado.');
                setType('error');
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar projeto:", error);
            setMessage('Erro ao buscar o projeto');
            setType('error');
        });
  }, [id, navigate, user]);  // Agora dependemos do `user`

  // Restante do código para editar, remover e exibir serviços...
  // (não precisa mudar o restante do código)

  // Editar o projeto
  function editPost(updatedProject) {
    if (updatedProject.budget < updatedProject.cost) {
      setMessage('O Orçamento não pode ser menor que o custo do projeto!');
      setType('error');
      return false;
    }

    const db = getDatabase();
    const projectRef = ref(db, `users/${user.uid}/projects/${updatedProject.id}`);

    update(projectRef, updatedProject)
      .then(() => {
        setProject(updatedProject);
        setShowProjectForm(false);
        setMessage('Projeto atualizado!');
        setType('success');
      })
      .catch((error) => {
        setMessage('Erro ao atualizar projeto');
        setType('error');
      });
  }

  function parseMonetary(value) {
    if (value === undefined || value === null || value === '') return 0; // Caso o valor esteja vazio ou inválido, retorna 0
    
    // Verifica se o valor é uma string antes de tentar usar o replace
    let sanitizedValue = value;
    if (typeof value === 'string') {
        sanitizedValue = value.replace(',', '.'); // Substitui a vírgula por ponto para valores decimais brasileiros
    }

    // Converte para número
    const numericValue = parseFloat(sanitizedValue);
    
    // Valida se é realmente um número
    if (isNaN(numericValue)) {
        alert('Por favor, insira um valor numérico válido.');
        return 0;
    }

    return numericValue;
}

  function formatMonetary(value) {
    // Certifica-se de que é um número e formata com duas casas decimais
    return value.toFixed(2).replace('.', ',');
  }

  function createService(updatedProject) {
    const lastService = updatedProject.services[updatedProject.services.length - 1];

    // Gera um ID único para o serviço
    lastService.id = new Date().getTime();

    // Converte custos para números
    const lastServiceCost = parseMonetary(lastService.cost);
    const currentCost = parseMonetary(updatedProject.cost || '0'); // Considera 0 se não houver custo atual
    const budget = parseMonetary(updatedProject.budget);

    // Calcula novo custo total
    const newCost = currentCost + lastServiceCost;

    // Valida se o orçamento foi ultrapassado
    if (newCost > budget) {
      alert('Orçamento ultrapassado! Verifique o valor do serviço.');
      updatedProject.services.pop(); // Remove o último serviço adicionado
      return false;
    }

    // Atualiza o custo do projeto
    updatedProject.cost = newCost;

    // Atualiza no Firebase
    const db = getDatabase();
    const projectRef = ref(db, `users/${user.uid}/projects/${updatedProject.id}`);

    update(projectRef, updatedProject)
      .then(() => {
        setServices(updatedProject.services); // Atualiza serviços no estado
        setShowServiceForm(false); // Esconde o formulário de serviço
        setMessage('Serviço adicionado com sucesso!');
        setType('success');
      })
      .catch(() => {
        setMessage('Erro ao adicionar serviço.');
        setType('error');
      });
  }

  function removeService(id, cost) {
    const updatedServices = project.services.filter((service) => service.id !== id);

    const updatedProject = { ...project };
    updatedProject.services = updatedServices;

    // Converte para número e realiza a subtração
    updatedProject.cost = formatMonetary(
      parseMonetary(updatedProject.cost) - parseMonetary(cost)
    );

    const db = getDatabase();
    const projectRef = ref(db, `users/${user.uid}/projects/${updatedProject.id}`);

    update(projectRef, updatedProject)
      .then(() => {
        setProject(updatedProject);
        setServices(updatedServices);
        setMessage('Serviço removido com sucesso!');
        setType('success');
      })
      .catch(() => {
        setMessage('Erro ao remover serviço');
        setType('error');
      });
  }

  // Excluir o projeto
  function removeProject() {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este projeto?');

    if (confirmDelete) {
      const db = getDatabase();
      const projectRef = ref(db, `users/${user.uid}/projects/${project.id}`);

      remove(projectRef)
        .then(() => {
          setMessage('Projeto excluído com sucesso!');
          setType('success');
          navigate('/projects');
        })
        .catch((error) => {
          setMessage('Erro ao excluir projeto');
          setType('error');
        });
    }
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      <Cog />
      {project ? (
        <div className={styles.project_details}>
          {message && <Message type={type} msg={message} />}

          {/* Detalhes do Projeto */}
          <motion.div
            className={styles.details_container}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <h1>Projeto: {project.name}</h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? "Editar projeto" : "Fechar"}
            </button>
            {!showProjectForm ? (
              <div className={styles.project_info}>
                <p>
                  <span>Categoria:</span> {project.category.name}
                </p>
                <p>
                  <span>Total do orçamento:</span> R${formatToBrazilianCurrency(project.budget)}
                </p>
                <p>
                  <span>Total utilizado:</span> R${formatToBrazilianCurrency(project.cost || "0")}
                </p>
                <button className={styles.btn} onClick={removeProject}>
                  Excluir Projeto
                </button>
              </div>
            ) : (
              <div className={styles.project_info}>
                <ProjectForm
                  handleSubmit={editPost}
                  btnText="Concluir Edição"
                  projectData={project}
                />
              </div>
            )}
          </motion.div>

          {/* Formulário de Serviço */}
          <motion.div
            className={styles.service_form_container}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <h2>Adicione um serviço:</h2>
            <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
            </button>
            <div className={styles.project_info}>
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar Serviço"
                  projectData={project}
                />
              )}
            </div>
          </motion.div>

          {/* Lista de Serviços */}
          <h2>Serviços:</h2>
          <Container customClass="start">
            {services.length > 0 &&
              services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: index * 0.2, // Animação sequencial
                  }}
                >
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={formatToBrazilianCurrency(service.cost)}
                    description={service.description}
                    handleRemove={removeService}
                  />
                </motion.div>
              ))}
            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
