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
import EnvelopeIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import ChatBubbleBottomCenterTextIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';
import ViewComplaint from "./view-complaint";
import React from 'react';
import { API_URL } from "../../../config/constants";


export const ComplaintsTable = (props) => {
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
  // console.log("Items: ",items);
  console.log("Method: ",method);

  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);
  
  const filterItems = (items) => (items.filter((item) => item.resolved === method))

  const filteredItems = filterItems(items)

  // console.log("Items: ",items)
  console.log("filteredItems: ",filteredItems)

  const [selectedComplaint, setSelectedComplaint] = React.useState("");
  const [openViewComplaint, setOpenViewComplaint] = React.useState(false);

  const handleViewComplaint = (event, complaint) => {
    setSelectedComplaint(complaint);
    setOpenViewComplaint(true);
    // console.log("userID is: ",userId);
  };

  const handleCloseViewComplaint = () => {
    setOpenViewComplaint(false);
    // setSelectedNgoRequest(null)
  };


  const handleReadComplaint = async (selectedComplaintId) => {
    // console.log("ID got in func: ", selectedComplaintId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}projects/resolve-complain/${selectedComplaintId}`,
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


  return (
    <>
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  Project
                </TableCell>
                <TableCell>
                  NGO
                </TableCell>
                <TableCell>
                  Complained By
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  View Complaint
                </TableCell>
                <TableCell>
                  Mail NGO
                </TableCell>
                {method === false ? 
                  <TableCell>
                    Mark Read
                  </TableCell>
                :
                null
                }  
                
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((complaint) => {
                // const isSelected = selected.includes(complaint.id);
                const createdAt = format(new Date(complaint.createdAt), 'dd/MM/yyyy');

                // const createdAt = format(new Date(ngoRequest.createdAt), 'dd/MM/yyyy');


                return (
                  <TableRow
                    hover
                    key={complaint._id}
                  >

                    <TableCell>
                      {/* <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      > */}
                        {/* <Avatar src={complaint.avatar}>
                          {getInitials(complaint.name)}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {/* {complaint.project.name} */}
                        </Typography>
                      {/* </Stack> */}
                    </TableCell>
                    <TableCell>
                      {/* {complaint.project.ngo.name} */}
                    </TableCell>
                    <TableCell>
                      {complaint.socialWorker.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <Button
                      onClick={(event) =>
                        handleViewComplaint(event, complaint)
                      }>
                      <SvgIcon
                          color="action"
                          fontSize="medium"
                        >
                          <ChatBubbleBottomCenterTextIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button>
                      <SvgIcon
                          color="action"
                          fontSize="medium"
                        >
                          <EnvelopeIcon />
                        </SvgIcon>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                      onClick={() =>
                        handleReadComplaint(complaint._id)
                      }>
                      {
                        method === false ? 
                        <SvgIcon
                          color="action"
                          fontSize="medium"
                        >
                          <CheckIcon />
                        </SvgIcon>
                      :
                      //   <SvgIcon
                      //   color="action"
                      //   fontSize="medium"
                      // >
                      //   <TrashIcon />
                      // </SvgIcon>
                      null
                      }
                        {/* <UserMinusIcon /> */}
                      </Button>
                    </TableCell>
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

    {openViewComplaint && (
      <ViewComplaint
        openViewComplaint={openViewComplaint}
        selectedComplaint={selectedComplaint}
        handleCloseViewComplaint={handleCloseViewComplaint}
        // handleRowsUpdate={handleRowsUpdate}
      />
    )}
    </>
  );
};

ComplaintsTable.propTypes = {
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
