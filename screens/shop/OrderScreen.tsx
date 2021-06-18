import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, FlatList, Text ,ActivityIndicator} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';
import Color from '../../constants/Colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { OrderStore } from '../../App';
import { useContext } from 'react';
import { withResubAutoSubscriptions } from 'resub';

const OrderScreen = (props:any) => {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    
    const orderSto = useContext(OrderStore);
    const listOrders = orderSto.getOrders();
    
    const loadData = useCallback( async () => {
        setLoading(true);
        setError(undefined);

        try {
            await orderSto.fetchOrders();
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    },[setError,setLoading]);

    useEffect(() => {
        loadData();
    }, [ loadData]);

    const renderItem = (data:any) => {
        return (
            <OrderItem
                totalAmount={data.item.totalAmount}
                date={data.item.renderTime}
                items={data.item.items}

            />
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="menu" title="Menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                </HeaderButtons>,
        });
    }, []);

    if (error) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{error}</Text>
        </View>
    };
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Color.primaryColor} />
        </View>
    };
    if (!isLoading && listOrders.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No order is here !!!</Text>
        </View>
    };

    return (
        <FlatList data={listOrders} keyExtractor={item => item.id+Math.random()} renderItem={renderItem} />
    );
};

const styles = StyleSheet.create({

});

export default withResubAutoSubscriptions(OrderScreen);