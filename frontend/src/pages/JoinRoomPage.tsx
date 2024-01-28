import { Box, Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface JoinRoomValues {
  roomId: string;
}

const JoinRoomPage = () => {
  const { register, handleSubmit } = useForm<JoinRoomValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<JoinRoomValues> = (data) => {
    navigate(`/room/${data.roomId}`);
  }

  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading as='h2' marginBottom='12px' textAlign='center'>Join A Room</Heading>
            <Input type="text" placeholder="Room Id" marginBottom='12px' {...register('roomId')}></Input>
            <Button type='submit' width='100%'>Join </Button>
          </form>
        </Box>
      </Center>
    </Flex>

  )
}

export default JoinRoomPage;