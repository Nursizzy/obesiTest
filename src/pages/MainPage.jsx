import logo from '../assets/nutristeppe_logo.svg'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { TEXT } from './constants.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { startDiagnostic } from '../store/slices/systemSlice.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const MainPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isStarted } = useSelector(state => state.system)
  const getStarted = () => {
    dispatch(startDiagnostic())
  }

  useEffect(() => {
    if (isStarted) navigate('/phenotypes')
  }, [isStarted])

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding:'1rem' }}>
      <img src={logo} alt={'...logo'} style={{maxWidth:'300px', maxHeight:'64px'}}/>
      <Typography sx={{ fontWeight: 'bold' }}>{TEXT.MAIN_PAGE.t1.toUpperCase()}</Typography>
      <Typography>{TEXT.MAIN_PAGE.t2}</Typography>
      <List>
        {TEXT.MAIN_PAGE.t3.map((item) => <ListItem>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
        </ListItem>)}
      </List>
      <Typography>{TEXT.MAIN_PAGE.t4}</Typography>
      <Typography>{TEXT.MAIN_PAGE.t5}</Typography>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button variant={'contained'} onClick={getStarted}>{'Начать диагностику'}</Button>
      </div>
    </Box>)
}