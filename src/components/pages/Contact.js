import styles from "./Contact.module.css";
import Cog from '../layout/Cog';

function Contato() {
    return (
        <>
            <Cog />
            <div className={styles.contato_container}>
                <h1>Contato</h1>
                <p>
                    Entre em contato conosco preenchendo o formulário abaixo ou utilizando
                    as informações fornecidas.
                </p>
                <form className={styles.form}>
                    <div className={styles.input_group}>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Insira seu nome"
                            required
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Insira seu email"
                            required
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="message">Mensagem:</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Escreva sua mensagem"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.btn}>
                        Enviar
                    </button>
                </form>
            </div>
        </>
    );
}

export default Contato;
