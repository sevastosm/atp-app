import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
    display:flex;
    height: 100%;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>ATP-app</title>
      </Helmet>

      <Container maxWidth="lg" sx={{ alignItems: 'center' }}>
        <Box
          sx={{ mb: 5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Logo />
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 4 }}>
          <Hero />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
