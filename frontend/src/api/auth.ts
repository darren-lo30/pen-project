import axios from "axios"

export const signUp = async (params: {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}) => {
  return await axios.post('/signup', {
    ...params
  });
}

export const signIn = async (params: {
  email: string,
  password: string,
}) => {
  return await axios.post('/signin', {
    ...params
  });
}

export const authenticate = async () => {
  return await axios.post('/auth', {});
}

export const signOut = async () => {
  return await axios.post('/signout', {});
}