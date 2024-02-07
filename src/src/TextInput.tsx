import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';


interface TextInputProps {
    value: string;
    label?: string;
    onBlurHandler: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
                                                        value,
                                                        label,
                                                        onBlurHandler,
                                                    }) => {

    const [input, setInput] = useState<string>(value);
    const [enterPressed, setEnterPressed] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const ApplyUpdate = () => {
        onBlurHandler(input.trim());
    }

    const handleBlur = () => {
        if (!enterPressed) {
            ApplyUpdate();
        }
        // Сбрасываем флаг после обработки
        setEnterPressed(false);
    };

    const enterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            ApplyUpdate();
            // Устанавливаем флаг, чтобы предотвратить срабатывание onBlur
            setEnterPressed(true);
        }
    };

    useEffect(() => {
        setInput(value);
    }, [value]);


    return (
        <TextField
            label={label}
            required
            variant="standard"
            value={input}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={enterClick}
        />
    );
};

TextInput.defaultProps = {
    label: '',
};
