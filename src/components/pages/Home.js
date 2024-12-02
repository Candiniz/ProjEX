import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton';
import lamp from '../../img/lamp.png'
import logo from '../../img/logo2.png'
import Cog from '../layout/Cog';


function Home() {
    return (
        <>
        <Cog />
        <section className={styles.home_container}>
            <img className={styles.home_container_img} alt='Lamp' src={lamp} />
            <img className={styles.home_container_logo} alt='ProjEX Logo' src={logo} />
            <p className={styles.p}>Começe agora a gerenciar seus projetos!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
        </section>
        </>
    )
}

export default Home;