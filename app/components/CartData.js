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
                                    {this.props.itemPrice}
                                </Text>
                                <Text style={{ fontSize: 13 }}>
                                    {this.props.itemSeller}
                                </Text>
                            </Body>
                        </Left>
                        <Left style={{ flex: 4 }}>
                            <Button
                                style={styles.buttonWhite}
                                onPress={this.props.subQty}
                            >
                                <MaterialIcons
                                    name={"keyboard-arrow-left"}
                                    size={25}
                                    color={"#ffffff"}
                                />
                            </Button>
                            <Body>
                                <Text>Qty :</Text>
                            </Body>

                            <Input
                                keyboardType={"number-pad"}
                                onChangeText={this.props.textChange}
                                onEndEditing={this.props.editChange}
                                value={this.props.itemQty}
                            />
                            <Button
                                style={styles.buttonWhite}
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
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonWhite: {
        backgroundColor: "#44bb44"
    }
});
export default CartData;
