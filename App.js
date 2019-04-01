/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ProductList from "./app/screens/ProductList";
import ProductDetails from "./app/screens/ProductDetails";

class App extends Component {
    render() {
        return (
            <View>
                <ProductList />
                <ProductDetails />
            </View>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        PL: {
            screen: ProductList,
            navigationOptions: {
                title: "Product List"
            }
        },
        PD: {
            screen: ProductDetails,
            navigationOptions: {
                title: "Product Details"
            }
        }
    },
    {
        initialRouteName: "PL"
    }
);

export default createAppContainer(AppNavigator);
