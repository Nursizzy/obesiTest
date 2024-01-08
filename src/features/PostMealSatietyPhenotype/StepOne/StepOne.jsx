import { Slider, Typography } from '@mui/material'
import { marks } from '../constants'

export const StepOne = () => {
  return (
    <>
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
    </>
  );
};
