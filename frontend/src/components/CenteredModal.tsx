import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";


const CenteredModal = (props: PropsWithChildren) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' marginTop='min(200px, 30vh)'>
      <Box boxShadow='lg' p='6' rounded='md' bg='white' width='500px'>
        {props.children}
      </Box>
    </Box>
  );
}

export default CenteredModal;