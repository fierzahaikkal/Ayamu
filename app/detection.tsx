import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'tamagui';

const Detection = () => {
  const [facing, setFacing] = useState<string>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return null;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <>
      <CameraView />
    </>
  );
};

export default Detection;

const styles = StyleSheet.create({});
