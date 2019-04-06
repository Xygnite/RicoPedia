
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProductList from "./app/screens/ProductList";
import ProductDetails from "./app/screens/ProductDetails";
import Cart from "./app/screens/Cart";
import Checkout from "./app/screens/Checkout";

class App extends Component {
    render() {
        return (
            <View>
                <ProductList />
                <ProductDetails />
                <Cart />
                <Checkout />
            </View>
        );
    }
}

const TabNavigator = createBottomTabNavigator(
    {
        PL: {
            screen: ProductList,
            navigationOptions: {
                tabBarLabel: "Products"
            }
        },
        Cart: {
            screen: Cart,
            navigationOptions: {
                tabBarLabel: "Cart"
            }
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = MaterialIcons;
                let iconName;
                if (routeName === "PL") {
                    iconName = "format-list-bulleted";
                } else if (routeName === "Cart") {
                    iconName = "shopping-cart";
                }

                // You can return any component that you like here!
                return (
                    <IconComponent
                        name={iconName}
                        size={25}
                        color={tintColor}
                    />
                );
            }
        }),
        resetOnBlur: true,
        tabBarOptions: {
            activeTintColor: "#44bb44",
            inactiveTintColor: "#aaaaaa"
        }
    }
);

TabNavigator.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let title;
    if (routeName === "PL") {
        title = "Our Products";
    } else if (routeName === "Cart") {
        title = "Your Shopping Cart";
    }
    return {
        title
    };
};
const AppNavigator = createStackNavigator(
    {
        TN: TabNavigator,
        PD: {
            screen: ProductDetails,
            navigationOptions: {
                title: "Product Details",
                tabBarVisible: "false"
            }
        },
        Checkout: {
            screen: Checkout,
            navigationOptions: {
                title: "Checkout",
                tabBarVisible: "false"
            }
        }
    },
    {
        initialRouteName: "TN"
    }
);

export default createAppContainer(AppNavigator);
