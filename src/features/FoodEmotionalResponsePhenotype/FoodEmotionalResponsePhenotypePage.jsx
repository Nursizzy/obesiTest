import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  addEmotionsData,
  calculateEmotionSatiation,
  fetchQuestions,
  setCurrentQuestionIndex,
} from '../../store/slices/phenotypesSlice.js'


function LinearProgressWithLabel(props) {
  return (<Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant='determinate' {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant='body2' color='text.secondary'>{`${Math.round(props.value)}%`}</Typography>
    </Box>
  </Box>)
}

const Question = ({ question, selectedValue, onChange }) => {
  return (<FormControl component='fieldset' margin='normal'>
    <FormLabel component='legend' sx={{ fontWeight: 'bold' }}>{question.name}</FormLabel>
    <RadioGroup
      name={question.key}
      value={selectedValue || ''}
      onChange={(e) => onChange(question.key, e.target.value)}
    >
      {question.variants.map((variant) => (<FormControlLabel
        key={variant.id}
        value={variant.value.toString()}
        control={<Radio />}
        label={variant.name}
      />))}
    </RadioGroup>
  </FormControl>)
}

// Main Questionnaire Component
const Questionnaire = ({ questions = [], handleProgressBack, handleProgressNext }) => { // Set a default empty array if questions is undefined


  const { response, data, currentQuestionIndex } = useSelector(state => state.phenotypes.calculateEmotionalSatiation)
  const [answers, setAnswers] = useState(data)
  const handleChange = (key, value) => {
    setAnswers({
      ...answers, [key]: value,
    })
  }
  const dispatch = useDispatch()
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1))
      handleProgressNext()
    } else {
      handleProgressNext()
      dispatch(calculateEmotionSatiation(answers))
      dispatch(addEmotionsData(answers))
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1))
      handleProgressBack()
    }
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isAnswerSelected = answers[questions[currentQuestionIndex]?.key] !== undefined

  return ( <>
    {questions.length > 0 && (<div  style = {!isMobile ? {width:'50%', paddingRight:'12px', boxSizing:'border-box'} : {width:'100%'}}>
      <Question
        question={questions[currentQuestionIndex]}
        selectedValue={answers[questions[currentQuestionIndex].key]}
        onChange={handleChange}
      />
      <div style={{display: 'flex', gap:'1rem'}}>
        <Button variant ={'contained'} onClick={handleBack} disabled={currentQuestionIndex === 0}>
          Предыщущий вопрос
        </Button>
        {currentQuestionIndex === questions.length - 1 ? <Button onClick={handleNext}  variant ={'contained'} disabled={!isAnswerSelected}>
          Закончить
        </Button> : <Button variant ={'contained'} onClick={handleNext} disabled={!isAnswerSelected}>
          Следующий вопрос
        </Button>}
      </div>
    </div>)}
    {response.result && <Card sx = {!isMobile ? {width:'50%'} : {width:'100%'}}>

      <CardContent>
        <Typography>Показатель Фенотипа: <Typography variant={'h6'}
                                                     sx={{ fontWeight: 'bold' }}>Уровень
          Тревоги: {response.result[0]}</Typography>
          <Typography variant={'h6'}
                      sx={{ fontWeight: 'bold' }}>Уровень Депрессии: {response.result[1]}</Typography>
        </Typography>
        <Typography
        >Заключение:<Typography variant={'h6'}
                                sx={{ fontWeight: 'bold' }}>{response.message[0]}</Typography>
          <Typography variant={'h6'}
                      sx={{ fontWeight: 'bold' }}>{response.message[1]}</Typography></Typography>
      </CardContent>
    </Card>}
    {/* Optionally, add a submit button or other components here */}
  </>)
}

export const FoodEmotionalResponsePhenotypePage = () => {
  const dispatch = useDispatch()
  const { questions, currentQuestionIndex } = useSelector(state => state.phenotypes.calculateEmotionalSatiation)
  const totalQuestions = questions?.length
  // Calculate the step size for each question
  const stepSize = totalQuestions > 0 ? 100 / totalQuestions : 0

  // Initial progress calculation
  const [progress, setProgress] = useState(currentQuestionIndex * stepSize)

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {

      setProgress((prevProgress) => Math.min(prevProgress + stepSize, 100))
    } else {
      setProgress(100)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setProgress((prevProgress) => Math.max(prevProgress - stepSize, 0))
    }
  }
  useEffect(() => {
    dispatch(fetchQuestions())
  }, [])

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
    <Typography>
      {'Диагностика данного вида аномалий основана на оценке психологической реакции на позитивные или отрицательные эмоции, связанной с возникновением желания частого приема закусок в промежутках между основными приемами пищи.'}
    </Typography>
    <Typography>{'Для этого используется шкала тревоги и депресии.'}</Typography>
    <Typography>
      {'Внимательно подумайте над каждым вопросом и выберите по одному ответу.'}
    </Typography>
    <LinearProgressWithLabel value={progress} />
    <Questionnaire questions={questions} handleProgressNext={handleNext} handleProgressBack={handleBack} />
  </div>
}
