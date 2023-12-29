import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Box,
    ButtonGroup,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { TextInput } from './TextInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function App() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const styleBtn = { mt: '10px', display: 'flex', justifyContent: 'flex-end' };

    const style = {
        width: '1000wv',
        backgroundColor: 'background.paper',
        boxShadow: 24,
        p: 2,
        height: '96vh',
        borderRadius: 'none',
        overflow: 'hidden'
    };

    const [values, setValues] = useState([
        { proposal: { ru: '', en: '' }, keys: { ru: '"":"",', en: '"":"",' } },
    ]);

    const clickAdd = () => {
        const copyValues = [...values];
        copyValues.push({
            proposal: { ru: '', en: '' },
            keys: { ru: '"":"",', en: '"":"",' },
        });
        setValues(copyValues);
    };

    const clickDel = () => {
        setValues([{
            proposal: { ru: '', en: '' },
            keys: { ru: '"":"",', en: '"":"",' },
        }]);
    };

    const clickHandle = () => {
        const copyValues = JSON.parse(JSON.stringify(values));

        values.forEach((value, index) => {
            const copyValue = JSON.parse(JSON.stringify(value));

            copyValue.keys.ru = `"${copyValue.proposal.en}":"${copyValue.proposal.ru}",`;
            copyValue.keys.en = `"${copyValue.proposal.en}":"${copyValue.proposal.en}",`;
            copyValues[index] = copyValue;
        });

        setValues(copyValues);
    };

    const onBlurHandler = (newValue: string, index: number, lang: string) => {
        const copyValues = [...values];

        const copyValue = { ...copyValues[index] };

        if (lang === 'ru') {
            copyValue.proposal.ru = newValue;
        }

        if (lang === 'en') {
            copyValue.proposal.en = newValue;
        }

        copyValues[index] = copyValue;
        setValues(copyValues);
    };

    const clickDelOne = (index: number) => {
        const copyValues = [...values];
        copyValues.splice(index, 1);
        setValues(copyValues);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={style}>
                <Typography variant="h6">Переводчик</Typography>

                <ButtonGroup size="small" sx={styleBtn}>
                    <IconButton onClick={clickAdd}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={clickDel}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={clickHandle}>
                        <ArrowForwardIcon />
                    </IconButton>
                </ButtonGroup>

                <Divider sx={{ mt: '10px' }} />
                <Box sx={{ height: 550, overflow: 'auto' }}>
                    {values.map((value, index) => (
                        <Grid container spacing={2} sx={{ mt: '-40px' }} key={index}>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    mt: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography sx={{ mt: 2 }}>Блок {index + 1}</Typography>

                                <IconButton onClick={() => clickDelOne(index)} sx={{ mt: 2, mr: 3 }}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl sx={{ mt: 2, width: 400 }}>
                                    <TextInput
                                        label="Русский"
                                        value={value.proposal.ru}
                                        onBlurHandler={(newValue) => onBlurHandler(newValue, index, 'ru')}
                                    />
                                </FormControl>

                                <FormControl sx={{ mt: 2, width: 400, ml: 2 }}>
                                    <TextInput
                                        label="Английский"
                                        value={value.proposal.en}
                                        onBlurHandler={(newValue) => onBlurHandler(newValue, index, 'en')}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl sx={{ mt: 2, width: 400 }}>
                                    <TextField
                                        label="Русский"
                                        value={value.keys.ru}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>

                                <FormControl sx={{ mt: 2, width: 400, ml: 2 }}>
                                    <TextField
                                        label="Английский"
                                        value={value.keys.en}
                                        variant="standard"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
                <Divider sx={{ mt: 2 }} />

                <Box >
                    <iframe
                        title="Вставленная страница"
                        src="https://www.reverso.net/перевод-текста"
                        frameBorder="0"
                        style={{width: '100%', height: 250}}
                    />
                </Box>

            </Paper>
        </ThemeProvider>
    );
}

export default App;
