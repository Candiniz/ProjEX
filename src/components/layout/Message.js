import styles from './Message.module.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Message({ type, msg }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!msg) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [msg]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={`${styles.message} ${styles[type]}`}
                    initial={{ scale: 0.8, opacity: 0 }} // Ponto inicial
                    animate={{ scale: 1, opacity: 1 }}   // Animação ao entrar
                    exit={{ opacity: 0 }}                // Animação ao sair
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        opacity: { duration: 0.5 },      // Para o fade-out
                    }}
                >
                    {msg}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Message;
