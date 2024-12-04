import styles from './Input.module.css';

function InputMoney({ text, name, placeholder, handleOnChange, value }) {

    function handleInputChange(e) {
        const inputValue = e.target.value;

        // Permite que o usuário digite valores com vírgulas e números
        const sanitizedValue = inputValue.replace(/[^\d,]/g, ''); // Remove caracteres inválidos, exceto números e vírgula
        
        handleOnChange({
            target: {
                name: e.target.name,
                value: sanitizedValue, // Mantém o valor como string durante a digitação
            },
        });
    }

    function validateInput(e) {
        const inputValue = e.target.value;
        
        // Valida se o valor segue o formato monetário brasileiro
        const monetaryPattern = /^\d+(\,\d{1,2})?$/;

        if (!monetaryPattern.test(inputValue)) {
            alert('Por favor, insira um valor monetário válido no formato 1234,56.');
            handleOnChange({
                target: {
                    name: e.target.name,
                    value: '', // Limpa o campo se inválido
                },
            });
            return;
        }

        // Converte o valor para número ao perder o foco
        const numericValue = parseFloat(inputValue.replace(',', '.'));
        handleOnChange({
            target: {
                name: e.target.name,
                value: numericValue, // Retorna o valor como número ao callback
            },
        });
    }

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type="text" // Permite entrada livre de texto
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleInputChange} // Gerencia a entrada durante a digitação
                onBlur={validateInput} // Valida e converte ao perder o foco
                value={value || ''} // Exibe o valor atual ou vazio
            />
        </div>
    );
}

export default InputMoney;
