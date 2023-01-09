import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AuthErrorCodes, AuthError } from 'firebase/auth';

import FormInput from '../FormInput';
import Button, { BUTTON_TYPE_CLASSES } from '../Button';

import { googleSignInStart, emailSignInStart } from '../../actions/user.action';

import { SignInContainer, ButtonsContainer } from './signInForm.styles';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
    email: '',
    password: '', 
};

function SignInForm() {
  const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart());
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // if it does then check if the user is authenticated
            dispatch(emailSignInStart(email, password));
            resetFormFields();
            navigate('/');

        }catch(error) {
            switch((error as AuthError).code) {
                case AuthErrorCodes.INVALID_EMAIL:
                    alert('Incorrect email or password')
                    break;
                case AuthErrorCodes.INVALID_SESSION_INFO:
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    }
    return (
        <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
    );
}

export default SignInForm;
