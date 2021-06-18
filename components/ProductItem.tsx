import React from 'react';
import { View, StyleSheet, Image, Text, Button, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Color from '../constants/Colors';

const ProductItem = (props:any) => {
    // let Touch = TouchableOpacity;
    // if (Platform.OS === 'android' && Platform.Version >= 21) {
    //     Touch = TouchableNativeFeedback;
    // }

    return (
        <View style={styles.screen}>
            <TouchableNativeFeedback onPress={props.onSelected} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.imageUrl }} style={styles.image} />

                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>{props.price}</Text>
                    </View>
                    {props.children}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 10,
        marginHorizontal: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        overflow: 'hidden',
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        height: '25%',
        alignItems: 'center',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '15%',
    },
    buttonLeft: {
        borderTopRightRadius: 15,
        overflow: 'hidden',
        width: '30%',
    },
    buttonRight: {
        borderTopLeftRadius: 15,
        overflow: 'hidden',

    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
    },

});

export default ProductItem;