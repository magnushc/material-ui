import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import FormatTextdirectionRToLIcon from '@mui/icons-material/FormatTextdirectionRToL';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import { useTranslate } from '@mui/docs/i18n';
import useLocalStorageState from '@mui/utils/useLocalStorageState';

const Heading = styled(Typography)(({ theme }) => ({
  margin: '20px 0 10px',
  color: theme.palette.grey[600],
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(11),
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
}));

const IconToggleButton = styled(ToggleButton)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  '& > *': {
    marginRight: '8px',
  },
});

function AppSettingsDrawer(props) {
  const { onClose, open = false, ...other } = props;
  const t = useTranslate();
  const upperTheme = useTheme();
  const changeTheme = useChangeTheme();
  const [mode, setMode] = useLocalStorageState('mui-mode', 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const handleChangeThemeMode = (event, paletteMode) => {
    if (paletteMode === null) {
      return;
    }

    setMode(paletteMode);
  };

  React.useEffect(() => {
    const paletteMode = mode === 'system' ? preferredMode : mode;
    changeTheme({ paletteMode });
  }, [changeTheme, mode, preferredMode]);

  const handleChangeDirection = (event, direction) => {
    if (direction === null) {
      direction = upperTheme.direction;
    }

    changeTheme({ direction });
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        elevation: 0,
        sx: { width: { xs: 310, sm: 360 }, borderRadius: '10px 0px 0px 10px' },
      }}
      {...other}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="body1" fontWeight="500">
          {t('settings.settings')}
        </Typography>
        <IconButton color="inherit" onClick={onClose} edge="end" aria-label={t('close')}>
          <CloseIcon color="primary" fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ pl: 2, pr: 2 }}>
        <Heading gutterBottom id="settings-mode">
          {t('settings.mode')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={mode}
          color="primary"
          onChange={handleChangeThemeMode}
          aria-labelledby="settings-mode"
          fullWidth
        >
          <IconToggleButton
            value="light"
            aria-label={t('settings.light')}
            data-ga-event-category="settings"
            data-ga-event-action="light"
          >
            <LightModeIcon fontSize="small" />
            {t('settings.light')}
          </IconToggleButton>
          <IconToggleButton
            value="system"
            aria-label={t('settings.system')}
            data-ga-event-category="settings"
            data-ga-event-action="system"
          >
            <SettingsBrightnessIcon fontSize="small" />
            {t('settings.system')}
          </IconToggleButton>
          <IconToggleButton
            value="dark"
            aria-label={t('settings.dark')}
            data-ga-event-category="settings"
            data-ga-event-action="dark"
          >
            <DarkModeOutlinedIcon fontSize="small" />
            {t('settings.dark')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom id="settings-direction">
          {t('settings.direction')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={upperTheme.direction}
          onChange={handleChangeDirection}
          aria-labelledby="settings-direction"
          color="primary"
          fullWidth
        >
          <IconToggleButton
            value="ltr"
            aria-label={t('settings.ltr')}
            data-ga-event-category="settings"
            data-ga-event-action="ltr"
          >
            <FormatTextdirectionLToRIcon fontSize="small" />
            {t('settings.ltr')}
          </IconToggleButton>
          <IconToggleButton
            value="rtl"
            aria-label={t('settings.rtl')}
            data-ga-event-category="settings"
            data-ga-event-action="rtl"
          >
            <FormatTextdirectionRToLIcon fontSize="small" />
            {t('settings.rtl')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom>{t('settings.color')}</Heading>
        <Button
          component="a"
          href="/material-ui/customization/color/#playground"
          data-ga-event-category="settings"
          data-ga-event-action="colors"
          size="medium"
          variant="outlined"
          fullWidth
        >
          {t('settings.editWebsiteColors')}
        </Button>
      </Box>
    </Drawer>
  );
}

AppSettingsDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default AppSettingsDrawer;
