import {
  BmiPhenotypePage,
  EnergyMetabolismPhenotypePage,
  FoodEmotionalResponsePhenotypePage,
  PostMealSatietyPhenotypePage,
  SatiationPhenotypePage,
} from '../features'
import { CustomStepper } from '../components/stepper.jsx'
import { CustomMobileStepper } from '../components/mobile-stepper.jsx'
import { useMediaQuery, useTheme } from '@mui/material'

const Navigation = [{
  name: 'Индекс массы тела', content: <BmiPhenotypePage />, id: 2, label: 'ИМТ',
}, { name: 'Фенотип аномального насыщения', content: < SatiationPhenotypePage />, id: 3, label: 'Голодный мозг' }, {
  name: 'Фенотип послепищевой аномальной сытости',
  content: <PostMealSatietyPhenotypePage />,
  id: 1,
  label: 'Голодный кишечник',
}, {
  name: 'Фенотип аномальной эмоциональной реакции на пищу',
  content: <FoodEmotionalResponsePhenotypePage />,
  id: 4,
  label: 'Голодные эмоции',
}, {
  name: 'Фенотип аномального энергетического обмена',
  content: <EnergyMetabolismPhenotypePage />,
  id: 5,
  label: 'Голодные мышцы',
}]

export const DiagnosticPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (<>
    {isMobile ? <CustomMobileStepper steps={Navigation} /> : <CustomStepper steps={Navigation} />}
  </>)
}