import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = (props:any) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity} >{props.quantity}  </Text>
                <Text style={styles.title} >{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount} >${props.sum.toFixed(2)}</Text>
                {props.checkDelete &&
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Icon name="trash-bin" color='red'></Icon>
                    </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 2,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        fontFamily: 'OpenSans',
        color: '#888',
    },
    title: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
    },
    amount: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
    },
    deleteButton: {
        marginHorizontal: 10,
    }
});

export default CartItem;