import styles from "./Company.module.css";
import Cog from '../layout/Cog';

function Empresa() {
    return (
        <>
            <Cog />
            <div className={styles.empresa_container}>
                <h1>Sobre Nós</h1>
                <p>
                    Somos uma empresa dedicada a fornecer soluções de alta qualidade para
                    nossos clientes. Nossa missão é transformar ideias em realidade, com
                    foco na inovação e excelência.
                </p>
                <p>
                    Com anos de experiência no mercado, contamos com uma equipe qualificada
                    e apaixonada pelo que faz. Cada projeto é uma oportunidade de superar
                    expectativas e construir parcerias duradouras.
                </p>
                <p>
                    Entre em contato conosco para saber mais sobre como podemos ajudá-lo a
                    alcançar seus objetivos.
                </p>
            </div>
        </>
    );
}

export default Empresa;
