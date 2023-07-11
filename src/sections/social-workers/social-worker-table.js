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
import UserMinusIcon from '@heroicons/react/24/solid/UserMinusIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import { API_URL } from "../../../config/constants";



export const SocialWorkerTable = (props) => {
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

  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);
  
  const filterItems = (items) => {
      return items.filter((item) => item.status === method)
  };

  const filteredItems = filterItems(items);


  const handleRemoveWorker = async (selectedWorkerId) => {
    // console.log("ID got in func: ", selectedWorkerId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_URL}admin/social-workers/${selectedWorkerId}`,
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


  const handleReaddWorker = async (selectedWorkerId) => {
    // console.log("ID got in func: ", selectedWorkerId);
    const axios = require('axios');
    const token = window.localStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}admin/social-worker-re-add/${selectedWorkerId}`,
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
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                {/* <TableCell>
                  Email
                </TableCell> */}
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                {/* <TableCell>
                  Signed Up
                </TableCell> */}
                <TableCell>
                  {
                    method === "active" ? "Remove" : "Readd"
                  }  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((worker) => {
                const isSelected = selected.includes(worker.id);
                // const createdAt = format(worker.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={worker._id}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={worker.avatar}>
                          {getInitials(worker.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {worker.name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {worker.city}
                    </TableCell>

                    <TableCell>
                      {worker.mobileNumber}
                    </TableCell>

                    <TableCell>
                      {method === "active" ?
                        <Button
                        onClick={() =>
                          handleRemoveWorker(worker._id)
                        }>
                          <SvgIcon
                            color="action"
                            fontSize="medium"
                          >
                            <UserMinusIcon />
                          </SvgIcon>
                        </Button>  
                      :
                        <Button
                        onClick={() =>
                          handleReaddWorker(worker._id)
                        }>
                          <SvgIcon
                            color="action"
                            fontSize="medium"
                          >
                            <UserPlusIcon />
                          </SvgIcon>
                        </Button>
                      }
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
  );
};

SocialWorkerTable.propTypes = {
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
