import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from './Login.module.css';
import Message from '../../components/layout/Message';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // Define o tipo de mensagem (error, success)
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Limpar a mensagem anterior antes de tentar o login
    setMessage(""); // Limpa a mensagem anterior
    setMessageType("error"); // Define tipo de mensagem para erro (caso de erro)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuário logado:", user);

      setMessage("Login realizado com sucesso! Você será redirecionado para a Home!");
      setMessageType("success");
      setTimeout(() => navigate("/"), 3000); // Redireciona após 3 segundos
    } catch (err) {
      console.error("Erro ao fazer login:", err);

      // Define a mensagem de erro com base no código do Firebase
      switch (err.code) {
        case "auth/wrong-password":
          setMessage("Senha incorreta. Verifique e tente novamente.");
          break;
        case "auth/user-not-found":
          setMessage("Usuário não encontrado. Verifique o e-mail ou cadastre-se.");
          break;
        case "auth/invalid-email":
          setMessage("O e-mail fornecido é inválido.");
          break;
        default:
          setMessage("Erro ao fazer login. Tente novamente.");
          break;
      }
      setMessageType("error");
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.login_container}>
      <h2>Bem vindo de volta!</h2>

      {/* Exibe a mensagem se houver uma */}
      {message && <Message type={messageType} msg={message} />}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu e-mail"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha"
        required
      />
      <button type="submit">Entrar</button>
      <div className={styles.register_here}>
        <p>Não possui cadastro ainda?</p>
        <h3><Link to="/register">Cadastre-se aqui</Link></h3>
      </div>
    </form>
  );
}

export default Login;
