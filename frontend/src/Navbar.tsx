import { useAppSelector } from "./redux/hooks";


const Navbar = () => {
  const user = useAppSelector(state => state.user);
  return (
    <div>{ JSON.stringify(user.user) }</div>
  );
}

export default Navbar;