import { SubmitHandler, useForm } from "react-hook-form";
import CenteredModal from "../components/CenteredModal";
import { Alert, AlertIcon, AlertTitle, Button, Divider, FormControl, FormLabel, HStack, Heading, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import { signIn } from "../api/auth";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/reducers/userReducer";
import { useNavigate, } from "react-router-dom";
import { useSignedIn } from "../hooks/userHooks";

type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignIn = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignUpValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSignedIn();

  const onSubmit: SubmitHandler<SignUpValues> = async (data) => {
    try {
      const result = await signIn(data);
      dispatch(setUser(result.data.user));
      navigate('/');
    } catch (e) {
      setError('root', {message: 'Something went wrong.'});
    }
  };

  const renderFormError = () => {
    if (errors.root) {
      return (
        <Alert status='error' marginBottom='12px'>
          <AlertIcon />
          <AlertTitle>{errors.root.message}</AlertTitle>
        </Alert>
      )
    } 

    return null;
  }

  if (isSignedIn) { 
    navigate('/');
  }

  
  return (
    <>
      <CenteredModal>
        {renderFormError()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as='h4' fontSize='32px'>Sign Up</Heading>
          <Stack spacing={3}>            
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' {...register("email")} isRequired />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type='password' {...register("password")} isRequired />
            </FormControl>
            <Spacer height='24px' />
            <Button type='submit' >Sign Up</Button>
            <HStack>
              <Divider />
              <Text>or</Text>
              <Divider />
            </HStack>
          </Stack>
        </form>
      </CenteredModal>
    </>
  )
}

export default SignIn;