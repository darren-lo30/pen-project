import { Box, Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface JoinRoomValues {
  roomId: string;
}

const JoinRoomPage = () => {
  const { register, handleSubmit, watch } = useForm<JoinRoomValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<JoinRoomValues> = (data) => {
    navigate(`/room/${data.roomId}`);
  }

  return (
    
    <Flex width={"100vw"} height={"100vh"} flexDir={'column'}>
      <Flex justifyContent={'end'} gap='12px' padding={'16px'} position={'absolute'} width={'100vw'}>
        <Link to='/sign-in'>
          <Button>Sign In</Button>
        </Link>
        <Link to='/sign-up'>
          <Button>Sign Up</Button>
        </Link>
      </Flex>
      <Center flex='1'>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading as='h2' marginBottom='12px' textAlign='center'>Join A Room</Heading>
            <Input type="text" placeholder="Room Id" marginBottom='12px' {...register('roomId')}></Input>
            <Button type='submit' width='100%' isDisabled={!watch('roomId')}>Join </Button>
          </form>
        </Box>
      </Center>
    </Flex>

  )
}

export default JoinRoomPage;