import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../../config/constants";

export default function SendEmailForm({
  openSendEmail,
  setOpenSendEmail,
  selectedNgoEmail,
}) {
  const [newEmail, setNewEmail] = React.useState({});

  const handleClose = () => {
    setOpenSendEmail(false);
  };

  const handleSubjectChange = (e) => {
    setNewEmail({ ...newEmail, subject: e.target.value });
  };

  const handleTextChange = (e) => {
    setNewEmail({ ...newEmail, text: e.target.value });
  };

  const handleSendEmail = () => {
    const token = window.localStorage.getItem('token');
    const data = JSON.stringify({
      email: selectedNgoEmail,
      subject: newEmail.subject,
      text: newEmail.text,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}admin/mail-ngo`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Add new asset pop up form*/}
      <Dialog open={openSendEmail} onClose={handleClose}>
        <DialogTitle>Write Mail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the subject and message.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
            value={newEmail.subject || ""}
            onChange={(event) => handleSubjectChange(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={newEmail.text || ""}
            onChange={(event) => handleTextChange(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleSendEmail();
              handleClose();
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}







// import React from "react";

// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Button } from "@mui/material";
// import axios from "axios";
// // import { API_URL } from "../../config/constants"

// export default function AddAssetForm({
//   openSendEmail,
//   setOpenSendEmail,
//   selectedNgoEmail
// }) {


//     const [newEmail, setNewEmail] = React.useState({});


//   const handleClose = () => {
//     setOpenSendEmail(false);
//   };


//   const handleTitleChange = (e) => {
//     setNewEmail({ ...newEmail, subject: e.target.value });
//   };

//   const handleRemarksChange = (e) => {
//     setNewEmail({ ...newEmail, text: e.target.value });
//   };



//   const handleSendEmail = () => {

//   };


//   return (
//     <>
//       {/* Add new asset pop up form*/}
//       <Dialog open={openSendEmail} onClose={handleClose}>
//         <DialogTitle>Write Mail</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Enter the the subject and message.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin='dense'
//             id='subject'
//             label='Subject'
//             type='text'
//             fullWidth
//             variant='standard'
//             value={newEmail.subject || ""}
//             onChange={(event) => handleSubjectChange(event)}
//           />

//           <TextField
//             autoFocus
//             margin='dense'
//             id='text'
//             label='Message'
//             type='text'
//             fullWidth
//             variant='standard'
//             value={newEmail.text || ""}
//             onChange={(event) => handleTextChange(event)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button
//             onClick={() => {
//               handleSendEmail();
//               handleClose();
//             }}>
//             Send
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }