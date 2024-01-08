import { useAppSelector } from "../redux/hooks"

export const useSignedIn = () => {
  const user = useAppSelector(state => state.user);

  return user !== null;
}