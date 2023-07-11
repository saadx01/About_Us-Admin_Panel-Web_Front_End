import PropTypes from 'prop-types';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import NoSymbolIcon from '@heroicons/react/24/solid/NoSymbolIcon';
import ShieldCheckIcon from '@heroicons/react/24/solid/ShieldCheckIcon';
// import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { API_URL } from "../../../config/constants";

export const NgoCard = (props) => {
  const { ngo, rowsUpdate, setRowsUpdate } = props;

  const handleBanNgo = async (selectedNgoId) => {
    // console.log("ID got in func: ", selectedWorkerId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}ngos/ban-ngo/${selectedNgoId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      setRowsUpdate(!rowsUpdate);
      console.log("RowsUpdate changed to: ", rowsUpdate);
    } catch (error) {
      console.log(error);
    }
  };


  const handleUnbanNgo = async (selectedNgoId) => {
    // console.log("ID got in func: ", selectedWorkerId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}ngos/unban-ngo/${selectedNgoId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      setRowsUpdate(!rowsUpdate);
      console.log("RowsUpdate changed to: ", rowsUpdate);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={ngo.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {ngo.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {ngo.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ p: 2 }}
      >
        {ngo.status === "active"?
          <Button
          onClick={() =>
            handleBanNgo(ngo._id)}>
            <SvgIcon
              color="action"
              fontSize="small"
            >
              < NoSymbolIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
              pl={1}
            >
              Ban
            </Typography>
          </Button>
        :
          <Button
          onClick={() =>
            handleUnbanNgo(ngo._id)}>
            <SvgIcon
              color="action"
              fontSize="small"
            >
              < ShieldCheckIcon />
            </SvgIcon>
            <Typography
              color="text.secondary"
              display="inline"
              variant="body2"
              pl={1}
            >
              Unban
            </Typography>
          </Button>
        }


        {/* <Button>
          <SvgIcon
            color="action"
            fontSize="small"
          >
            < TrashIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
            pl={1}
          >
            Remove
          </Typography>
        </Button> */}
      </Stack>
    </Card>
  );
};

NgoCard.propTypes = {
  ngo: PropTypes.object.isRequired
};
