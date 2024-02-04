import { Button, Divider, FormControl, FormLabel, HStack, Heading, Stack, Switch } from "@chakra-ui/react";
import CenteredModal from "../components/CenteredModal";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getPreferences, updatePreferences } from "../api/preferences";

interface ProfileFormValues {
  saveStrokeData: boolean;
}

const ProfilePage = () => {
  const { register, watch, setValue } = useForm<ProfileFormValues>();
  const saveStrokeData = watch('saveStrokeData', false);

  useEffect(() =>{ 
    updatePreferences({
      storeData: saveStrokeData 
    });
  }, [saveStrokeData]);
  
  useEffect(() => {
    (async() => {
      const res = await getPreferences();
      setValue('saveStrokeData', res.data.preferences.storeData);
    })();
  }, [setValue]);
  return (
    <CenteredModal>
      <Heading as='h4' fontSize='32px'>My Profile</Heading>
      <Stack marginTop='24px' gap='4px'>
        <Heading as='h5' fontSize='24px' mb='16px'>Preferences</Heading>
        <FormControl>
          <HStack alignItems={'center'}>
            <FormLabel mb={0}>Save Data</FormLabel>
              <Switch size='md' ml='auto' {...register('saveStrokeData')} isChecked={saveStrokeData} />
          </HStack>
        </FormControl>  
        <Divider marginY={'24px'}/> 
        <Button>Download My Data</Button>
      </Stack>
    </CenteredModal>
  )
}

export default ProfilePage;
