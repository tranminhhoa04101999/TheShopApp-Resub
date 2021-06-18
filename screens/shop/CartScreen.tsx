import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Button, Text, ActivityIndicator } from 'react-native';
import Color from '../../constants/Colors';
import CartItem from '../../components/CartItem';
import { CartStore,OrderStore } from '../../App';
import { useContext } from 'react';
import { withResubAutoSubscriptions } from 'resub';


const CartScreen = (props: any) => {
    const [isLoading, setLoading] = useState(false);

    const cartStore = useContext(CartStore);
    const totalAmount = cartStore.getTotalAmount();

    const orderStore = useContext(OrderStore);

    const items = cartStore.getItems();
    
    const listItem: any = [];
    for (const key in items) {
        listItem.push({
            productId: key,
            productTitle: items[key].ProductTitle,
            productPrice: items[key].productPrice,
            quantity: items[key].quantity,
            sum: items[key].sum,
        });
    }
    // console.log("items CartScreen",items,listItem);
    
    const renderItem = (data: any) => {
        return (
            <CartItem
                quantity={data.item.quantity}
                title={data.item.productTitle}
                price={data.item.productPrice}
                checkDelete={true}
                sum={data.item.sum}
                onRemove={() => cartStore.removeFromCart(data.item.productId)}
            />
        );

    };

    const addOrder = async () => {
        setLoading(true);
         await orderStore.addOrder(listItem,totalAmount);
         cartStore.setDefault();
        setLoading(false);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total : <Text style={styles.amount}>$ {totalAmount.toFixed(2)}</Text>
                </Text>
                {isLoading ? <View><ActivityIndicator size="small" color={Color.primaryColor}></ActivityIndicator></View> :
                    <Button title="Order Now" disabled={listItem.length === 0}
                        onPress={addOrder}>
                    </Button>}
            </View>
            <FlatList data={listItem} keyExtractor={item => item.productId} renderItem={renderItem} />
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 19,
    },
    amount: {
        color: Color.accentColor,
    },
});

export default withResubAutoSubscriptions(CartScreen);