import { createBrowserRouter } from 'react-router-dom'
import {
  BmiPhenotypePage,
  EnergyMetabolismPhenotypePage,
  FoodEmotionalResponsePhenotypePage,
  PostMealSatietyPhenotypePage,
  SatiationPhenotypePage,
} from '../features'
import { MainPage } from '../pages/MainPage.jsx'
import { DiagnosticPage } from '../pages/DiagnosticPage.jsx'


export const router = createBrowserRouter([{
    path: "/", element: <MainPage/>,
}, {
    path: "/phenotypes", element: <DiagnosticPage/>, children: [{
        path: "/phenotypes/bmi", element: <BmiPhenotypePage/>,
    }, {
        path: "/phenotypes/satiation", element: <SatiationPhenotypePage/>,
    }, {
        path: "/phenotypes/postMealSatiation", element: <PostMealSatietyPhenotypePage/>,
    }, {
        path: "/phenotypes/foodEmotion", element: <FoodEmotionalResponsePhenotypePage/>,
    }, {
        path: "/phenotypes/energyMetabolism", element: <EnergyMetabolismPhenotypePage/>,
    },],
},]);