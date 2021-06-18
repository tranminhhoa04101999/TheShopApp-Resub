import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStore } from '../App';
import { useContext } from 'react';

const StartupScreen = (props: any) => {

    const authSto = useContext(AuthStore);
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            // console.log("res login lai", userData);

            if (!userData) {
                props.navigation.replace('authUser');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.replace('authUser');
                return;
            }
            props.navigation.replace('drawer');
            authSto.setAuth(token, userId);
        };
        tryLogin();

    }, [authSto]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color='red' />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;