import React, { useEffect } from 'react'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';

export default function ViewRequestForm({openViewRequest, selectedNgoRequest, handleCloseViewRequest}) {

  return (
    <>
        <Dialog open={openViewRequest} onClose={handleCloseViewRequest}>
        <DialogTitle>{selectedNgoRequest.name} Join Request</DialogTitle>
            <DialogContent dividers>
                {/* <DialogContentText>
                    Edit the below information for the selected asset.
                </DialogContentText> */}
                <Box sx={{ mt: 3, minWidth: 400 }}>
                    <Typography variant="h6">
                        Name: 
                    </Typography>
                    <Typography variant="body1">
                        {selectedNgoRequest.name}
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">
                        Registeration Council: 
                    </Typography>
                    <Typography variant="body1">
                        {selectedNgoRequest.registrationCouncil}
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">
                        Registration No: 
                    </Typography>
                    <Typography variant="body1">
                        {selectedNgoRequest.registrationNumber}
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">
                        Head Name: 
                    </Typography>
                    <Typography variant="body1">
                        {selectedNgoRequest.ownerName}
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">
                        Head CNIC No: 
                    </Typography>
                    <Typography variant="body1">
                        {selectedNgoRequest.cnic}
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">
                        Head Phone No: 
                    </Typography>
                    <Typography variant="body1">
                        {selectedNgoRequest.phoneNumber}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseViewRequest}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}