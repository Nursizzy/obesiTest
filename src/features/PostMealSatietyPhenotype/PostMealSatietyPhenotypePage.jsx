import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addIntestinesData, calculateIntestinesSatiation } from '../../store/slices/phenotypesSlice.js'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { marks } from './constants.js'
import { green } from '@mui/material/colors'

const validationSchema = yup.object({
    hungry: yup
        .number('Должна быть цифра')
        .required('Обязательное поле'), full: yup
        .number('Должна быть цифра')
        .required('Обязательное поле'),
});
export const PostMealSatietyPhenotypePage = () => {
    const dispatch = useDispatch()
    const {
        response,
        data,
        statuses: {isPending, isFulfilled}
    } = useSelector(state => state.phenotypes.calculateIntestinesSatiation)
    const handleCalculate = (values) => {
        dispatch(calculateIntestinesSatiation(values))
        dispatch(addIntestinesData(values))
    }

    const formik = useFormik({
        initialValues: data, validationSchema: validationSchema, onSubmit: (values) => {
            handleCalculate(values)
        },
    });

    const handleSliderChange = (event, newValue, field) => {
        formik.setFieldValue(field, newValue);
    };

    const buttonSx = {
        ...(isFulfilled && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
            {'Инструкции:'}
        </Typography>
        <Typography>
            {'Расположитесь в комфортном положеннии.'}
        </Typography>
        <Typography sx={{fontWeight: 'bold'}}>
            {'Подумайте о ваших обычных ощущениях голода ДО обычного приема пищи дома.'}
        </Typography>
        <Typography>
            {'Установите бегунок на линейной шкале в том месте, которое соответствует вашему обычному чувству голода перед обычным приемом пищи дома.'}
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <Typography gutterBottom variant={'h6'} align={'center'}>
                {'Насколько вы ощущаете чувство голода?'}
            </Typography>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                <Typography width={'200px'} sx={{fontStyle: 'italic', color: '#548235', textAlign: 'end'}}>
                    {'Совершенно не ощущаю'}
                </Typography>
                <Slider
                    width={200}
                    name='hungry'
                    value={formik.values.hungry || 0}
                    onChange={(event, newValue) => handleSliderChange(event, newValue, 'hungry')}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
                <Typography width={'200px'} sx={{fontStyle: 'italic', color: '#548235', textAlign: 'start'}}>
                    {'Ощущаю как никогда раньше'}
                </Typography>
            </Stack>
            <Typography sx={{fontWeight: 'bold'}}>
                {'Подумайте о ваших обычных ощущениях полноты в желудке ЧЕРЕЗ ДВА ЧАСА после обычного приема домашней пищи.'}
            </Typography>
            <Typography>
                {'Установите бегунок на линейной шкале в том месте, которое соответствует вашему обычному чувству полноты в желудке ЧЕРЕЗ ДВА ЧАСА после обычного приема домашней пищи.'}
            </Typography>
            <Typography gutterBottom variant={'h6'} align={'center'}>
                {'Насколько вы ощущаете полноту в желудке?'}
            </Typography>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                <Typography width={'200px'} sx={{fontStyle: 'italic', color: '#548235', textAlign: 'end'}}>
                    {'Совсем не полный'}
                </Typography>
                <Slider
                    name='full'
                    value={formik.values.full || 0}
                    onChange={(event, newValue) => handleSliderChange(event, newValue, 'full')}
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
                <Typography width={'200px'} sx={{fontStyle: 'italic', color: '#548235', textAlign: 'start'}}>
                    {'Максимально полный'}
                </Typography>
            </Stack>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style = {!isMobile ? {width:'50%',paddingRight:'12px', boxSizing:'border-box'} : {width:'100%'}}>
                    <TextField
                      name='hungry'
                      fullWidth
                      sx={{marginBottom:'1rem'}}
                      InputProps={{
                          startAdornment: <InputAdornment position="start">{"Голод"}</InputAdornment>,
                      }}
                      variant="standard"
                      type="number"
                      value={formik.values.hungry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.hungry && Boolean(formik.errors.hungry)}
                      helperText={formik.touched.hungry && formik.errors.hungry}
                    />
                    <TextField
                      name='full'
                      fullWidth={true}
                      InputProps={{
                          startAdornment: <InputAdornment position="start">{"Полнота"}</InputAdornment>,
                      }}
                      variant="standard"
                      type="number"
                      sx={{marginBottom:'1rem'}}
                      value={formik.values.full}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.full && Boolean(formik.errors.full)}
                      helperText={formik.touched.full && formik.errors.full}
                    />
                    <Box sx={{position: 'relative', width: '100%'}}>
                        <Button type={'submit'} variant={'contained'} fullWidth={true} sx={buttonSx}
                                disabled={isPending}>{isFulfilled ? "Пересчитать" : 'Посчитать'}</Button>
                        {isPending && (
                          <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                          />
                        )}
                    </Box>
                </div>
                {response.result !== null && <Card sx = {!isMobile ? {width:'50%'} : {width:'100%'}}>
                    <CardContent>
                        <Typography>Показатель Фенотипа: <Typography variant={'h6'}
                                                                     sx={{fontWeight: 'bold'}}>{response.result}</Typography></Typography>
                        <Typography
                        >Заключение:<Typography variant={'h6'}
                                                sx={{fontWeight: 'bold'}}>{response.message}</Typography></Typography>
                    </CardContent>
                </Card>}

            </div>
        </form>
    </div>;
};
