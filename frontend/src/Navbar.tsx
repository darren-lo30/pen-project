import { Box } from "@chakra-ui/react";
import { useAppSelector } from "./redux/hooks";


const Navbar = () => {
  const user = useAppSelector(state => state.user);
  return (
    <Box position='absolute' top='0' width='100%' bg='gray.300' height='50px'>{ JSON.stringify(user.user) }</Box>
  );
}

export default Navbar;