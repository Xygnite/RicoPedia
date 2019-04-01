/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, CardItem, Body, Left, Thumbnail } from "native-base";
class ProductData extends Component {
    render() {
        return (
            <Card>
                <TouchableOpacity onPress={this.props.getDetails}>
                    <CardItem>
                        <Left>
                            <Thumbnail
                                source={this.props.itemImage}
                                style={{ overflow: "visible" }}
                            />
                            <Body>
                                <Text>
                                    {this.props.itemName} -{" "}
                                    {this.props.itemPrice}
                                </Text>
                                <Text note>{this.props.itemSeller}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </TouchableOpacity>
            </Card>
        );
    }
}

export default ProductData;
