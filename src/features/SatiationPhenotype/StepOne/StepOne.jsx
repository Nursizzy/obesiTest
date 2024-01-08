import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { TEXT } from '../constants.jsx'

export const StepOne = () => {
    return <>
        <Typography variant={'h5'}>
            {TEXT.STEP_ONE.TITLE}
        </Typography>
        <List>
            {TEXT.STEP_ONE.CONTENT.map((item) =>
                <ListItem>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name}/>
                </ListItem>
            )}

        </List>
    </>
}

