import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
// import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Stack, SvgIcon, Tab, Tabs, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SocialWorkerTable } from 'src/sections/social-workers/social-worker-table';
import { SocialWorkerSearch } from 'src/sections/social-workers/social-worker-search';
import { applyPagination } from 'src/utils/apply-pagination';
import axios from 'axios';
import { API_URL } from "../../config/constants";


// const now = new Date();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [method, setMethod] = useState('active');
  const [rowsUpdate, setRowsUpdate] = React.useState(false);



  const getSocialWorkers = () => {
    const token = window.localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}admin/social-workers/`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setData(response.data.socialWorkers);
        // console.log("Social workers request: ", response.data.socialWorkers)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }

  useEffect(() => {
    getSocialWorkers();
  }, [rowsUpdate]);

  const filterData = (data) => {
    return data.filter((data) => data.status === method)
  };

  const filteredData = filterData(data);
  console.log("Filtered Data: ", filteredData)

  const useData = useMemo(() => {
    return applyPagination(filteredData, page, rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const customersIds = useMemo(() => {
    return data.map((customer) => customer.id);
  }, [data]);

  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
    setPage(0);
  }, []);


  return (
    <>
      <Head>
        <title>Social Workers | About Us</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Social Workers</Typography>
              </Stack>
            </Stack>
            <SocialWorkerSearch />

            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Active" value="active" />
              <Tab label="Removed" value="removed" />
            </Tabs>

            <SocialWorkerTable
              count={filteredData.length}
              // items={useData}
              filteredItems={useData}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              method={method}
              rowsUpdate={rowsUpdate}
              setRowsUpdate={setRowsUpdate}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;







// import { useCallback, useMemo, useState } from 'react';
// import Head from 'next/head';
// import { subDays, subHours } from 'date-fns';
// // import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// // import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
// // import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
// import { Box, Button, Container, Stack, SvgIcon, Tab, Tabs, Typography } from '@mui/material';
// import { useSelection } from 'src/hooks/use-selection';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { SocialWorkerTable } from 'src/sections/social-workers/social-worker-table';
// import { SocialWorkerSearch } from 'src/sections/social-workers/social-worker-search';
// import { applyPagination } from 'src/utils/apply-pagination';

// const now = new Date();

// const data = [
//   {
//     id: '5e887ac47eed253091be10cb',
//     address: {
//       city: 'Cleveland',
//       country: 'USA',
//       state: 'Ohio',
//       street: '2849 Fulton Street'
//     },
//     avatar: '/assets/avatars/avatar-carson-darrin.png',
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     email: 'carson.darrin@devias.io',
//     name: 'Carson Darrin',
//     phone: '304-428-3097',
//     status: "active"
//   },
//   {
//     id: '5e887b209c28ac3dd97f6db5',
//     address: {
//       city: 'Atlanta',
//       country: 'USA',
//       state: 'Georgia',
//       street: '1865  Pleasant Hill Road'
//     },
//     avatar: '/assets/avatars/avatar-fran-perez.png',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     email: 'fran.perez@devias.io',
//     name: 'Fran Perez',
//     phone: '712-351-5711',
//     status: "removed"
//   },
//   {
//     id: '5e887b7602bdbc4dbb234b27',
//     address: {
//       city: 'North Canton',
//       country: 'USA',
//       state: 'Ohio',
//       street: '4894  Lakeland Park Drive'
//     },
//     avatar: '/assets/avatars/avatar-jie-yan-song.png',
//     createdAt: subDays(subHours(now, 4), 2).getTime(),
//     email: 'jie.yan.song@devias.io',
//     name: 'Jie Yan Song',
//     phone: '770-635-2682',
//     status: "active"
//   },
//   {
//     id: '5e86809283e28b96d2d38537',
//     address: {
//       city: 'Madrid',
//       country: 'Spain',
//       name: 'Anika Visser',
//       street: '4158  Hedge Street'
//     },
//     avatar: '/assets/avatars/avatar-anika-visser.png',
//     createdAt: subDays(subHours(now, 11), 2).getTime(),
//     email: 'anika.visser@devias.io',
//     name: 'Anika Visser',
//     phone: '908-691-3242',
//     status: "removed"
//   },
//   {
//     id: '5e86805e2bafd54f66cc95c3',
//     address: {
//       city: 'San Diego',
//       country: 'USA',
//       state: 'California',
//       street: '75247'
//     },
//     avatar: '/assets/avatars/avatar-miron-vitold.png',
//     createdAt: subDays(subHours(now, 7), 3).getTime(),
//     email: 'miron.vitold@devias.io',
//     name: 'Miron Vitold',
//     phone: '972-333-4106',
//     status: "active"
//   },
//   {
//     id: '5e887a1fbefd7938eea9c981',
//     address: {
//       city: 'Berkeley',
//       country: 'USA',
//       state: 'California',
//       street: '317 Angus Road'
//     },
//     avatar: '/assets/avatars/avatar-penjani-inyene.png',
//     createdAt: subDays(subHours(now, 5), 4).getTime(),
//     email: 'penjani.inyene@devias.io',
//     name: 'Penjani Inyene',
//     phone: '858-602-3409',
//     status: "removed"
//   },
//   {
//     id: '5e887d0b3d090c1b8f162003',
//     address: {
//       city: 'Carson City',
//       country: 'USA',
//       state: 'Nevada',
//       street: '2188  Armbrester Drive'
//     },
//     avatar: '/assets/avatars/avatar-omar-darboe.png',
//     createdAt: subDays(subHours(now, 15), 4).getTime(),
//     email: 'omar.darobe@devias.io',
//     name: 'Omar Darobe',
//     phone: '415-907-2647',
//     status: "removed"
//   },
//   {
//     id: '5e88792be2d4cfb4bf0971d9',
//     address: {
//       city: 'Los Angeles',
//       country: 'USA',
//       state: 'California',
//       street: '1798  Hickory Ridge Drive'
//     },
//     avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
//     createdAt: subDays(subHours(now, 2), 5).getTime(),
//     email: 'siegbert.gottfried@devias.io',
//     name: 'Siegbert Gottfried',
//     phone: '702-661-1654',
//     status: "active"
//   },
//   {
//     id: '5e8877da9a65442b11551975',
//     address: {
//       city: 'Murray',
//       country: 'USA',
//       state: 'Utah',
//       street: '3934  Wildrose Lane'
//     },
//     avatar: '/assets/avatars/avatar-iulia-albu.png',
//     createdAt: subDays(subHours(now, 8), 6).getTime(),
//     email: 'iulia.albu@devias.io',
//     name: 'Iulia Albu',
//     phone: '313-812-8947',
//     status: "active"
//   },
//   {
//     id: '5e8680e60cba5019c5ca6fda',
//     address: {
//       city: 'Salt Lake City',
//       country: 'USA',
//       state: 'Utah',
//       street: '368 Lamberts Branch Road'
//     },
//     avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
//     createdAt: subDays(subHours(now, 1), 9).getTime(),
//     email: 'nasimiyu.danai@devias.io',
//     name: 'Nasimiyu Danai',
//     phone: '801-301-7894',
//     status: "active"
//   }
// ];

// const useData = (page, rowsPerPage) => {
//   return useMemo(
//     () => {
//         return applyPagination(data, page, rowsPerPage);
//     },
//     [page, rowsPerPage]
//   );
// };

// const useCustomerIds = (customers) => {
//   return useMemo(
//     () => {
//       return customers.map((customer) => customer.id);
//     },
//     [customers]
//   );
// };

// const Page = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const customers = useData(page, rowsPerPage);
//   const customersIds = useCustomerIds(customers);
//   const customersSelection = useSelection(customersIds);

//   const [method, setMethod] = useState('active');


//   const handlePageChange = useCallback(
//     (event, value) => {
//       setPage(value);
//     },
//     []
//   );

//   const handleRowsPerPageChange = useCallback(
//     (event) => {
//       setRowsPerPage(event.target.value);
//     },
//     []
//   );


//   const handleMethodChange = useCallback(
//     (event, value) => {
//       setMethod(value);
//     },
//     []
//   );

//   return (
//     <>
//       <Head>
//         <title>
//           Social Workers | About Us
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8
//         }}
//       >
//         <Container maxWidth="xl">
//           <Stack spacing={3}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               spacing={4}
//             >
//               <Stack spacing={1}>
//                 <Typography variant="h4">
//                   Social Workers
//                 </Typography>
//               </Stack>
//             </Stack>
//             <SocialWorkerSearch />

//             <Tabs
//               onChange={handleMethodChange}
//               sx={{ mb: 3 }}
//               value={method}
//             >
//               <Tab
//                 label="Active"
//                 value="active"
//               />
//               <Tab
//                 label="Removed"
//                 value="removed"
//               />
//             </Tabs>

//               <SocialWorkerTable
//                 count={data.length}
//                 items={customers}
//                 onDeselectAll={customersSelection.handleDeselectAll}
//                 onDeselectOne={customersSelection.handleDeselectOne}
//                 onPageChange={handlePageChange}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 onSelectAll={customersSelection.handleSelectAll}
//                 onSelectOne={customersSelection.handleSelectOne}
//                 page={page}
//                 rowsPerPage={rowsPerPage}
//                 selected={customersSelection.selected}
//                 method={method}
//               />
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default Page;
