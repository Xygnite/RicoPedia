/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Left,
    Thumbnail,
    Icon
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import CartData from "../components/CartData";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemDetail: []
        };
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    addData() {
        var d = new Date();
        const { navigation } = this.props;
        const img = navigation.getParam("itemImage", "");
        const name = navigation.getParam("itemName", "");
        const price = navigation.getParam("itemPrice", "");
        const seller = navigation.getParam("itemSeller", "");
        const details = navigation.getParam("itemDetails", "");
        const key = navigation.getParam("itemKey", "");
        if (key !== "") {
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail,
                    {
                        key: key,
                        img: img,
                        name: name,
                        price: price,
                        seller: seller,
                        details: details
                    }
                ]
            });
        }
    }
    render() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.addData();
        });
        if (this.state.itemDetail.length < 1) {
            return (
                <Container
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <MaterialIcons
                        name="add-shopping-cart"
                        style={{ fontSize: 200 }}
                    />
                    <Text>Hey Misqueen! Tambah Item yuk!</Text>
                </Container>
            );
        } else {
            return (
                <Container>
                    <FlatList
                        data={this.state.itemDetail}
                        renderItem={({ item }) => (
                            <CartData
                                itemKey={item.key}
                                itemImage={item.img}
                                itemName={item.name}
                                itemSeller={item.seller}
                                itemPrice={item.price}
                                itemDetails={item.details}
                            />
                        )}
                    />
                </Container>
            );

            <CartData />;
        }
    }
}
export default withNavigation(ProductList);
