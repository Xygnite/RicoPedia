/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Card, CardItem, Body, Header, Thumbnail } from "native-base";
class ProductData extends Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirectopn: "column" }}>
                <Card>
                    <TouchableOpacity onPress={this.props.getDetails}>
                        <CardItem cardBody>
                            <Image
                                source={this.props.itemImage}
                                style={{ height: 150, width: null, flex: 1 }}
                            />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontWeight: "bold" }}>
                                    {this.props.itemName}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#44bb44",
                                        fontSize: 18
                                    }}
                                >
                                    Rp.{" "}
                                    {this.props.itemPrice
                                        .toString()
                                        .replace(
                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                            "$1,"
                                        )}
                                </Text>
                                <Text style={{ fontSize: 13 }}>
                                    {this.props.itemSeller}
                                </Text>
                            </Body>
                        </CardItem>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}

export default ProductData;
