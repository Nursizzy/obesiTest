import React, { useState } from 'react'
import { Button, CardContent, FormControl, ListSubheader, MenuItem, MobileStepper, Paper, Select } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cancelDiagnostic } from '../store/slices/systemSlice.js'
import { clearState } from '../store/slices/phenotypesSlice.js'
import { Results } from './results.jsx'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useTranslation } from 'react-i18next'
import { LanguageComponent } from './language.jsx'

export const CustomMobileStepper = ({ steps }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = steps.length
  const { t, i18n } = useTranslation()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleStep = (event) => {
    const stepValue = event.target.value
    setActiveStep(stepValue)
    console.log(stepValue)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const goToResults = () => {

    setActiveStep(maxSteps)
  }

  const returnHome = () => {
    dispatch(cancelDiagnostic())
    dispatch(clearState())
    navigate('/')
  }

  return (<div style={{
    display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box',
  }}>
    {/* Mobile Stepper */}
    <Paper
      square
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: 50,
        pl: 2,
        pr: 2,
        bgcolor: '#548235',
        justifyContent: 'space-between',
      }}
    >
      <FormControl variant='standard' sx={{ m: 1, maxWidth: '100%' }}>
        <Select
          value={activeStep}
          onChange={(e) => handleStep(e)}
          sx={{
            color: 'white', // This changes the color of the selected value
            '.MuiSelect-icon': { color: 'white' }, // Optional: changes the dropdown icon color
          }}
        >
          <ListSubheader>{t("Категории")}</ListSubheader>
          {steps.map((step, index) =>
            <MenuItem value={index} key={index}>
              {t(step.label)}
            </MenuItem>,
          )}
          <ListSubheader>{t('Другое')}</ListSubheader>
          <MenuItem value={maxSteps} key={maxSteps}>
            {t('К результатам')}
          </MenuItem>
        </Select>
      </FormControl>
      {/*<Typography variant={'h6'} sx={{ color: 'white', fontWeight:'bold'}}>{activeStep === maxSteps ? 'Результаты' : steps[activeStep].label}</Typography>*/}
      <div style={{display:'flex', alignItems: 'center', gap:'12px'}}>
        <AssignmentIcon onClick={goToResults} sx={{ cursor: 'pointer', color: 'white'}} />
        <LanguageComponent notAbsolute={true}/>
      </div>

    </Paper>
    {/* Step Content */}
    <div style={{ overflowY: 'scroll', height: '100%' }}>
      {activeStep === maxSteps ? (<Results handleBack={handleBack} returnHome={returnHome} />) : (<div>
        <CardContent>
          {activeStep === maxSteps ?
            <Results handleBack={handleBack} returnHome={returnHome} /> : steps[activeStep].content}
        </CardContent>
      </div>)}
    </div>

    <MobileStepper
      variant='dots'
      steps={maxSteps}
      position='fixed'
      activeStep={activeStep}
      nextButton={<Button size='small' onClick={handleNext} disabled={activeStep === maxSteps}>

        {t(activeStep === maxSteps - 1 ? 'К результатам' : 'Следующий')}
        <KeyboardArrowRight />
      </Button>}
      backButton={<Button size='small' onClick={handleBack} disabled={activeStep === 0}>
        <KeyboardArrowLeft />
        {t('Предыдущий')}
      </Button>}
    />
  </div>)
}
