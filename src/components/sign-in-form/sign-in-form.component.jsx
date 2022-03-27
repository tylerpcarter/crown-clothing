import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { 
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword( email, password );
            resetFormFields();
        } catch (error) {
            if (error.code == 'auth/wrong-password'){
                alert('Incorrect email and/or password.')
            } else if (error.code == 'auth/user-not-found') {
                alert('Incorrect email and/or password.')
            } else {
                alert('Error code: ' + error.code)
            }
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});

    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>          
                <FormInput
                    label='Email'
                    type='email' 
                    onChange={handleChange} 
                    name='email' value={email} 
                    required
                />
                
                <FormInput
                    label='Password'
                    type='password' 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                    required
                />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>      
            </form>
        </div>
    )
};

export default SignInForm;