import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Card, CardItem, Body } from "native-base";
import axios from "axios";

class ProductData extends Component {
    componentDidMount() {}
    render() {
        return (
            <View style={{ flex: 1, flexDirectopn: "column" }}>
                <Card>
                    <TouchableOpacity onPress={this.props.getDetails}>
                        <CardItem cardBody>
                            <Image
                                source={{
                                    uri:
                                        "http://192.168.43.139:3333/" +
                                        this.props.itemImage
                                }}
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
