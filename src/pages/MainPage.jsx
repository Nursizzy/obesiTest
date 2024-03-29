import logoRu from '../assets/nutristeppe_logo_ru.svg'
import logoEn from '../assets/nutristeppe_logo_en.svg'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { TEXT } from './constants.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { startDiagnostic } from '../store/slices/systemSlice.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageComponent } from '../components/language.jsx'


export const MainPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isStarted } = useSelector(state => state.system)
  const getStarted = () => {
    dispatch(startDiagnostic())
  }

  const { t, i18n } = useTranslation()


  useEffect(() => {
    if (isStarted) navigate('/phenotypes')
  }, [isStarted])
  const currentLanguage = i18n.language
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', position: 'relative' }}>
      <img src={currentLanguage === 'ru' ? logoRu : logoEn} alt={'...logo'}
           style={{ maxWidth: '300px', maxHeight: '64px' }} />
      <Typography sx={{ fontWeight: 'bold' }}>{t(TEXT.MAIN_PAGE.t1)}</Typography>
      <Typography>{t(TEXT.MAIN_PAGE.t2)}</Typography>
      <List>
        {TEXT.MAIN_PAGE.t3.map((item) => <ListItem>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText>{t(item.name)}</ListItemText>
        </ListItem>)}
      </List>
      <Typography>{t(TEXT.MAIN_PAGE.t4)}</Typography>
      <Typography>{t(TEXT.MAIN_PAGE.t5)}</Typography>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button variant={'contained'} onClick={getStarted}>{t('Начать диагностику')}</Button>
      </div>
      <LanguageComponent />
    </Box>)
}