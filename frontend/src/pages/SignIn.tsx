import { SubmitHandler, useForm } from "react-hook-form";
import CenteredModal from "../components/CenteredModal";
import { Alert, AlertIcon, AlertTitle, Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack, Link, Text } from '@chakra-ui/react'
import { signIn } from "../api/auth";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/reducers/userReducer";
import { Link as RouterLink, useNavigate, } from "react-router-dom";
import { useSignedIn } from "../hooks/userHooks";
import { useEffect } from "react";
import { isAxiosError } from "axios";
import { PATHS } from "../routes";

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
      navigate(PATHS.HOME);
    } catch (e) {
      if(isAxiosError(e)) {
        if(e.response?.status == 401) {
          setError('password', {message: "An account doesn't exist with that email or password."});
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
      navigate(PATHS.HOME);
    }
  }, [isSignedIn, navigate]);


  
  return (
    <>
      <CenteredModal>
        {renderFormError()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as='h4' fontSize='32px'>Sign In</Heading>
          <Stack spacing={3} marginTop='24px'>            
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' {...register("email")} isRequired />
            </FormControl>
            <FormControl isInvalid={errors.password !== undefined}>
              <FormLabel>Password</FormLabel>
              <Input type='password' {...register("password")} isRequired />
              {errors.password && (
                <FormErrorMessage>{ errors.password.message }</FormErrorMessage>
              )}
            </FormControl>
            <Spacer height='24px' />
            <Button type='submit'>Sign In</Button>
            <HStack>
              <Divider />
              <Text>or</Text>
              <Divider />
            </HStack>
            <Box margin='auto'>
              Don't have an account? 
              {' '}
              <Link color='blue.500' as={RouterLink} to={PATHS.SIGN_UP}>Sign Up</Link>
            </Box>
          </Stack>
        </form>
      </CenteredModal>
    </>
  )
}

export default SignIn;