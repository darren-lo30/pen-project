import { Avatar, Button, Flex, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useSignedIn } from "../hooks/userHooks";
import { Link } from "react-router-dom";
import { signOut } from "../api/auth";
import { deleteUser } from "../redux/reducers/userReducer";
import { useAppDispatch } from "../redux/hooks";

const MainNavbar = () => {
  const isSignedIn = useSignedIn();
  const dispatch = useAppDispatch();

  const onSignOut = async () => {
    dispatch(deleteUser());  
    await signOut();
  }
  
  return !isSignedIn ? (
    <Flex justifyContent={'end'} gap='12px' padding={'16px'} position={'absolute'} width={'100vw'}>
      <Link to='/sign-in'>
        <Button>Sign In</Button>
      </Link>
      <Link to='/sign-up'>
        <Button>Sign Up</Button>
      </Link>
    </Flex>
  ) : (
    <Flex justifyContent={'end'} gap='12px' padding={'16px'} position={'absolute'} width={'100vw'}>
      <Menu>
        <MenuButton as={Avatar} size='md'/>
        <MenuList padding={0}>
          <MenuGroup title='Profile'>
            <MenuItem as={Link} to='/me'>My Account</MenuItem>
            <MenuItem onClick={onSignOut}>Signout</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );    
}

export default MainNavbar;