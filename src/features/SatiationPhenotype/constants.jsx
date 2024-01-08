import ChairIcon from '@mui/icons-material/Chair'
import InfoIcon from '@mui/icons-material/Info'

export const TEXT = {
    DESCRIPTION:
        "Выявление пациентов, которые обычно не испытывают чувства насыщения или полноты после стандартного приема пищи дома, что указывает на нарушенный процесс насыщения.",
    STEP_ONE: {
        TITLE: "Подготовка пациента:",
        CONTENT: [
            {name: 'Обеспечьте комфортное состояние пациента.', icon: <ChairIcon/>},
            {name:'Проинформируйте пациента о том, что ему предстоит ответить на вопросы о его обычных ощущениях голода и полноты до и после стандартного приема пищи дома.' , icon: <InfoIcon/>}
        ]
    },
    STEP_TWO: {
        TITLE: 'Оценка по Визуальной Аналоговой Шкале (ВАШ)'
    }

};


export const marks = [
    {
        value: 0,
        label: "0",
    },
    {
        value: 25,
        label: "25",
    },
    {
        value: 50,
        label: "50",
    },
    {
        value: 75,
        label: "75",
    },
    {
        value: 100,
        label: "100",
    },

];