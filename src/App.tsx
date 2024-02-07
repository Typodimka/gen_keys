import React, {useState} from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {
    Box,
    ButtonGroup,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Paper,
    Tooltip, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {TextInput} from './src/TextInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import JavascriptIcon from '@mui/icons-material/Javascript';
import {ModalUI} from "./src/Modal";
import {ModalJson} from "./src/ModalJson";


const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const styleBtn = {mt: 2, display: 'flex', justifyContent: 'flex-end', ml: 2};

const style = {
    width: '100wv',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 2,
    height: '96vh',
    borderRadius: '0px',
    overflow: 'hidden',
};

enum ActionsUsers {
    Json = "Посмотреть json",
    Export = "Экспорт",
    Add = "Добавить",
    Delete = "Удалить",
    Update = "Обновить"
}

const {Export, Add, Delete, Update, Json} = ActionsUsers;
const actions = [
    {icon: <JavascriptIcon/>, name: Json},
    {icon: <FileDownloadIcon fontSize="small"/>, name: Export},
    {icon: <AddIcon fontSize="small"/>, name: Add},
    {icon: <DeleteIcon fontSize="small"/>, name: Delete},
    {icon: <ArrowForwardIcon fontSize="small"/>, name: Update},

];


function App() {




    const [open, setOpen] = React.useState(false);

    const [values, setValues] = useState([
        {ru: '', en: ''},
    ]);


    const [isActive, setActive] = useState(false)
    const [fileRussian, setFileRussian] = useState<Record<string, string>>({}); //  Файл.
    const [fileEnglish, setFileEnglish] = useState<Record<string, string>>({}); //  Файл.

    const onBlurHandler = (newValue: string, index: number, lang: string) => {
        const copyValues = [...values];

        const copyValue = {...copyValues[index]};

        if (lang === 'ru') {
            copyValue.ru = newValue;
        }

        if (lang === 'en') {
            copyValue.en = newValue;
        }

        copyValues[index] = copyValue;
        setValues(copyValues);
    };


    const exportFile = (file: Record<string, string>, nameFile: string) => {
        const jsonContent = JSON.stringify(file, null, 2);

        const blob = new Blob([jsonContent], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${nameFile}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }




    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {


        const {dataset} = e.currentTarget
        if (dataset) {
            const trigger = dataset.action;


            if (trigger === Json) {
                setActive(true)
            }

            if (trigger === Export) {
                exportFile(fileRussian, 'russian')
                exportFile(fileEnglish, 'english')

            }


            if (trigger === Add) {
                const copyValues = [...values];
                copyValues.push({ru: '', en: ''});
                setValues(copyValues);
            }
            if (trigger === Delete) {
                setValues([{ru: '', en: ''}]);
            }
            if (trigger === Update) {
                const copyRu = JSON.parse(JSON.stringify(fileRussian))
                const copyEn = JSON.parse(JSON.stringify(fileEnglish))

                let isError = false

                values.forEach(value => {
                    if (!(value.en in copyRu)) {
                        copyRu[value.en] = value.ru;
                    } else {
                        isError = true
                    }

                    if (!(value.en in copyEn)) {
                        copyEn[value.en] = value.en;
                    } {
                        isError = true
                    }
                });

                if (!isError) {
                    setFileRussian(copyRu)
                    setFileEnglish(copyEn)
                    setValues([{ru: '', en: ''}]);
                } {
                    setOpen(true)
                }

            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <>

                <Paper sx={style}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                        <ButtonGroup size="small" sx={styleBtn}>
                            {actions.map(item => (
                                <Tooltip key={item.name} title={item.name}>
                                    <IconButton data-action={item.name} onClick={onClickHandler}>
                                        {item.icon}
                                    </IconButton>
                                </Tooltip>
                            ))}
                        </ButtonGroup>
                    </Box>


                    <Divider sx={{mt: 2}}/>
                    <Grid container spacing={2} sx={{height: 550, overflow: 'auto'}}>
                        {values.map((value, index) => (
                            <Grid item xs={6} sx={{
                                mt: 2,
                                display: 'flex',
                                alignItems: 'center',

                            }}>
                                <FormControl sx={{ width: 400}}>
                                    <TextInput
                                        label="Русский"
                                        value={value.ru}
                                        onBlurHandler={(newValue) => onBlurHandler(newValue, index, 'ru')}
                                    />
                                </FormControl>


                                <FormControl sx={{ width: 400, ml: 2}}>
                                    <TextInput
                                        label="Английский"
                                        value={value.en}
                                        onBlurHandler={(newValue) => onBlurHandler(newValue, index, 'en')}
                                    />
                                </FormControl>

                                <Tooltip  title='Удалить блок'>
                                    <IconButton onClick={() => {
                                        const copyValues = [...values]
                                        copyValues.splice(index, 1)
                                        setValues(copyValues)
                                    }}>
                                        <CloseIcon fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>


                        ))}
                    </Grid>
                    <Divider sx={{mt: 2}}/>

                    <Box>
                        <iframe
                            title="Вставленная страница"
                            src="https://www.reverso.net/перевод-текста"
                            style={{width: '100%', height: 250}}
                        />
                    </Box>

                </Paper>
                <ModalJson fileRussian={fileRussian} fileEnglish={fileEnglish} setFileEnglish={setFileEnglish}
                           setFileRussian={setFileRussian} setActive={setActive} isActive={isActive}/>
                <ModalUI fileRussian={fileRussian} fileEnglish={fileEnglish} setFileEnglish={setFileEnglish}
                         setFileRussian={setFileRussian}/>


                <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(!open)}>
                    <Alert
                        onClose={() => setOpen(!open)}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Ошибка при попытке записи данных!
                    </Alert>
                </Snackbar>

            </>

        </ThemeProvider>
    );
}

export default App;
