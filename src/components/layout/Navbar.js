import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthContext";
import styles from "./Navbar.module.css";
import logo from "../../img/projex_logo.png";
import Container from "./Container";

import { FaPlus } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoExitSharp } from "react-icons/io5";


function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();  // Realiza o logout

    // Navega para a página inicial após o logout
    navigate("/");
  };

  // Função para verificar se é tela mobile
  const checkMobile = () => {
    if (window.innerWidth <= 576) {
      setIsMobile(true);  // Considera como mobile se a largura for <= 768px
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Verifica o tamanho da tela inicialmente
    checkMobile();

    // Atualiza o estado quando a janela for redimensionada
    window.addEventListener("resize", checkMobile);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (e) => {
    e.preventDefault(); // Impede o fechamento do menu quando clicado dentro dele
  };

  return (
    <nav className={styles.navbar}>

      <Link to="/">
        <img className={styles.logo} src={logo} alt="Projex" />
      </Link>

      {/* Botão do menu hambúrguer para telas menores */}
      {isMobile && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {/* Div com o fundo blur - só exibe no mobile quando o menu estiver aberto */}
      {menuOpen && isMobile && (
        <div className={styles.blurOverlay} onClick={toggleMenu}></div>
      )}

      {/* Menu deslizante (apenas no mobile) */}
      {isMobile && (
        <div
          className={`${styles.menu} ${menuOpen ? styles.active : ""}`}
          onClick={handleMenuClick} // Impede o fechamento ao clicar dentro do menu
        >
          <ul className={styles.listMenu}>

            <li className={styles.itemMenu}>
              <Link to="/contact" onClick={toggleMenu}>

                <span>Contato</span>
                <IoMail />
              </Link>
            </li>
            <li className={styles.itemMenu}>
              <Link to="/company" onClick={toggleMenu}>
                <span>Empresa</span>
                <FaBuildingColumns />
              </Link>
            </li>
            {!user ? (

              <>
                <li className={styles.itemMenu}>
                  <Link to="/login" onClick={toggleMenu}>
                    <span>Login</span>
                    <RiLoginCircleLine />
                  </Link>
                </li>

                <li className={styles.itemMenuTip}>
                  Faça <span><Link to="/login" onClick={toggleMenu}>Login </Link></span>
                  ou <span><Link to="/register" onClick={toggleMenu}>Cadastre-se</Link></span> para começar!
                </li>
              </>

            ) : (
              <>
                <li className={styles.itemMenu}>
                  <Link to="/projects" onClick={toggleMenu}>
                    <span>Meus Projetos</span>
                    <IoPersonSharp />
                  </Link>
                </li>
                <li className={styles.itemMenu}>
                  <Link to="/newproject" onClick={toggleMenu}>
                    <span>Criar Projeto</span>
                    <FaPlus />
                  </Link>
                </li>
                <li className={styles.itemMenu}>
                  <button className={styles.itemMenuBtn} onClick={() => { handleLogout(); toggleMenu() }}><IoExitSharp /><span>Sair</span></button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Menu para telas grandes (desktop) */}
      {!isMobile && (
        <ul className={styles.list}>
          <li className={styles.item}><Link to="/contact">Contato</Link></li>
          <li className={styles.item}><Link to="/company">Empresa</Link></li>
          {!user ? (
            <>
              <li className={styles.item}><Link to="/login">Entrar</Link></li>
              <li className={styles.item}><Link to="/register">Registrar</Link></li>
            </>
          ) : (
            <>
              <li className={styles.item}><Link to="/projects">Meus Projetos</Link></li>
              <li className={styles.item}><Link to="/newproject">Criar Projeto</Link></li>
              <li className={styles.item}>
                <button className={styles.itemBtn} onClick={handleLogout}>
                  <IoExitSharp />
                  <span>Sair</span>
                </button>
              </li>
            </>
          )}
        </ul>
      )}

    </nav>
  );
}

export default Navbar;
