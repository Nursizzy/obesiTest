import React, { useState } from 'react'
import { Box, Button, Divider, Step, StepContent, StepLabel, Stepper } from '@mui/material'
import logo from '../assets/nutristeppe_logo.svg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cancelDiagnostic } from '../store/slices/systemSlice.js'
import { clearState } from '../store/slices/phenotypesSlice.js'
import styled from './styled.module.css'
import { Results } from './results.jsx'

export const CustomStepper = ({ steps }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if(activeStep === steps.length - 1) handleFinish()
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setIsFinished(false)
  }

  const handleStep = (step) => () => {
    setActiveStep(step);
    setIsFinished(false)
  };

  const handleFinish = () => {
    setActiveStep(steps.length);
    setIsFinished(true)
  }


  const returnHome = () => {
    dispatch(cancelDiagnostic())
    dispatch(clearState())
    navigate('/')
  }

  return (<div className={styled.basicContainer}>
    {/*FIRST CONTAINTER*/}
    <div className={styled.stepperContainer}>
      <img src={logo} alt={'...logo'} onClick={returnHome}
           style={{ cursor: 'pointer' }} />
      <Stepper activeStep={activeStep} orientation='vertical' nonLinear>
        {steps.map((step, index) => (<Step key={step.name}>
          <StepLabel onClick={handleStep(index)} sx={{cursor:'pointer'}}>
            {step.name}
          </StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Закончить' : 'Продолжить'}
                </Button>

                {index !== 0 && <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Назад
                </Button>}

              </div>
            </Box>
          </StepContent>
        </Step>))}
      </Stepper>

      <Button variant={'contained'} onClick={handleFinish} disabled={isFinished}>К результатам</Button>
    </div>
    {/*FIRST CONTAINTER*/}
    {/*/////////////////////////*/}
    {/*SECOND CONTAINER*/}
    <Divider orientation={'vertical'} variant='fullWidth' flexItem={true}/>
    {/*SECOND CONTAINER*/}
    {/*/////////////////////////*/}
    {/*THIRD CONTAINER*/}
    <div className={styled.contentContainer}>
      {!isFinished ? steps[activeStep].content : <Results handleBack={handleBack} returnHome={returnHome} />}
    </div>
    {/*THIRD CONTAINER*/}
  </div>)
}
