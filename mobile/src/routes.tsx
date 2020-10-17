import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from './pages/orphanages-map'
import OrphanageDetails from './pages/orphanage-datails'

const { Navigator, Screen } = createStackNavigator()

export default () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen
                    name='orphanage-map'
                    component={OrphanagesMap}
                />
                <Screen
                    name='orphanage-details'
                    component={OrphanageDetails}
                />
            </Navigator>
        </NavigationContainer>
    )
}