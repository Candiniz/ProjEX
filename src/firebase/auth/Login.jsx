import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário logado:", user);
        navigate("/");  // Redireciona para a página de projetos após o login
      })
      .catch((err) => {
        setError("Erro ao fazer login. Tente novamente.");
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleLogin} className={styles.login_container}>
      <h2>Bem vindo de volta!</h2>
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
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
