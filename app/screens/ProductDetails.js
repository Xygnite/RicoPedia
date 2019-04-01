/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Container, Content, Card, CardItem, Body, Footer } from "native-base";
import { Text, TouchableOpacity, Image } from "react-native";
class ProductDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        const img = navigation.getParam("itemImage", "");
        const name = navigation.getParam("itemName", "");
        const price = navigation.getParam("itemPrice", "");
        const seller = navigation.getParam("itemSeller", "");
        const details = navigation.getParam("itemDetails", "");
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Image
                                source={img}
                                style={{ height: 400, width: null, flex: 1 }}
                            />
                        </CardItem>
                        <CardItem header>
                            <Text>{name} - </Text>
                            <Text>{price}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text>{details}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{seller}</Text>
                        </CardItem>
                    </Card>
                </Content>
                <Footer />
            </Container>
        );
    }
}

export default ProductDetails;
