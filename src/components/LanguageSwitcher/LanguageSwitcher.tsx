import { FormControl, MenuItem, Select} from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {

  const lngs = {
    el: { nativeName: 'GR'},
    en: { nativeName: 'EN'}
  };
  
  const { i18n } = useTranslation();
    
  return (
    <Stack flexDirection='row' sx={{justifyContent: 'end'}}>
      <FormControl sx={{ m: 1, minWidth: 70, maxWidth: 70}}>
        <Select
          MenuProps={{ disablePortal: true }}  
          value={i18n.language}
          onChange={(e) =>
            i18n.changeLanguage(e.target.value)
          }
          displayEmpty
          inputProps={{ 'aria-label': 'lng' }}
        >
          {Object.keys(lngs).map((lng) => (
            <MenuItem key={lng} value={lng}>{lngs[lng as keyof typeof lngs].nativeName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack> 
  );
}
export default LanguageSwitcher;