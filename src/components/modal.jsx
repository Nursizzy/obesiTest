import { Box, Modal } from '@mui/material'

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  width: '75%',
};
export const CustomModal = ({ openState, onClose, children }) => {
  return (
    <Modal
    open={openState}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    position= 'center'
    >
      <Box sx={styleModal}>{children}</Box>
    </Modal>
  );
};
