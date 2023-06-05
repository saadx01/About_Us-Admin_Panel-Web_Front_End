import Head from 'next/head';
// import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
// import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  // Button,
  Container,
  Pagination,
  Stack,
  // SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Tabs,
  Tab
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { NgoCard } from 'src/sections/ngos/ngo-card';
import { CompaniesSearch } from 'src/sections/ngos/ngo-search';
import { useCallback, useState } from 'react';

const ngos = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Al Khidmat',
    downloads: '594',
    status: 'active'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Hope',
    downloads: '625',
    status: 'active'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Helping Hands',
    downloads: '857',
    status: 'banned'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Zindagi',
    downloads: '406',
    status: 'removed'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/assets/logos/logo-github.png',
    title: 'JDC',
    downloads: '835',
    status: 'active'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    logo: '/assets/logos/logo-squarespace.png',
    title: 'Saylani',
    downloads: '835',
    status: 'banned'
  }
];

const Page = () => {

  const [method, setMethod] = useState('active');

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const filterItems = (items) =>
  {
    if(method === "active"){
      console.log("method: ",method)
      console.log("items: ",items)
      return items.filter((item) => item.status === "active")
    }
    else if(method === "banned"){
      return items.filter((item) => item.status === "banned")
    }
    else{
      return items.filter((item) => item.status === "removed")
    }
}

  const filteredItems = filterItems(ngos)

  return(
    <>
    <Head>
      <title>
        NGOs | About Us
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
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                NGOs
              </Typography>
              {/* <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack> */}
            </Stack>
            {/* <div>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add
              </Button>
            </div> */}
          </Stack>
          <CompaniesSearch />

          <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Active"
                value="active"
              />
              <Tab
                label="Banned"
                value="banned"
              />
              <Tab
                label="Removed"
                value="removed"
              />
            </Tabs>

            <Grid
              container
              spacing={3}
            >
              {filteredItems.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={company.id}
                >
                  <NgoCard company={company} />
                </Grid>
              ))}
            </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box>
        </Stack>
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
