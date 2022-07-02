/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { launchCamera } from 'react-native-image-picker';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const CRT = `-----BEGIN CERTIFICATE-----
MIID2jCCAsKgAwIBAgIUT9lChErS8YwrnS/6Pn33gnanjYwwDQYJKoZIhvcNAQEL
BQAwgZ0xCzAJBgNVBAYTAklOMRMwEQYDVQQIDApNYWhhcmFzdHJhMQ4wDAYDVQQH
DAVUaGFuZTESMBAGA1UECgwJS29pUmVhZGVyMQwwCgYDVQQLDANERVYxFTATBgNV
BAMMDEJoYWt0aWogS29saTEwMC4GCSqGSIb3DQEJARYhYmhha3Rpai5qYXlhbnQu
a29saUBrb2lyZWFkZXIuY29tMB4XDTIyMDYzMDA1NTkzMFoXDTMyMDYyNzA1NTkz
MFowgZ0xCzAJBgNVBAYTAklOMRMwEQYDVQQIDApNYWhhcmFzdHJhMQ4wDAYDVQQH
DAVUaGFuZTESMBAGA1UECgwJS29pUmVhZGVyMQwwCgYDVQQLDANERVYxFTATBgNV
BAMMDEJoYWt0aWogS29saTEwMC4GCSqGSIb3DQEJARYhYmhha3Rpai5qYXlhbnQu
a29saUBrb2lyZWFkZXIuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAtWboafBlApzbKlpuU+yKlGppnDf2G4a46a3SPstppiGiBESV3cefkTGvDjnj
vf3+dPSsrqzSzwSgYe7hmLczIKUHFxtPHqc8JOjy/yzXKFLWBDgFWLUw8g5ghwTH
7XrawLVuFX+PIC92tg8MB43R63+4W1jPaHc+DEqkNcDZWx5GyGZaLb5MCc1R0DcR
7z7GeV2fjE++FwrgVW/DR8pPhktzv2TqpgkZq/U1jdahfGdqb16/D9WuRuG5FQyo
oqX2ZHKTVNuDBtxGg4gQTn1jiiWlCDiscKMT69rwBPDvGFGt/75VLuAUEZLrzlEF
jC3RMDUaduukETyxRCJIqJ0nfwIDAQABoxAwDjAMBgNVHRMEBTADAQH/MA0GCSqG
SIb3DQEBCwUAA4IBAQAowwfCi0kYx3NCIRZMVJk2hpySj5gdRrj+pv9pJFHQFZHq
1wRmbnnIqc0LDLHWASAY8fvBzd4eE/XOGVM17I1ift5Ep1i7Vb/KcIrUDm9lFefk
9AuCkNWEy5hfkr7KJJZg7sSrYaMrAU+XZxcUsff/GqvCBBTD3H6nUqaH6q+QLEAy
gXUfy6rAB+1NWRIu6Gwefl+GNS4aNxfmCaXPe9DF13Zqa+wAjyuJTADkAyyZPsRD
o+j/NXv0ivmjI8X+mmQeeGfyznKEmBTI2lQzn1g9AXDwbZU9GKi/I8nhSr4CWjhg
LbFzEklViuvA95/8EH0zxAzLJn6fZzKG8c4zVD55
-----END CERTIFICATE-----
`

import { NativeModules } from 'react-native';

const { HttpModule } = NativeModules;

const App = () => {
  React.useEffect(() => {
    HttpModule.createSSLClient(CRT, '192.168.0.100')
    // GET Request
    HttpModule.get('https://192.168.0.100:8000/ping')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
    // File Upload
    launchCamera({
      mediaType: 'photo',
    }).then((res) => {
      if (!res.assets) {
        return
      }
      const asset = res.assets[0]
      const { fileName, uri, type } = asset
      HttpModule.upload('https://192.168.0.100:8000/upload', 'file', fileName, uri, type)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [])
  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
