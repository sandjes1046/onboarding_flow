import { useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {getUser} from '../controllers/userController'
import WizardSteps from './components/WizardSteps';
import FormFields from './components/FormFields';
import {getStep,saveUser} from '../controllers/userController'

function Wizard() {

    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    
    const dispatch = useDispatch()


    const [fieldAnswers, setFieldAnswers] = useState({})//{about_me:"",street:"",city:"",state:"",zip:"",birthday:""}
    const [loading,setLoading] = useState(true)



    useEffect(() => {
  if (!user) return;

  // only fetch step if user exists and step is valid
  if (loading) {
    dispatch(getStep({ email: user.email, step: user.step }));
  }

  // populate field answers if completed
  if (user.status === 'completed' && Object.keys(user.fields || {}).length > 0) {
    setFieldAnswers({ ...user.answers });
    setLoading(false);
  }
}, [user.step, loading, user, dispatch, setFieldAnswers]);


useEffect(() => {
  if (!user) return;

  if (user.complete === true) {
    navigate('/login', { replace: false });
    return;
  }

  if (!user.status) {
    navigate('/', { replace: false });
    return;
  }

  // If user data is incomplete, fetch it
  if (!user.email || !user.password) {
    dispatch(getUser({ email: user.email, password: user.password }));
  }
}, [user, dispatch, navigate]);



    const onSubmit = (data) => {
        setLoading(true)
        console.log('Form: ',data);
        switch (user.step) {
            case 2:
                setLoading(true)
                dispatch(saveUser({email:user.email,step:user.step+1,answers:data}))
                break;
            case 3:
                //setLoading(true)
                dispatch(saveUser({email:user.email,step:user.step+1,answers:data,complete:true, navigateLogin:navigate('/login', { replace: true } )}))
                break;
            default:
                navigate('/',{replace:false})
                break;
        }
       

    }
    


 
    
    return(
        <div className='w-screen h-screen md:overflow-hidden'>
            {/**This is the progress bar that shows above every step after they enter email and password */}
            <WizardSteps user={user}/>

            {
                useMemo(() => {
                    return(
                        <FormFields user={user} fieldAnswers={fieldAnswers} setFieldAnswers={setFieldAnswers} step={user.step} fields={user.fields} onSubmit={onSubmit} setLoading={setLoading}/>
                    )
                }, [user.step,user.fields] )
            }
        </div>
    );
}

export default Wizard;