import { IconButton, Menu, MenuItem } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { changeSystemLanguage } from '../store/slices/systemSlice.js'
import { useDispatch, useSelector } from 'react-redux'

export const LanguageComponent = ({
                                    notAbsolute = false ,
                                  }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const currentLanguage = useSelector((state) => state.system.language)
  const dispatch = useDispatch()

  useEffect(() => {
    i18next.changeLanguage(currentLanguage)
  }, [currentLanguage])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = (language) => {
    dispatch(changeSystemLanguage(language))
    handleClose()
  }

  return (<div style={notAbsolute ? {} : { position: 'absolute', top: '0', right: '0' }}>
    <IconButton aria-label='language' aria-controls='language-menu' aria-haspopup='true' onClick={handleClick}>
      <LanguageIcon />
    </IconButton>
    <Menu
      id='language-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
      <MenuItem onClick={() => changeLanguage('ru')}>Русский</MenuItem>
    </Menu>
  </div>)
}