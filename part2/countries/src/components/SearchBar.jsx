import { TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {LightMode, ModeNight} from "@mui/icons-material"
import {Grid} from "@mui/material";

const SearchBar = ({handleChange, toggle, mode, onFB, style}) => {
    return (
        <div style={style} className="search-bar">
            <Grid container columns={16}>
                <Grid item xs={2}>
                    <IconButton onClick={toggle} variant="outlined" sx={{marginTop: '7px'}}>
                        {mode == 'dark' ? <LightMode /> : <ModeNight />}
                    </IconButton>
                </Grid>
                <Grid item xs={14}>
                    <TextField fullWidth onBlur={onFB} onFocus={onFB} label="find countries" id="fullWidth" onChange={handleChange}/>
                </Grid>
            </Grid>
        </div>
)}

export default SearchBar;