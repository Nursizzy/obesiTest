import { Slider, Typography } from '@mui/material'
import { marks, TEXT } from '../constants.jsx'

export const StepTwo = () => {
    return (<>
            <Typography variant={'h5'}>{TEXT.STEP_TWO.TITLE}</Typography>
            <Typography id="input-slider" gutterBottom>
                Насколько вы ощущаете чувство голода?
            </Typography>
            <Slider
                aria-label="Satisfaction"
                defaultValue={50}
                valueLabelDisplay="auto"
                step={10}
                marks={marks}
                min={0}
                max={100}
            />
            <Typography id="input-slider" gutterBottom>
                Насколько вы ощущаете полноту в желудке?
            </Typography>
            <Slider
                aria-label="Satisfaction"
                defaultValue={50}
                valueLabelDisplay="auto"
                step={10}
                marks={marks}
                min={0}
                max={100}
            />
        </>);
};
