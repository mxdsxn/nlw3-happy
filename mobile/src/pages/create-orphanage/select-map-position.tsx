import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../images/mapMarker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('create-orphanage');
  }
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const handleMapClick = (event: any) => {
    const {
      lat,
      lng
    } = event
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -22.5052902,
          longitude: -44.0925879,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
        style={styles.mapStyle}
        onPress={x => handleMapClick(x)}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={{
            latitude: -22.5052902,
            longitude: -44.0925879
          }}
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})