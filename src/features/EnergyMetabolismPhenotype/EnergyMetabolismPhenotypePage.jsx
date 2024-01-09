import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { addEnergyData, addEnergySatiationResult } from '../../store/slices/phenotypesSlice.js'
import { green } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

const validationSchema = yup.object({
  bmr: yup
    .number('Должна быть цифра')
    .required('Обязательное поле'), gender: yup
    .boolean('Ошибка пола')
    .required('Обязательное поле'), height: yup
    .number('Должна быть цифра')
    .required('Обязательное поле'), weight: yup
    .number('Должна быть цифра')
    .required('Обязательное поле'),
})

export const EnergyMetabolismPhenotypePage = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [mifflinResult, setMifflinResult] = useState(null)
  const {
    response,
    data,
    statuses: { isFulfilled, isPending },
  } = useSelector(state => state.phenotypes.calculateEnergySatiation)
  const handleCalculate = (values) => {
    const { bmr, gender, height, weight, age } = values
    const mifflinResult = gender ? ((9.99 * weight) + (6.25 * height) - (4.92 * age) + 5) : setMifflinResult((9.99 * weight) + (6.25 * height) - (4.92 * age) - 161)
    const result = (bmr / mifflinResult * 100).toFixed(2)
    dispatch(addEnergyData(values))
    setMifflinResult(mifflinResult.toFixed(2))
    dispatch(addEnergySatiationResult({
      result: result,
      message: result > 94 && result < 101 ? 'У пациента нет признаков аномального энергетического обмена' : 'У пациента есть признаки аномального энергетического обмена',
    }))
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const formik = useFormik({
    initialValues: data, validationSchema: validationSchema, onSubmit: (values) => {
      handleCalculate(values)
    },
  })

  const buttonSx = {
    ...(isFulfilled && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Typography>
      {t('Диагностика нарушений, связанных со снижением скорости обмена веществ (метаболизма), в результате чего энергия, поступающая с пищей, неравномерно распределяется в организме, в меньшей степени снабжая мыщцы и скапливаясь в жировой ткани.')}
    </Typography>
    <Typography variant={'h6'} sx={{ fontWeight: 'bold' }}>{t('Как выявить фенотип:')}</Typography>
    <Typography>
      {t('Для данного вида диагностики после 8-часового ночного голодания (утром натощак) необходимо пройти Биоимпедансометрию - анализ количества жира и жидкости в организме, мышечной и костной массы и метаболизма. Это можно сделать с помощью прибора InBody 770 или 970.')}
    </Typography>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <form onSubmit={formik.handleSubmit}
            style={!isMobile ? { width: '50%', paddingRight: '12px', boxSizing: 'border-box' } : { width: '100%' }}>
        <TextField
          fullWidth
          label={t('Показатель BMR InBody')}
          name='bmr'
          InputProps={{
            startAdornment: <InputAdornment position='start'>BMR</InputAdornment>,
          }}
          sx={{ marginBottom: '1rem' }}
          variant='standard'
          type='number'
          value={formik.values.bmr}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bmr && Boolean(formik.errors.bmr)}
          helperText={formik.touched.bmr && t(formik.errors.bmr)}
        />
        <TextField
          label={t('Рост')}
          fullWidth
          name='height'
          id='standard-start-adornment'
          InputProps={{
            startAdornment: <InputAdornment position='start'>{t('См')}</InputAdornment>,
          }}
          sx={{ marginBottom: '1rem' }}
          variant='standard'
          type='number'
          value={formik.values.height}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && t(formik.errors.height)}
        />
        <TextField
          label={t('Возраст')}
          fullWidth
          name='age'
          id='standard-start-adornment'
          InputProps={{
            startAdornment: <InputAdornment position='start'>{t('Лет')}</InputAdornment>,
          }}
          sx={{ marginBottom: '1rem' }}
          variant='standard'
          type='number'
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && t(formik.errors.age)}
        />
        <TextField
          fullWidth
          label={t('Вес')}
          name='weight'
          id='standard-start-adornment'
          InputProps={{
            startAdornment: <InputAdornment position='start'>{t('Кг')}</InputAdornment>,
          }}
          sx={{ marginBottom: '1rem' }}
          variant='standard'
          type='number'
          value={formik.values.weight}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={formik.touched.weight && t(formik.errors.weight)}
        />
        <FormControlLabel
          sx={{ marginBottom: '1rem' }}
          control={<Switch
            checked={formik.values.gender}
            onChange={formik.handleChange}
            name='gender'
          />}
          label={t(formik.values.gender ? 'Мужчина' : 'Женщина')}
        />
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Button type={'submit'} variant={'contained'} fullWidth={true} sx={buttonSx}
                  disabled={isPending}>{t(isFulfilled ? 'Пересчитать' : 'Посчитать')}</Button>
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
      {response.result !== null && <Card sx={!isMobile ? { width: '50%' } : { width: '100%' }}>

        <CardContent>
          <Typography>{t('Показатель BMR по уравнению Mifflin-St Jeor')}: <Typography variant={'h6'}
                                                                                      sx={{ fontWeight: 'bold' }}>{mifflinResult}</Typography></Typography>
          <Typography>{t('Соотношение BMR INBODY/MIFFLIN-ST JEOR')}: <Typography variant={'h6'}
                                                                                 sx={{ fontWeight: 'bold' }}>{response.result}%</Typography></Typography>
          <Typography
          >{t('Заключение')}:<Typography variant={'h6'}
                                         sx={{ fontWeight: 'bold' }}>{t(response.message)}</Typography></Typography>
        </CardContent>
      </Card>}
    </div>
  </div>
}
