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
    method
  } = props;
  // console.log("Method: ",method)

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  
  const filterItems = (items) => (items.filter((item) => item.status === method))


  const filteredItems = filterItems(items)
  // console.log("Items: ",items)
  // console.log("filteredItems: ",filteredItems)

  return (
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
                  View Complain
                </TableCell>
                <TableCell>
                  Mail NGO
                </TableCell>
                <TableCell>
                  {
                    method === "new" ? "Mark Read" : "Delete"
                  }  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((complaint) => {
                const isSelected = selected.includes(complaint.id);
                const createdAt = format(complaint.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={complaint.id}
                    selected={isSelected}
                    // onClick ={
                    //   () => {
                    //     console.log(complaint.id, " Row clicked.")
                    //   }
                    // }
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(complaint.id);
                          } else {
                            onDeselectOne?.(complaint.id);
                          }
                        }}
                      />
                    </TableCell> */}
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
                          {complaint.name}
                        </Typography>
                      {/* </Stack> */}
                    </TableCell>
                    <TableCell>
                      {complaint.email}
                    </TableCell>
                    <TableCell>
                      {complaint.address.city}, {complaint.address.state}, {complaint.address.country}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <Button>
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
                      <Button>
                      {
                        method === "new" ? 
                        <SvgIcon
                          color="action"
                          fontSize="medium"
                        >
                          <CheckIcon />
                        </SvgIcon>:
                        <SvgIcon
                        color="action"
                        fontSize="medium"
                      >
                        <TrashIcon />
                      </SvgIcon>
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
