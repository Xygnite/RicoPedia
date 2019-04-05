/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import {
    Card,
    CardItem,
    Body,
    Header,
    Thumbnail,
    Left,
    Right,
    Input,
    Button
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class CartData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myNumber: 1,
            added: true
        };
    }
    componentDidUpdate() {}
    textChange(text) {
        if (text !== "") {
            console.log(text);
            console.log(text.text.replace(/[^0-9]/g, ""));
            this.setState({
                myNumber: parseInt(text.text.replace(/[^0-9]/g, ""))
            });
        } else {
            this.setState({
                myNumber: 1
            });
        }
    }
    render() {
        return (
            <View key={this.props.itemKey}>
                <Card>
                    <CardItem cardHeader>
                        <Left style={{ flex: 6 }}>
                            <Thumbnail source={this.props.itemImage} />
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
                        </Left>
                        <Left style={{ flex: 3.5 }}>
                            <Button
                                style={styles.buttonGreen}
                                onPress={this.props.subQty}
                            >
                                <MaterialIcons
                                    name={"keyboard-arrow-left"}
                                    size={25}
                                    color={"#ffffff"}
                                />
                            </Button>

                            <Input
                                style={{
                                    justifyContent: "center",
                                    textAlign: "center"
                                }}
                                keyboardType={"number-pad"}
                                onChangeText={this.props.textChange}
                                onEndEditing={this.props.editChange}
                                value={this.props.itemQty}
                            />
                            <Button
                                style={styles.buttonGreen}
                                onPress={this.props.addQty}
                            >
                                <MaterialIcons
                                    name={"keyboard-arrow-right"}
                                    size={25}
                                    color={"#ffffff"}
                                />
                            </Button>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <View style={{ flex: 6 }} />
                        <View style={{ flex: 3.5 }}>
                            <Button
                                full
                                style={styles.buttonRed}
                                onPress={this.props.delData}
                            >
                                <MaterialIcons
                                    name={"delete"}
                                    size={25}
                                    color={"#ffffff"}
                                />
                            </Button>
                        </View>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonGreen: {
        backgroundColor: "#44bb44"
    },
    buttonRed: {
        backgroundColor: "#bb4444",
        flex: 1
    }
});
export default CartData;
