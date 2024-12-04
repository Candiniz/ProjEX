import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../../components/layout/Message';


import styles from './Register.module.css'

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(""); // Para a mensagem de erro ou sucesso
    const [messageType, setMessageType] = useState("error"); // Tipo de mensagem (sucesso ou erro)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Limpar a mensagem anterior antes de tentar criar o usuário
        setMessage("");
        setMessageType("error");

        const { name, email, password } = formData;

        const auth = getAuth();

        try {
            // Criar o usuário
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Salvar os dados do usuário no Firebase Realtime Database
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            await set(userRef, {
                name: name,
                email: email,
                uid: user.uid,
                projects: {} // Inicializando a chave de projetos vazia
            });

            // Mensagem de sucesso
            setMessage("Usuário registrado com sucesso!");
            setMessageType("success");
            setTimeout(() => navigate("/"), 3000); // Redireciona após 3 segundos
        } catch (error) {
            // Mensagens de erro dependendo do código de erro do Firebase
            console.error("Erro ao registrar o usuário:", error.message);
            if (error.code === "auth/weak-password") {
                setMessage("A senha precisa ter pelo menos 6 caracteres.");
            } else if (error.code === "auth/email-already-in-use") {
                setMessage("Esse e-mail já está em uso. Tente outro.");
            } else if (error.code === "auth/invalid-email") {
                setMessage("O e-mail fornecido é inválido.");
            } else {
                setMessage("Erro ao registrar o usuário. Tente novamente.");
            }
            setMessageType("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.register_container}>
            <h2>Bem-vindo ao ProjEX</h2>

            {/* Exibe a mensagem se houver uma */}
            {message && <Message type={messageType} msg={message} />}

            <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Registrar</button>
            <div className={styles.login_here}>
                <p>Já possui cadastro?</p>
                <h3><Link to="/login">Faça Login aqui</Link></h3>
            </div>
        </form>
    );
}

export default Register;
