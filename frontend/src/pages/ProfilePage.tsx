import { Button, Divider, FormControl, FormLabel, HStack, Heading, Stack, Switch } from "@chakra-ui/react";
import CenteredModal from "../components/CenteredModal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getPreferences, updatePreferences } from "../api/preferences";
import { getStrokeData } from "../api/strokeData";

interface ProfileFormValues {
  saveStrokeData: boolean;
}

const ProfilePage = () => {
  const { register, watch, setValue } = useForm<ProfileFormValues>();
  const saveStrokeData = watch('saveStrokeData', false);
  
  const downloadStrokeData = async () => {
    const res = await getStrokeData();
    const url = window.URL.createObjectURL(res.data);
    // Hack to download file. TODO: Find better way to do this
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const updateSaveStrokeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePreferences({
      storeData: e.target.checked, 
    });
  };

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
              <Switch size='md' ml='auto' {...register('saveStrokeData', { onChange: updateSaveStrokeData })} isChecked={saveStrokeData} />
          </HStack>
        </FormControl>  
        <Divider marginY={'24px'}/> 
        <Button onClick={downloadStrokeData}>Download My Data</Button>
      </Stack>
    </CenteredModal>
  )
}

export default ProfilePage;
