import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { OrphanagesMap } from './pages/orphanages-map'
import { OrphanageDetails } from './pages/orphanage-details'
import {
    CreateOrphanage,
    SelectMapPosition
} from './pages/create-orphanage'
import { Header } from './commons/header'

const { Navigator, Screen } = createStackNavigator()

export default () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen
                    name='orphanages-map'
                    component={OrphanagesMap}
                />
                <Screen
                    name='orphanage-details'
                    component={OrphanageDetails}
                    options={{ headerShown: true, header: () => <Header headerTitle='Orfanato' /> }}
                />
                <Screen
                    name='create-orphanage'
                    component={CreateOrphanage}
                    options={{ headerShown: true, header: () => <Header headerTitle='Dados do orfanato' closeButton /> }}
                />
                <Screen
                    name='select-position-orphanage'
                    component={SelectMapPosition}
                    options={{ headerShown: true, header: () => <Header headerTitle='Selecione o orfanato no mapa' closeButton /> }}
                />
            </Navigator>
        </NavigationContainer>
    )
}