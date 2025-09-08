import { Card, CardContent, TextField, Button } from '@mui/material';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './steps.css'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import {getStep,saveUser} from '../controllers/userController'

function Step3({email, step, backButton}) {
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [appearField, setAppearField] = useState(false);
    const [fieldAnswers, setFieldAnswers] = useState({});

    useEffect(() => {        
        setTimeout(() => setAppearField(true), 100);   

        dispatch(getStep({email:user.email,step:user.step,setFieldAnswers}))

        if(user.status === 'completed')
        {
            setFieldAnswers({...user})
        }
      
    }, []);


    const handleSubmit = async(e) => {
            e.preventDefault();
    
            dispatch(saveUser({email,step:user.step+1,answers:fieldAnswers,complete:true, navigateLogin:navigate('/login', { replace: true } )}))
    
          
          
        };
    
    
    return(
        <div className='flex w-full h-full justify-center align-start items-start'>
            <Card
                sx={{
                    transform: appearField ? 'translateY(0vh)' : 'translateY(100vh)',
                    transition: 'transform 0.7s cubic-bezier(.77,0,.18,1)',
                    width: {  xs: '90%', sm: '70%', md: '50%', lg: '30%' },
                }}
            >
                <CardContent>
                    <form  className='flex flex-col gap-16' onSubmit={handleSubmit}>
                    {
                    Object.keys(user.fields).map((key) => {

                        if(key === "birthday")
                        {
                            return(
                                <div key={key}>
                                    <TextField
                                        value={moment(fieldAnswers[key]).format("YYYY-MM-DD")|| ''}
                                        onChange={(e) => {
                                            setFieldAnswers({...fieldAnswers, [key]: e.target.value})
                                        }}
                                        label={user.fields[key].title}
                                        type="date"
                                        slotProps={{
                                            inputLabel: { shrink: true}
                                        }}
                                        fullWidth
                                    />
                                </div>
                            )
                        }

                        if(key === "address")
                        {
                            return(
                                <div className='flex flex-col justify-center gap-4'  key={key}>
                                    <TextField type='street' label={'Street'} value={fieldAnswers['street'] || ''} onChange={(e) => {setFieldAnswers({...fieldAnswers,['street']:e.target.value})}}/>
                                    <TextField label={'City'}  value={fieldAnswers['city'] || ''} onChange={(e) => {setFieldAnswers({...fieldAnswers,['city']:e.target.value})}}/>
                                    <TextField label={'State'}  value={fieldAnswers['state'] || ''} onChange={(e) => {setFieldAnswers({...fieldAnswers,['state']:e.target.value})}}/>
                                    <TextField 
                                        slotProps={{htmlInput:{type:'number',
                                            sx:{
                                                '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                                                    WebkitAppearance: 'none',
                                                    margin: 0,
                                                    },
                                                    MozAppearance: 'textfield',
                                            }
                                        }}
                                    } 
                                    label={'Zip'}  value={fieldAnswers['zip'] || ''} 
                                    onChange={(e) => {
                                        if(e.target.value.length <= 5)
                                        {
                                            setFieldAnswers({...fieldAnswers,['zip']:e.target.value})  
                                        }
                                        
                                    }}
                                    />
                                </div>
                            )
                        }

                        if(key === "about_me")
                        {
                            return(
                                <div  key={key}>
                                    <TextField
                                        value={fieldAnswers[key] || ''}
                                        onChange={(e) => {
                                            setFieldAnswers({...fieldAnswers, [key]: e.target.value})
                                        }}
                                        placeholder='Tell us about yourself...'
                                        label={user.fields[key].title}
                                        multiline
                                        rows={5}
                                        fullWidth
                                        slotProps={{ inputLabel: { shrink:true }, htmlInput: { maxLength: 500 } }}
                                    />
                                </div>
                            )
                        }

                    })
                    }

                    <div className='flex flex-row justify-evenly gap-x-8 w-full'>
                        {backButton()}
                        
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
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Step3;