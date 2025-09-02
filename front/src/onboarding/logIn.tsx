import {Button, Menu, MenuItem, Toolbar} from '@mui/material';
import {useState, useEffect} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import '../App.css'
import {useNavigate} from 'react-router-dom';

//placeholder for when users complete registration
function LogIn() {

  const [anchorEl, setAnchorEl] = useState<React.MouseEvent<HTMLButtonElement>['currentTarget'] | null>(null);
  const [triangleIn, setTriangleIn] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //useEffect for animation
  useEffect(() => {
  
    setTimeout(() => setTriangleIn(true), 100);
    setTimeout(() => setShowTitle(true), 300); 

  }, []);



  return (
    <div className="relative w-screen h-screen overflow-hidden">
         
      <Toolbar className='flex justify-end' sx={{ boxShadow: '0 4px 10px 0 rgba(0,0,0,0.15)',}}>
        <Button TouchRippleProps={{className: 'custom-ripple'}} sx={{
          zIndex:1,
          '&:hover': {
            boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
            backgroundColor: '#ff69b4',    // Keep background color on hover
          },
        }} 
        color="primary" onClick={handleMenuOpen}>
          <MenuIcon sx={{color:'black'}}/>
        </Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
          <MenuItem TouchRippleProps={{className: 'custom-ripple'}} onClick={() => {navigate('/', { replace: true} )}}> Log Out </MenuItem>
          <MenuItem  TouchRippleProps={{className: 'custom-ripple'}} onClick={() => { handleMenuClose() }}> <KeyboardReturnIcon/> </MenuItem>

        </Menu>
      </Toolbar>

      {/* Pink triangle background */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '50vh solid transparent',
          borderBottom: '50vh solid transparent',
          borderLeft: triangleIn ? '60vw solid #ff69b4' : '0 solid #ff69b4',
          position: 'absolute',
          left: 0,
          top: 0,
          filter: 'drop-shadow(4px 0 16px rgba(0,0,0,0.3))', // Add this line
          zIndex: 0,
          transition: 'border-left-width 0.8s cubic-bezier(.77,0,.18,1)', // Smooth swipe

        }}
      />  

      <div className="absolute inset-0 flex flex-col items-center justify-center align-center">
        <h1 
          style={{
            transition: 'opacity 1s cubic-bezier(.77,0,.18,1), transform 1s cubic-bezier(.77,0,.18,1)',
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? 'translateY(0)' : 'translateY(-40px)',
          }}  
          className=" flex flex-col h-2/3 justify-center text-center text-[80px] sm:text-[120px] text-gray-800"
        >
          Logged In 
        </h1>

      
      </div>
    </div>
  );
}

export default LogIn;
