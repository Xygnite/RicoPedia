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

import CartData from "../components/CartData";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemDetail: []
        };
    }
    render() {
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
    }
}

export default ProductList;
