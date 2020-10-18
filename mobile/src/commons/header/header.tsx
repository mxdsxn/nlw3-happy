import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface Props {
    headerTitle: string,
    closeButton?: boolean
}

export default (props: Props) => {
    const navigation = useNavigation()

    const handleNavigationToMap = () => {
        navigation.navigate('orphanages-map')
    }

    const handleNavigationGoBack = () => {
        const { canGoBack, goBack } = navigation
        canGoBack() && goBack()
    }

    return (
        <View style={styles.container} >
            <BorderlessButton onPress={handleNavigationGoBack}>
                <Feather name='arrow-left' size={24} color='#15b5d6' />
            </BorderlessButton>

            <Text style={styles.title}>
                {props.headerTitle}
            </Text>

            {props.closeButton
                ? (
                    <BorderlessButton onPress={handleNavigationToMap}>
                        <Feather name='x' size={24} color='#ff669d' />
                    </BorderlessButton>
                )
                : <View />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderBottomColor: '#dde3f0',
        paddingTop: 44,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16
    }
})