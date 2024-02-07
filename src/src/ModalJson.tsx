import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import {Box, Button, ButtonGroup, Divider, FormControl, Paper, SxProps, Typography} from '@mui/material';
import {ResizableInput} from "./ResizebleInput";


interface ModalPropsType {
    fileRussian: Record<string, string>,
    setFileRussian: (newFile: Record<string, string>) => void;
    fileEnglish: Record<string, string>,
    setFileEnglish: (newFile: Record<string, string>) => void;
    setActive: (newActive: boolean) => void;
    isActive: boolean;
}

const style: SxProps = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
};

const stylePaper = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: 1000
}

const styleBtn = {mt: 2, display: 'flex', justifyContent: 'flex-end'};


export const ModalJson: React.FC<ModalPropsType> = (
    {

        fileRussian,
        setFileRussian,
        fileEnglish,
        setFileEnglish,
        setActive,
        isActive
    },
) => {

    const updateFile = (file: Record<string, string>) => {
        return JSON.stringify(file, null, 2); // Параметр null для replacer, 2 для отступов
    }


    const [valueRussian, setValueRussian] = useState<string>('')
    const [valueEnglish, setValueEnglish] = useState<string>('')

    useEffect(() => {
        setValueEnglish(updateFile(fileEnglish))
    }, [fileEnglish])

    useEffect(() => {
        setValueRussian(updateFile(fileRussian))
    }, [fileRussian])

    return (
        <Modal sx={{zIndex: 10}} open={isActive} onClose={() => setActive(false)}>
            <Box sx={style}>
                <Paper sx={stylePaper}>
                    <Typography variant="body1">
                        Редактор JSON
                    </Typography>
                    <Divider sx={{mt: 2}}/>

                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-between'}}>
                        <FormControl sx={{width: 450}}>
                            <ResizableInput value={valueRussian}
                                            onBlurHandler={(newValue: string) => (setValueRussian(newValue))}
                                            maxHeight={500} rows={12}/>
                        </FormControl>

                        <FormControl sx={{width: 450}}>
                            <ResizableInput value={valueEnglish}
                                            onBlurHandler={(newValue: string) => (setValueEnglish(newValue))}
                                            maxHeight={500} rows={12}/>
                        </FormControl>

                    </Box>


                    <Divider sx={{mt: 2}}/>

                    <ButtonGroup sx={{styleBtn}} size='small'>
                        <Button sx={styleBtn} onClick={() => {
                            try {
                                const russianContent = JSON.parse(valueRussian);
                                const englishContent = JSON.parse(valueEnglish);
                                setFileRussian(russianContent);
                                setFileEnglish(englishContent);
                                setActive(false);
                            } catch (error) {
                                console.error('Ошибка при парсинге JSON:', error);
                                // Дополнительные действия при обнаружении ошибки парсинга JSON
                            }
                        }}>
                            Сохранить
                        </Button>


                        <Button sx={styleBtn} onClick={() => setActive(false)}>
                            Отмена
                        </Button>

                    </ButtonGroup>

                </Paper>
            </Box>
        </Modal>
    );
};
