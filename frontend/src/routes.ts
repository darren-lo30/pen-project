import CanvasPage from "./pages/CanvasPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import ProfilePage from "./pages/ProfilePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const PATHS = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  HOME: '/',
  ROOM: '/room/:roomId',
  PROFILE: '/me'
}

const ROUTES = [{
  path: PATHS.SIGN_IN, page: SignIn,
},
{
  path: PATHS.SIGN_UP, page: SignUp
},
{
  path: PATHS.HOME, page: JoinRoomPage
},
{
  path: PATHS.ROOM, page: CanvasPage
},
{
  path: PATHS.PROFILE, page: ProfilePage
}
];


export { PATHS, ROUTES };