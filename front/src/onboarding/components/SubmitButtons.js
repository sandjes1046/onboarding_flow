import {  Button } from '@mui/material';
import {setStep} from '../../models/userSlice'
import {useDispatch} from 'react-redux'

export default function SubmitButtons({user,setLoading}){

    const dispatch = useDispatch()

    return(
        <>
        {
            user.step === 2 &&
            <div className='flex justify-center w-full'>
                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    sx={{ width: '100%', maxWidth: 300, backgroundColor:'black',
                    '&:hover': {
                        boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
                        backgroundColor: '#ff69b4',    // Keep background color on hover
                    },
                    }}
                    
                >
                    Next
                </Button>
            </div>


        }
        {
            user.step > 2  &&
            <div className='flex flex-row justify-evenly gap-x-8 w-full'>
                <Button 
                    sx={{borderColor:'black',color:'black', width: '50%', maxWidth: 150, backgroundColor:'lightgray',
                        '&:hover': {
                            boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
                            backgroundColor: '#ff69b4',    // Keep background color on hover
                        },
                    }} 
                    variant='outlined' onClick={() => {setLoading(true);dispatch(setStep({answers:{step:user.step-1}}))}}
                >
                    Back
                </Button>
                
                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    sx={{ width: '50%', maxWidth: 150, backgroundColor:'black',
                    '&:hover': {
                        boxShadow: '0 4px 16px 0 #ff69b4', // Pink shadow on hover
                        backgroundColor: '#ff69b4',    // Keep background color on hover
                    },
                    }}
                    
                >
                    Next
                </Button>
            </div>
        }
        </>
        
               
    )
}