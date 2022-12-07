import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { styled } from '@mui/material/styles';
import ActivityTab from '../settings/ActivityTab';
import EditProfileTab from '../settings/EditProfileTab';
import NotificationsTab from '../settings/NotificationsTab';
import PageHeader from './PageHeader';
import SecurityTab from '../settings/SecurityTab';
import Profile from './Profile';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {
  const [currentTab, setCurrentTab] = useState<string>('users');

  const tabs = [
    { value: 'users', label: 'Users' }
    // { value: 'profile', label: 'Profile' }
    // { value: 'notifications', label: 'Notifications' },
    // { value: 'security', label: 'Passwords/Security' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Users - Accounts</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {/* <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper> */}
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'users' && <Profile />}
            {/* {currentTab === 'profile' && <EditProfileTab />} */}
            {/* {currentTab === 'notifications' && <NotificationsTab />} */}
            {/* {currentTab === 'security' && <SecurityTab />} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserSettings;
