import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import Color from '../../constants/Colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthStore } from '../../App';

const AuthScreen = (props: any) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsloading] = useState(Boolean);
    const [error, setError] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const authStore = useContext(AuthStore);

    const authHandler = async () => {
        setIsloading(true);
        setError('');
        if (isSignup) {
            if (!filter.test(email)) {
                Alert.alert('Error', 'Email không đúng', [{ text: 'OK' }]);
                return;
            }
            if (password.length < 6) {
                Alert.alert('Error', 'Password không được nhỏ hơn 6 ký tự', [{ text: 'OK' }]);
                return;
            }
            try {
                // await dispatch(AuthActions.signup(email, password));
                await authStore.signup(email,password);
            }
            catch (err) {
                setError(err.message);
            }
            setIsloading(false);
        }
        else {
            try {
                // await dispatch(AuthActions.Login(email, password));
                await authStore.login(email,password);
                navigation.replace('drawer');
            }
            catch (err) {
                setError(err.message);
            }
            setIsloading(false);
        }
    };

    useEffect(() => {
        if (error) {
            Alert.alert('error', error, [{ text: 'OK' }]);
        }

    }, [error]);

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Email</Text>
                        <TextInput style={styles.textInput} keyboardType='email-address' autoCapitalize='none'
                            onChangeText={text => setEmail(text)} returnKeyType='go' />
                        {!filter.test(email) &&
                            <View style={{ marginVertical: 2, marginHorizontal: 5 }}>
                                <Text style={{ color: 'red' }}>Email not correct</Text>
                            </View>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Password</Text>
                        <TextInput style={styles.textInput} keyboardType='default' secureTextEntry
                            onChangeText={text => SetPassword(text)} />
                    </View>
                </View>
                <View style={styles.body}>

                    <View style={styles.buttonAccept} >
                        {isLoading ? <View><ActivityIndicator size='small' color={Color.deepPink}></ActivityIndicator></View> :
                            <Button title={isSignup ? "Sign Up" : "Login"} color={Color.deepPink} onPress={authHandler} />}
                    </View>
                    <View style={styles.buttonNext}>
                        <Button title={isSignup ? "switch login" : "not account"} color={Color.deepPink} onPress={() => setIsSignup(pre => !pre)} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: 300,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
        elevation: 5,
        borderRadius: 10,
    },
    inputContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15
    },
    textInput: {
        borderBottomColor: '#888',
        borderBottomWidth: 1,
        marginHorizontal: 10,
    },
    buttonAccept: {
        marginVertical: 15,
        alignItems: 'center',
    },
    buttonNext: {

    },
    header: {
        height: '65%'
    },
    body: {

    }
});

export default AuthScreen;