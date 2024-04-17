import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardHeader,
  Divider,
  ListItem,
  ListItemText,
  useTheme,
  List,
  useMediaQuery
} from '@mui/material';
import { AppContext } from 'src/context/AppContext';
import { notesFilelds } from 'src/content/data';

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Notes = () => {
  const { selectedRow } = React.useContext(AppContext);

  const theme = useTheme();
  const matches = useMediaQuery(() => theme.breakpoints.down('sm'));
  // const { role } = selectedRow;

  // const isAdmin = role === 'admin';
  const ListWrapper = styled(List)(
    () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
  );

  const notes = selectedRow?.notes || [];

  const ButtonWraper = styled(Box)(
    ({ theme }) => `

    .MuiButton-root {
      margin-right:15px;
      border-radius: 6px;
    }
    .MuiButton-startIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin:auto
    }
    .button-text{
      font-size: 14px;
      margin-left: 4px;
    }

`
  );

  return (
    <Box>
      {notes?.length > 0 && (
        <Card sx={{ margin: 2 }}>
          <Typography
            variant={matches ? 'h4' : 'h3'}
            sx={{ textAlign: 'center', marginTop: 3 }}
          >
            Οι σημειώσεις μου
          </Typography>
          <Paper elevation={8} sx={{ margin: 2 }}></Paper>
          {notesFilelds.map((field, i) => (
            <>
              <Paper key={i} elevation={8} sx={{ margin: 2 }}>
                <Card sx={{ height: '100%', background: '#55c3f5' }}>
                  <Typography variant="h4" sx={{ margin: 1, color: '#fff' }}>
                    {field?.label}
                  </Typography>

                  <Divider />
                  <ListWrapper disablePadding>
                    <ListItem
                      sx={{
                        background: '#fff',
                        color: `#000`
                      }}
                    >
                      {<ListItemText primary={notes[0][field?.name] || ''} />}
                    </ListItem>
                  </ListWrapper>
                </Card>

                <Divider />
              </Paper>
            </>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default Notes;
