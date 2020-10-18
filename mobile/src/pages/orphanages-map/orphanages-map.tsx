import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import mapMarker from '../../images/mapMarker.png'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { happyApi } from '../../services/api';

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}
export default () => {
    const navigation = useNavigation()

    const [orphanages, setOrphanages] = useState<Array<Orphanage>>([])

    useEffect(() => {
        happyApi.orphanageList().then(res => { setOrphanages(res) }
        )
    }, [])

    const handleNavigationToOrphanageDatails = (id: number) => {
        navigation.navigate('orphanage-details', { id })
    }

    const handleNavigationToSelectMapPosition = () => {
        navigation.navigate('select-position-orphanage')
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
                style={styles.map}
                provider={PROVIDER_GOOGLE}
            >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude
                            }}
                        >
                            <Callout
                                tooltip
                                onPress={() => handleNavigationToOrphanageDatails(orphanage.id)}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>
                                        {orphanage.name}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {orphanages.length} orfanatos encontrados
                </Text>

                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigationToSelectMapPosition}
                >
                    <Feather
                        name='plus'
                        size={20}
                        color='#fff'
                    />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        elevation: 3
    },
    calloutText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5',
        fontSize: 14
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 46,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3
    },
    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3'
    },
    createOrphanageButton: {
        width: 46,
        height: 46,
        backgroundColor: '#15c3d6',
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center"
    }
});
