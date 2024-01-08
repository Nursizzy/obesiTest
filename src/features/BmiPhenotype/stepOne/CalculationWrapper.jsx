import { Button, InputAdornment, TextField } from '@mui/material'

export const StepOne = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Вес"
        id="standard-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Кг</InputAdornment>,
        }}
        variant="standard"
        type="number"
      />
      <TextField
        label="Рост"
        id="standard-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">См</InputAdornment>,
        }}
        variant="standard"
        type="number"
      />
      <Button variant="contained">
        Посчитать
      </Button>
    </div>
  );
};
