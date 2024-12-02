import React from 'react';
import { FaCog } from 'react-icons/fa';  // Importando o ícone de cog do React Icons
import './Cog.css'; // Adicionando o arquivo CSS para o estilo

function Cog() {
    return (
        <div className="background-cog">
            <FaCog className="cog-icon" />
        </div>
    );
}

export default Cog;
