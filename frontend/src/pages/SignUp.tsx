import { SubmitHandler, useForm } from "react-hook-form";
import CenteredModal from "../components/CenteredModal";
import { Alert, AlertIcon, AlertTitle, Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import { signUp } from "../api/auth";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/reducers/userReducer";
import { isAxiosError } from "axios";
import { useNavigate, } from "react-router-dom";
import { useSignedIn } from "../hooks/userHooks";
import { useEffect } from "react";

type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<SignUpValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSignedIn();

  const onSubmit: SubmitHandler<SignUpValues> = async (data) => {
    try {
      const result = await signUp(data);
      dispatch(setUser(result.data.user));
      navigate('/');
    } catch (e) {
      if(isAxiosError(e)) {
        if(e.response?.status == 422) {
          setError('email', { message: 'There is already an account with that email.' });
          return;
        }
      } 
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

  useEffect(() => {
    if (isSignedIn) { 
      navigate('/');
    }
  }, [isSignedIn, navigate]);

  
  return (
    <>
      <CenteredModal>
        {renderFormError()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as='h4' fontSize='32px'>Sign Up</Heading>
          <Stack spacing={3}>            
            <HStack spacing='24px' marginTop='24px'>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input type='text' {...register("firstName")} isRequired />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type='text' {...register("lastName")} isRequired />
              </FormControl>
            </HStack>
            <FormControl isInvalid={errors.email !== undefined}>
              <FormLabel>Email</FormLabel>
              <Input type='email' {...register("email")} isRequired />
              {errors.email && (
                <FormErrorMessage>{ errors.email.message }</FormErrorMessage>
              )}
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

export default SignUp;