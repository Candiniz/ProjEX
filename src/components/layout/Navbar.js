import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../img/projex_logo.png";
import { Link } from "react-router-dom";
import Container from "./Container";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClick = (e) => {
        // Impede o fechamento do menu quando clicado dentro dele
        e.preventDefault();
    };

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

                {/* Div com o fundo blur */}
                {menuOpen && (
                    <div className={styles.blurOverlay} onClick={toggleMenu}></div>
                )}

                {/* Menu deslizante */}
                <div
                    className={`${styles.menu} ${menuOpen ? styles.active : ""}`}
                    onClick={handleMenuClick} // Impede o fechamento ao clicar dentro do menu
                >
                    <ul className={styles.listMenu}>
                        <li className={styles.itemMenu}>
                            <Link to="/projects" onClick={toggleMenu}>Projetos</Link>
                        </li>
                        <li className={styles.itemMenu}>
                            <Link to="/contact" onClick={toggleMenu}>Contato</Link>
                        </li>
                        <li className={styles.itemMenu}>
                            <Link to="/company" onClick={toggleMenu}>Empresa</Link>
                        </li>
                        <li className={styles.itemMenu}>
                            <Link to="/newproject" onClick={toggleMenu}>Novo Projeto</Link>
                        </li>
                    </ul>
                </div>

                {/* Menu para telas grandes */}
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
