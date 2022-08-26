
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export const CircularIndeterminate =()=> {
    return (
        <Box sx={{ display: 'flex', justifyContent:'center',height:'100vh',alignItems:'center' }}>
            <CircularProgress />
        </Box>
    );
}