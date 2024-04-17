import {
  Box,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        justify-content: center;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  return (
    <TooltipWrapper title="ATP-app" arrow>
      <LogoWrapper to="/overview">
        <img src="https://static.wixstatic.com/media/6569c6_a000a731e7504f7cb9646e628d24e488~mv2.png/v1/fill/w_142,h_36,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ATP-STORE-2021-logo.png" />
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
