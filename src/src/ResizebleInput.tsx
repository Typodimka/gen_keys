import React, {ChangeEvent, useEffect, useState} from 'react';
import {styled} from '@mui/system';
import TextField from '@mui/material/TextField';

interface ResizableInputType {
    value: string;
    onBlurHandler: (value: string) => void;
    label?: string;
    maxHeight?: number;
    rows?: number
}

const Resizable = styled(TextField)({
    resize: 'both',
    '& textarea': {
        resize: 'both',
        overflowY: "auto",
    },
});

const ResizedTextArea = styled(Resizable)({});

export const ResizableInput: React.FC<ResizableInputType> = ({
                                                                 value,
                                                                 onBlurHandler,
                                                                 label,
                                                                 maxHeight,
                                                                 rows
                                                             }) => {
    const [input, setInput] = useState<string>(value);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleBlur = () => {
        onBlurHandler(input.trim());
    };

    useEffect(() => {
        setInput(value);
    }, [value]);


    return (
        <ResizedTextArea
            label={label}
            multiline
            rows={rows}
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
                style: {
                    maxHeight: maxHeight ? `${maxHeight}px` : 'none',
                    overflow: maxHeight ? 'auto' : 'visible',
                    overflowY: maxHeight ? 'auto' : 'visible'
                }
            }}

        />
    );
};

ResizableInput.defaultProps = {
    label: '',
    maxHeight: 200,
    rows: 1
};

