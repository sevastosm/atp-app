import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import React from 'react';
import { login } from 'src/api/auth';
import { AppContext } from 'src/context/AppContext';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const { setMessage, setAuth, setLogedInUser, setSelectedRow } =
    React.useContext(AppContext);
  const [credentials, setCredentials] = React.useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    await login(credentials, setMessage).then((response) => {
      console.log('handleLogin', response);

      localStorage.setItem('token', response.data.token);
      setAuth(true);
      setLogedInUser(response.data.user.role);
      setSelectedRow(response.data.user);

      if (response.data.user.role === 'admin') {
        return navigate('/management/accounts', { replace: false });
      }

      if (response.data.user.role === 'user') {
        return navigate('/profile/nutrition', { replace: false });
      }
    });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 3 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item xs={12} mx="auto">
          {/* <LabelWrapper color="success">Version 0.0.0</LabelWrapper> */}
          <Typography sx={{ mb: 2 }} variant="h1"></Typography>
          <TextField
            required
            id="email"
            label="Email"
            value={credentials.email || ''}
            name="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={credentials.password || ''}
            name="password"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleLogin} size="large" variant="contained">
            Log in
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
