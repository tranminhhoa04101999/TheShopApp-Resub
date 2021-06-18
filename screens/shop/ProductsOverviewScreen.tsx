import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import ProductItem from '../../components/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import Color from '../../constants/Colors';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ProductResub,CartStore } from '../../App';
import { withResubAutoSubscriptions } from 'resub';


const ProductOverviewScreen = (props:any) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    

    const productStore = useContext(ProductResub);
    const availableProducts = productStore.getAvailableProducts();

    const cartStore = useContext(CartStore);


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="menu" title="Menu" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                </HeaderButtons>,
            headerRight: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="cart-sharp" title="cart-outline" onPress={() => navigation.navigate('Cart')}></Item>
                </HeaderButtons>,
        });
    }, []);

    const isload = useCallback(async () => {
        setError(undefined);
        try {
            await productStore.fetchProduct();
        }
        catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [setIsLoading, setError]);

    useEffect(() => {
        setIsLoading(true);
        isload().then(() => {
            setIsLoading(false)
        }
        );
    }, [ isload]);

    if (error) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>have error is here,come back again !!!{error}</Text>
        </View>
    };
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Color.primaryColor} />
        </View>
    };
    if (!isLoading && availableProducts.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Product is here !!!</Text>
        </View>
    };


    const renderItem = (data:any) => {
        return <ProductItem
            title={data.item.title}
            price={data.item.price}
            imageUrl={data.item.imageUrl}
            onSelected={() => navigation.navigate('ProductDetails', {
                productId: data.item.id,
            })}
        >
            <View style={styles.buttonContainer}>
                <View style={styles.buttonLeft}>
                    <Button color={Color.deepPink} title="View Details"
                        onPress={() => navigation.navigate('ProductDetails', {
                            productId: data.item.id,
                        })} />
                </View>
                <View style={styles.buttonRight}>
                    <Button color={Color.deepPink} title="To Cart"
                        onPress={() => cartStore.addToCart(data.item)}
                    />
                </View>
            </View>
        </ProductItem>
    };


    return (
        <FlatList
            onRefresh={isload}
            refreshing={isLoading}
            data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={renderItem} />
    );
};
const styles = StyleSheet.create({
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
});

export default withResubAutoSubscriptions(ProductOverviewScreen);