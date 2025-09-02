import { Card, CardContent, TextField, Button } from '@mui/material';
import {useState, useEffect, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import './steps.css'
import client from '../client'
import {OnboardingFields} from '../types'
import {StepProps, UserData} from '../interfaces'
import moment from 'moment'

function Step3({email, step, backButton}: StepProps) {
    const navigate = useNavigate();

    const [appearField, setAppearField] = useState(false);
    const [fields, setFields] = useState<OnboardingFields>({}); //{about_me:{title:'About Me',step:2},birthday:{title:'Birthday',step:3},address:{title:'Address',step:2}}
    const [fieldAnswers, setFieldAnswers] = useState<UserData>({});

    useEffect(() => {
        setTimeout(() => setAppearField(true), 100);  

        async function fetchData() {
            //call route to get what fields go here
            //get user data to prefill fields if they exist fieldAnswers
            try {
                const result = await client.get('/user/get-step', { params: { email,step:step } });
                setFields(result.data.fields)//{about_me:{title:"About Me"},address:{title:"Address"},birthday:{title:"Birthday"}} }
                setFieldAnswers(result.data.answers)//{about_me:"",street:"",city:"",state:"",zip:"",birthday:""}
            } catch (error) {
                alert("Refresh and try again")
                console.error("Step3 useEffect Error: ", error);
            }

        }      
        fetchData(); 
    }, []);

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        //Use fieldAnswers here
        //route to save answers and update user step in background and update here too
        //console.log(fieldAnswers);
        try {
            await client.put('/user/save-step', {email, step:step, answers:fieldAnswers,complete:true});
            navigate('/login', { replace: true } )
        } catch (error) {
            alert("Refresh and try again")
            console.error("Step3 handleSubmit Error: ", error);
        }
      
    };;
    
    
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
                    Object.keys(fields).map((key) => {

                        if(key === "birthday")
                        {
                            return(
                                <div key={key}>
                                    <TextField
                                        value={moment(fieldAnswers[key]).format("YYYY-MM-DD")|| ''}
                                        onChange={(e) => {
                                            setFieldAnswers({...fieldAnswers, [key]: e.target.value})
                                        }}
                                        label={fields[key].title}
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
                                        label={fields[key].title}
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