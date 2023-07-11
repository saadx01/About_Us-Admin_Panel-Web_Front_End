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

export default function ViewComplaint({openViewComplaint, selectedComplaint, handleCloseViewComplaint}) {

  return (
    <>
        <Dialog open={openViewComplaint} onClose={handleCloseViewComplaint}>
        <DialogTitle>Complaint</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1">
                    {selectedComplaint.text}
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseViewComplaint}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}