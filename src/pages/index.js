import Head from 'next/head';
// import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewNgos } from 'src/sections/overview/overview-ngos';
// import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
// import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
// import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewProjects } from 'src/sections/overview/overview-projects';
import { OverviewTotalSocialWorkers } from 'src/sections/overview/overview-total-social-workers';
import { OverviewDonation } from 'src/sections/overview/overview-donation';
// import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { API_URL } from "../../config/constants";
import { useEffect, useState } from 'react';
import axios from 'axios';


// const now = new Date();

const Page = () => {

  // const [overview, setOverview] = useState([]);
  // const [rowsUpdate, setRowsUpdate] = React.useState(false);
  const [overview, setOverview] = useState({
    ngoCount: 0,
    socialWorkersCount: 0,
    projectsCount: 0,
    donation: 0
  });

  const getOverview = () => {
    const token = window.localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}admin/dashboard/`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setOverview(response.data.data);
        // console.log("Overview Reponse: ", response)
        // console.log("Overview: ", overview.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <>
    <Head>
      <title>
        Overview | About Us
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewNgos
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={overview.ngoCount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalSocialWorkers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={overview.socialWorkersCount.toString()}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewProjects
              sx={{ height: '100%' }}
              value={overview.projectsCount}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewDonation
              sx={{ height: '100%' }}
              value={overview.donation.toString()}
            />
          </Grid>
        </Grid> 
      </Container>
    </Box>
  </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;