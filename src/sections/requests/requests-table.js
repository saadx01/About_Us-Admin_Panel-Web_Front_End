import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import DocumentIcon from '@heroicons/react/24/solid/DocumentIcon';
import React from 'react';
import ViewRequestForm from "./view-request-form";
import { API_URL } from "../../../config/constants";


export const RequestsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    method,
    rowsUpdate,
    setRowsUpdate
  } = props;


  const handleApproveRequest = async (selectedNgoRequestId) => {
    // console.log("ID got in func: ", selectedNgoRequestId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}ngos/approve-ngo/${selectedNgoRequestId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setRowsUpdate(!rowsUpdate);
      // console.log("RowsUpdate changed to: ", rowsUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleRejectRequest = async (selectedNgoRequestId) => {
    console.log("ID got in func: ", selectedNgoRequestId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}ngos/reject-ngo/${selectedNgoRequestId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setRowsUpdate(!rowsUpdate);
      // console.log("RowsUpdate changed to: ", rowsUpdate);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDeleteRequest = async (selectedNgoRequestId) => {
    // console.log("ID got in func: ", selectedNgoRequestId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_URL}ngos/delete-ngo/${selectedNgoRequestId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));
      setRowsUpdate(!rowsUpdate);
      // console.log("RowsUpdate changed to: ", rowsUpdate);
    } catch (error) {
      console.log(error);
    }
  };






  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);
  
  const filterItems = (items) => (items.filter((item) => item.status === method))


  const filteredItems = filterItems(items)
  // console.log("Items: ",items)
  // console.log("filteredItems: ",filteredItems)

  const showSelectiveApproveHeader = () => {
    if(method === 'pending' || method === 'rejected')
      return <TableCell>
        Approve
      </TableCell>
  }
  const showSelectiveRejectedHeader = () => {
    if(method === 'pending')
      return <TableCell>
        Reject
      </TableCell>
    // else if(method === 'rejected' || method === 'active')
    else if(method === 'rejected')
      return <TableCell>
        Delete
      </TableCell>
  }

  const showSelectiveCheckIcon = (selectedNgoRequestId) => {
    // console.log("Inside func")
    if (method === 'pending' || method === 'rejected')
      return <TableCell>
        <Button
        onClick={() => handleApproveRequest(selectedNgoRequestId)}>
          <SvgIcon
            color="action"
            fontSize="medium"
          >
            <CheckIcon />
          </SvgIcon>
        </Button>
      </TableCell>
  }

  const showSelectiveRejectDeleteIcon = (selectedNgoRequestId) => {
    if (method === 'pending')
      return <TableCell>
        <Button
        onClick={() => handleRejectRequest(selectedNgoRequestId)}>
          <SvgIcon
            color="action"
            fontSize="medium"
          >
            <XMarkIcon />
          </SvgIcon>
        </Button>
      </TableCell>
    // else
    else if (method === 'rejected')
      return <TableCell>
      <Button
      onClick={() => handleDeleteRequest(selectedNgoRequestId)}>
        <SvgIcon
          color="action"
          fontSize="medium"
        >
          <TrashIcon />
        </SvgIcon>
      </Button>
    </TableCell>
  }

  const [selectedNgoRequest, setSelectedNgoRequest] = React.useState("");
  const [openViewRequest, setOpenViewRequest] = React.useState(false);

  const handleShowRequest = (event, ngoRequest) => {
    setSelectedNgoRequest(ngoRequest);
    setOpenViewRequest(true);
    // console.log("userID is: ",userId);
  };

  const handleCloseViewRequest = () => {
    setOpenViewRequest(false);
    // setSelectedNgoRequest(null)
  };

  return (
    <>
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  NGO
                </TableCell>
                <TableCell>
                  View Request Form
                </TableCell>
                {/* <TableCell>
                  Mail NGO
                </TableCell> */}
                {showSelectiveApproveHeader()}
                {showSelectiveRejectedHeader()}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log("Filtered Items", filteredItems)} */}
              {filteredItems.map((ngoRequest) => {
                const isSelected = selected.includes(ngoRequest.id);
                const createdAt = format(new Date(ngoRequest.createdAt), 'dd/MM/yyyy');
                // console.log("NGO: ", ngoRequest)

                return (
                  <TableRow
                    hover
                    key={ngoRequest._id}
                    selected={isSelected}
                  >
                    <TableCell>
                        {/* <Avatar src={ngoRequest.avatar}>
                          {getInitials(ngoRequest.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {ngoRequest.name}
                        </Typography>
                      {/* </Stack> */}
                    </TableCell>
                    <TableCell>
                      <Button
                      onClick={(event) =>
                        handleShowRequest(event, ngoRequest)
                      }>
                        <SvgIcon
                            color="action"
                            fontSize="medium"
                        >
                          <DocumentIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell>
                    {/* <TableCell>
                      <Button>
                      <SvgIcon
                          color="action"
                          fontSize="medium"
                        >
                          <EnvelopeIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell> */}
                    {showSelectiveCheckIcon(ngoRequest._id)}
                    {showSelectiveRejectDeleteIcon(ngoRequest._id)}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

    {openViewRequest && (
      <ViewRequestForm
        openViewRequest={openViewRequest}
        handleCloseViewRequest={handleCloseViewRequest}
        selectedNgoRequest={selectedNgoRequest}
        // handleRowsUpdate={handleRowsUpdate}
      />
    )}
    </>
    
  );
};

RequestsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
