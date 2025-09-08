import CardContainer from './CardContainer';
import Form from './Form';

export default function FormFields({step,fields,onSubmit,fieldAnswers,setFieldAnswers,user,setLoading}){




    return(
        
        <CardContainer>
            <Form 
            step={step} 
            fields={fields} 
            onSubmit={onSubmit}
            fieldAnswers={fieldAnswers} 
            setFieldAnswers={setFieldAnswers} 
            user={user}
            setLoading={setLoading}
            />
        </CardContainer>
               
    )
}
