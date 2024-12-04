import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Register.module.css'

function Register() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = formData;

        const auth = getAuth();
        try {
            // Criar o usuário
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Salvar o nome e outros dados no Firebase Realtime Database
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`); // Usando UID do usuário para criar um nó único
            await set(userRef, {
                name: name,
                email: email,
                uid: user.uid,
                projects: {} // Criando a chave de projects vazia para futuros projetos
            });
            navigate("/")
            console.log("Usuário registrado com sucesso!", user);
        } catch (error) {
            console.error("Erro ao registrar o usuário:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.register_container}>
            <h2>Bem vindo ao ProjEX</h2>
            <input type="text" name="name" placeholder="Nome" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Senha" onChange={handleChange} required />
            <button type="submit">Registrar</button>
            <div className={styles.login_here}>
                <p>Já possui cadastro?</p>
                <h3><Link to="/login">Faça Login aqui</Link></h3>
            </div>
        </form>
    );
}

export default Register;
