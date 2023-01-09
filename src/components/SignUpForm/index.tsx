import { useState, FormEvent, ChangeEvent } from 'react';
import { AuthErrorCodes, AuthError } from 'firebase/auth';

import FormInput from '../FormInput';
import Button from '../Button';
import { signUpStart } from '../../actions/user.action'

import { SignUpContainer } from './signUpForm.styles';
import { useDispatch } from 'react-redux';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',  
};

function SignUpForm() {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // check if password and confirmPassword are equals
        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }
        try {
            // if it does then check if the user is authenticated
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();

        }catch(error) {
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            } else {
                console.log("user creation encountered an error", error);
            }
        }
        // if he is then create the document
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    }
    return (
        <SignUpContainer>
            <h2>I do not have an account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name='displayName'
                    label='DisplayName'
                    value={displayName}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="email"
                    name='email'
                    label='Email'
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name='password'
                    label='Password'
                    value={password}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name='confirmPassword'
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;