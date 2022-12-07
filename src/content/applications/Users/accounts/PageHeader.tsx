import { Typography } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Accounts
      </Typography>
      {/* <Typography variant="subtitle2">Mannage users</Typography> */}
    </>
  );
}

export default PageHeader;
