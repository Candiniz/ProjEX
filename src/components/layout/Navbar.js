import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../img/projex_logo.png";

import { Link } from "react-router-dom";
import Container from "./Container";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            // Se o clique for fora do menu, fecha o menu
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        // Adiciona o event listener quando o menu estiver aberto
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Limpa o listener ao desmontar o componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]); // Vai rodar sempre que o menuOpen mudar

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="Costs" />
                </Link>

                {/* Botão do menu hambúrguer */}
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                {/* Menu deslizante */}
                <div
                    ref={menuRef}
                    className={`${styles.menu} ${menuOpen ? styles.active : ""}`
                    }>
                    <ul className={styles.listMenu}>
                        <li className={styles.itemMenu}><Link to="/projects" onClick={toggleMenu}>Projetos</Link></li>
                        <li className={styles.itemMenu}><Link to="/contact" onClick={toggleMenu}>Contato</Link></li>
                        <li className={styles.itemMenu}><Link to="/company" onClick={toggleMenu}>Empresa</Link></li>
                        <li className={styles.itemMenu}><Link to="/newproject" onClick={toggleMenu}>Novo Projeto</Link></li>
                    </ul>
                </div>

                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/projects" onClick={toggleMenu}>Projetos</Link></li>
                    <li className={styles.item}><Link to="/contact" onClick={toggleMenu}>Contato</Link></li>
                    <li className={styles.item}><Link to="/company" onClick={toggleMenu}>Empresa</Link></li>
                    <li className={styles.item}><Link to="/newproject" onClick={toggleMenu}>Novo Projeto</Link></li>
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar;
