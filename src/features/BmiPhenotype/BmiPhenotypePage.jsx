import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addBMIData, addBmiResult, calculateBMI } from '../../store/slices/phenotypesSlice.js'
import * as yup from 'yup'
import { useFormik } from 'formik'
import imtLogo from '../../assets/imt_risunok.png'
import { green } from '@mui/material/colors'

const validationSchema = yup.object({
  weight: yup
    .number('Должна быть цифра')
    .required('Обязательное поле'), height: yup
    .number('Должна быть цифра')
    .required('Обязательное поле'),
})

const handleBMIResult = (result) => {
  console.log(result)
  if (result < 18.5) return 'Недостаточная масса тела'
  if (result >= 18.5 && result <= 24.9) return 'Нормальная масса тела'
  if (result >= 25 && result <= 29.9) return 'Избыточная масса тела'
  if (result >= 30 && result <= 34.9) return 'Ожирение 1 степени'
  if (result >= 35 && result <= 39.9) return 'Ожирение 2 степени'
  return 'Ожирение 3 степени' // For BMI >= 40
}


export const BmiPhenotypePage = () => {
  const dispatch = useDispatch()
  const { response, data, statuses: { isPending, isFulfilled } } = useSelector(state => state.phenotypes.calculateBMI)
  const handleCalculate = (values) => {
    dispatch(calculateBMI(values)).then((response) => dispatch(addBmiResult(handleBMIResult(response.payload?.result))))
    dispatch(addBMIData(values))
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const buttonSx = {
    ...(isFulfilled && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  const formik = useFormik({
    initialValues: data, validationSchema: validationSchema, onSubmit: (values) => {
      handleCalculate(values)
    },
  })

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
    <Typography>
      {'Индекс массы тела позволяет оценить соответствие вашего роста и веса. Рассчитав его, вы поймете, является ваш вес нормальным, избыточным или, наоборот, недостаточным. Данный показатель важен, в частности, для коррекции режима питания.'}
    </Typography>
    <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>
      {'Как посчитать ИМТ?'}
    </Typography>
    <Typography>
      {'Существует общепринятая формула, по которой рассчитывается индекс. Нужно свой вес в килограммах разделить на рост в квадрате.'}
    </Typography>
    <Typography sx={{ fontWeight: 'bold' }}>
      {'ИМТ = вес(кг) / рост(см)²'}
    </Typography>
    <img src={imtLogo} alt={'...'} style ={{maxWidth: '28rem'}} height={'auto'} />
    <Typography>
      {'Чтобы рассчитать индекс массы тела для женщин и мужчин в онлайн-калькуляторе, введите данные вашего роста и веса в две ячейки, задав свой рост в сантиметрах, а вес в килограммах. Результат вы получите моментально - индекс рассчитывается автоматически.'}
    </Typography>
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      <form onSubmit={formik.handleSubmit} style = {!isMobile ? {width:'50%', paddingRight:'12px', boxSizing:'border-box'} : {width:'100%'}}>
        <TextField
          fullWidth
          label='Вес'
          name='weight'
          id='standard-start-adornment'
          sx={{marginBottom:'1rem'}}
          InputProps={{
            startAdornment: <InputAdornment position='start'>Кг</InputAdornment>,
          }}
          variant='standard'
          type='number'
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={formik.touched.weight && formik.errors.weight}
        />
        <TextField
          fullWidth
          label='Рост'
          name='height'
          id='standard-start-adornment'
          sx={{marginBottom:'1rem'}}
          InputProps={{
            startAdornment: <InputAdornment position='start'>См</InputAdornment>,
          }}
          variant='standard'
          type='number'
          value={formik.values.height}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && formik.errors.height}
        />
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Button type={'submit'} variant={'contained'} fullWidth={true} sx={buttonSx}
                  disabled={isPending}>{isFulfilled ? 'Пересчитать' : 'Посчитать'}</Button>
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
      </form>
      {response.result !== null && <Card sx = {!isMobile ? {width:'50%'} : {width:'100%'}}><CardContent>
        <Typography>Показатель ИМТ: <Typography variant={'h6'}
                                                sx={{ fontWeight: 'bold' }}>{response.result}</Typography></Typography>
        <Typography
        >Заключение:<Typography variant={'h6'}
                                sx={{ fontWeight: 'bold' }}>{response.message}</Typography></Typography>
      </CardContent>
      </Card>}
    </div>
  </div>
}
