import styles from '../project/ProjectForm.module.css'

import { useState } from 'react'

import Input from '../form/Input'
import InputMoney from '../form/InputMoney'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault();
        if (!projectData.services) projectData.services = []; 
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Serviço" 
                name="name" 
                placeholder="Insira o nome do serviço" 
                handleOnChange={handleChange} 
            />
            <InputMoney
                type="number" 
                text="Custo do Serviço" 
                name="cost" 
                placeholder="Insira o valor total" 
                handleOnChange={handleChange}
                value={service.cost || ''} 
            />
            <Input 
                type="text" 
                text="Descrição do Serviço" 
                name="description" 
                placeholder="Descreva o serviço" 
                handleOnChange={handleChange} 
            />
            <SubmitButton text={btnText} />
        </form>
    );
}



export default ServiceForm;
