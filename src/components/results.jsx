import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import ErrorIcon from '@mui/icons-material/Error'
import { useTranslation } from 'react-i18next'

export const Results = ({ handleBack, returnHome }) => {
  const {
    calculateBMI: { response: bmiResponse },
    calculateBrainSatiation: { response: brainResponse },
    calculateIntestinesSatiation: { response: intestinesResponse },
    calculateEmotionalSatiation: { response: emotionalResponse },
    calculateEnergySatiation: { response: energyResponse },
  } = useSelector(state => state.phenotypes)


  const isAnyResponseNull = bmiResponse.result !== null || brainResponse.result !== null || intestinesResponse.result !== null || emotionalResponse.result !== null || energyResponse.result !== null

  const { t } = useTranslation()

  return (<Box sx={{ padding: '1rem' }}>
      <Typography variant={'h6'}
                  sx={{ fontWeight: 'bold' }}>{t('Общее заключение по оценке фенотипа ожирения')}</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '24px' }}>
        {!isAnyResponseNull && <div style={{ display: 'flex', gap: '1rem' }}>
          <ErrorIcon />
          <Typography>{t('Результатов еще нет. Завершите хотя бы одну диагностику, чтобы увидеть результаты.')}</Typography>
        </div>}
        {bmiResponse.result !== null && <Card sx={{ maxWidth: '400px' }}>
          <CardContent>
            <Typography variant={'h6'}
                        sx={{ fontWeight: 'bold' }}>{t('ИМТ')}</Typography>
            <Typography>{t('Показатель')}: <Typography variant={'h6'}
                                                       sx={{ fontWeight: 'bold' }}>{bmiResponse.result}</Typography></Typography>
            <Typography
            >{t('Заключение')}:<Typography variant={'h6'}
                                           sx={{ fontWeight: 'bold' }}>{t(bmiResponse.message)}</Typography></Typography>
          </CardContent>
        </Card>}

        {brainResponse.result !== null && <Card sx={{ maxWidth: '400px' }}>
          <CardContent variant='outlined'>
            <Typography variant={'h6'}
                        sx={{ fontWeight: 'bold' }}>{t('Фенотип')}: {t('Голодный мозг')}</Typography>
            <Typography>Показатель: <Typography variant={'h6'}
                                                sx={{ fontWeight: 'bold' }}>{brainResponse.result}</Typography></Typography>
            <Typography
            >{t('Заключение')}:<Typography variant={'h6'}
                                           sx={{ fontWeight: 'bold' }}>{t(brainResponse.message)}</Typography></Typography>
          </CardContent>
        </Card>}

        {intestinesResponse.result !== null && <Card sx={{ maxWidth: '400px' }}>
          <CardContent variant='outlined'>
            <Typography variant={'h6'}
                        sx={{ fontWeight: 'bold' }}>{t('Фенотип')}: {t('Голодный кишечник')}</Typography>
            <Typography>{t('Показатель')}: <Typography variant={'h6'}
                                                       sx={{ fontWeight: 'bold' }}>{intestinesResponse.result}</Typography></Typography>
            <Typography
            >{t('Заключение')}:<Typography variant={'h6'}
                                           sx={{ fontWeight: 'bold' }}>{t(intestinesResponse.message)}</Typography></Typography>
          </CardContent>
        </Card>}
        {emotionalResponse.result !== null && <Card sx={{ maxWidth: '400px' }}>
          <CardContent>
            <Typography variant={'h6'}
                        sx={{ fontWeight: 'bold' }}>{t('Фенотип')}: {t('Голодные эмоции')}</Typography>
            <Typography>Показатель: <Typography variant={'h6'}
                                                sx={{ fontWeight: 'bold' }}>{t('Уровень Тревоги')}: {emotionalResponse.result[0]}</Typography>
              <Typography variant={'h6'}
                          sx={{ fontWeight: 'bold' }}>{t('Уровень Депрессии')}: {emotionalResponse.result[1]}</Typography>
            </Typography>
            <Typography
            >{t(Заключение)}:<Typography variant={'h6'}
                                         sx={{ fontWeight: 'bold' }}>{t(emotionalResponse.message[0])}</Typography>
              <Typography variant={'h6'}
                          sx={{ fontWeight: 'bold' }}>{t(emotionalResponse.message[1])}</Typography></Typography>
          </CardContent>
        </Card>}
        {energyResponse.result !== null && <Card sx={{ maxWidth: '400px' }}>
          <CardContent variant='outlined'>
            <Typography variant={'h6'}
                        sx={{ fontWeight: 'bold' }}>{t('Фенотип')}: {t('Голодные мышцы')}</Typography>
            <Typography>{t('Показатель')}: <Typography variant={'h6'}
                                                       sx={{ fontWeight: 'bold' }}>{energyResponse.result}</Typography></Typography>
            <Typography
            >{t('Заключение')}:<Typography variant={'h6'}
                                           sx={{ fontWeight: 'bold' }}>{t(energyResponse.message)}</Typography></Typography>
          </CardContent>
        </Card>}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Button
          fullWidth
          onClick={handleBack}
          variant={'contained'}
          color={'secondary'}>
          {t('Вернуться назад чтобы пересчитать')}
        </Button>
        <Button onClick={returnHome} variant={'contained'} fullWidth>
          {t('Закончить и вернуться на главную')}
        </Button></div>
    </Box>)
}