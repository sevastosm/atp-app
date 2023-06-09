import { useContext } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { SidebarContext } from 'src/context/SidebarContext';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import { AppContext } from 'src/context/AppContext';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
      }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
  
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { setAuth, auth, setLogedInUser, logedInUser } = useContext(AppContext);
  const navigate = useNavigate();

  const role = logedInUser?.role || null;

  const handleLogout = async () => {
    await localStorage.removeItem('token');
    setAuth(false);
    setLogedInUser(null);
  };
  const AdminMenu = () => (
    <MenuWrapper>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            {role === 'admin' && 'Accounts'}
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/management/accounts"
                startIcon={
                  <>
                    <AccountCircleTwoToneIcon />
                    <AccountCircleTwoToneIcon />
                  </>
                }
              >
                ΠΕΛΑΤΕΣ
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
      <SubMenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              ΤΡΟΦΗΜΑ
            </ListSubheader>
          }
        >
          <ListItem component="div">
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/nutrition/"
              startIcon={
                <>
                  <FastfoodIcon />
                </>
              }
            >
              ΤΡΟΦΙΜΑ
            </Button>
          </ListItem>
        </List>
      </SubMenuWrapper>
    </MenuWrapper>
  );

  const UserMenu = () => (
    <SubMenuWrapper>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            ΡΥΘΜΙΣΕΙΣ
          </ListSubheader>
        }
      >
        <ListItem component="div">
          <Button
            disableRipple
            component={RouterLink}
            onClick={closeSidebar}
            to="/profile/nutrition"
            startIcon={<LocalDiningIcon />}
          >
            ΔΙΑΤΡΟΦΗ
          </Button>
        </ListItem>
        <ListItem component="div">
          <Button
            disableRipple
            component={RouterLink}
            onClick={closeSidebar}
            to="/profile/metrics"
            startIcon={
              <>
                <AccountCircleTwoToneIcon />
              </>
            }
          >
            ΜΕΤΡΗΣΕΙΣ
          </Button>
        </ListItem>
        <ListItem component="div">
          <Button
            disableRipple
            component={RouterLink}
            onClick={closeSidebar}
            to="/profile/notes"
            startIcon={
              <>
                <AccountCircleTwoToneIcon />
              </>
            }
          >
            ΣΗΜΕΙΩΣΕΙΣ
          </Button>
        </ListItem>
        {/* <ListItem component="div">
          <Button
            disableRipple
            component={RouterLink}
            onClick={closeSidebar}
            to="/management/accounts"
            startIcon={
              <>
                <AccountCircleTwoToneIcon />
                <AccountCircleTwoToneIcon />
              </>
            }
          >
            ΛΟΓΑΡΙΑΣΜΟΣ
          </Button>
        </ListItem> */}
      </List>
    </SubMenuWrapper>
  );

  // if (!activeUser) return null;

  return (
    <>
      <MenuWrapper>
        {role === 'admin' ? <AdminMenu /> : <UserMenu />}
        <Box sx={{ position: 'absolute', bottom: 0 }}>
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  onClick={handleLogout}
                  startIcon={
                    <>
                      <SettingsIcon />
                    </>
                  }
                >
                  Log out
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </Box>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
