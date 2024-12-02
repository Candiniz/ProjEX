import { Link } from 'react-router-dom'
import styles from './LinkButton2.module.css'

function LinkButton2( { to, text }) {
    return (
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default LinkButton2