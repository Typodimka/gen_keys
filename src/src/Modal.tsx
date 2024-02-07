import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import {Box, Button, Divider, Paper, styled, SxProps, Typography} from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface ModalPropsType {

    fileRussian: Record<string, string>,
    setFileRussian: (newFile: Record<string, string>) => void;
    fileEnglish: Record<string, string>,
    setFileEnglish: (newFile: Record<string, string>) => void;
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
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: 600
}

const styleBtn = {mt: 2, ml: 30};


export const ModalUI: React.FC<ModalPropsType> = (
    {
        setFileRussian,
        setFileEnglish
    },
) => {

    const [isActive, setActive] = useState(true)

    const [selectRussianFile, setSelectRussianFile] = useState<File | null>(null)
    const [selectEnglishFile, setSelectEnglishFile] = useState<File | null>(null)


    const handleFileChange = async (file: File): Promise<Record<string, any>> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result as string;
                try {
                    const jsonContent = JSON.parse(content);

                    resolve(JSON.parse(JSON.stringify(jsonContent)));
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                    reject(error);
                }
            };
            reader.onerror = () => {
                reject(new Error('Ошибка при чтении файла.'));
            };
            reader.readAsText(file);
        });
    };


    return (
        <Modal sx={{zIndex: 10}} open={isActive}>
            <Box sx={style}>
                <Paper sx={stylePaper}>
                    <Typography variant="body1">
                        Выберите файлы
                    </Typography>
                    <Divider sx={{mt: 2}}/>

                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon/>}
                        >
                            Выберите файл russian
                            <VisuallyHiddenInput
                                accept=".json"
                                type="file"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setSelectRussianFile(file);
                                    }
                                }}
                            />
                        </Button>
                        <Typography sx={{ml: 1}}>
                            {selectRussianFile ? `${selectRussianFile.name}` : `файл не выбран`}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon/>}
                        >
                            Выберите файл english
                            <VisuallyHiddenInput
                                accept=".json"
                                type="file"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setSelectEnglishFile(file);
                                    }
                                }}
                            />
                        </Button>
                        <Typography sx={{ml: 1}}>
                            {selectEnglishFile ? `${selectEnglishFile.name}` : `файл не выбран`}
                        </Typography>
                    </Box>
                    <Divider sx={{mt: 2}}/>

                    <Button sx={styleBtn} onClick={async () => {
                        if (selectRussianFile && selectEnglishFile) {
                            try {
                                const russianContent = await handleFileChange(selectRussianFile);
                                const englishContent = await handleFileChange(selectEnglishFile);
                                setFileRussian(russianContent);
                                setFileEnglish(englishContent);
                                setActive(false);
                            } catch (error) {
                                console.error('Ошибка:', error);
                            }
                        }
                    }}>
                        Сохранить
                    </Button>


                </Paper>
            </Box>
        </Modal>
    );
};
