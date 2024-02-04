import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";


const CenteredModal = (props: PropsWithChildren) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' marginTop='min(300px, 30vh)'>
      <Box p='6' rounded='md' width='500px'>
        {props.children}
      </Box>
    </Box>
  );
}

export default CenteredModal;