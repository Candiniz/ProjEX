import { useState, useEffect } from 'react';

import Input from '../form/Input';
import InputMoney from '../form/InputMoney'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

import { readData } from "../../firebase/firebase";

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        readData("categories/categories")
            .then((data) => {
                if (data) {
                    const categoriesArray = Object.values(data);
                    setCategories(categoriesArray);
                }
            })
            .catch((err) => console.error("Erro ao carregar categorias:", err));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (!project.name || project.budget === undefined || !project.category || !project.category.id) {
            alert('Por favor, preencha todos os campos e selecione uma categoria.');
            return;
        }
        handleSubmit(project);
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    }

    function handleCategory(e) {
        setProject((prevProject) => ({
            ...prevProject,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        }));
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Projeto" 
                name="name" 
                placeholder="Insira o nome do projeto" 
                handleOnChange={handleChange}
                value={project.name || ''} 
            />
            <InputMoney 
                type="number" 
                text="Orçamento do Projeto" 
                name="budget" 
                placeholder="Insira o orçamento total" 
                handleOnChange={handleChange} 
                value={project.budget || ''} 
            />
            <Select 
                handleOnChange={handleCategory} 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories} 
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;
