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
            myNumber: 1
        };
    }

    onTextChanged = text => {
        if (this.state.myNumber < 1) {
            this.setState({
                myNumber: 1
            });
        } else {
            this.setState({
                myNumber: text.replace(/[^0-9]/g, "")
            });
        }
    };
    onTextEnd() {
        if (this.state.myNumber < 1) {
            this.setState({
                myNumber: 1
            });
        }
    }
    addNum = () => {
        if (this.state.myNumber < 1) {
            this.setState({
                myNumber: 1
            });
        } else {
            this.setState({
                myNumber: this.state.myNumber + 1
            });
        }
    };
    subNum = () => {
        if (this.state.myNumber < 2) {
            this.setState({
                myNumber: 1
            });
        } else {
            this.setState({
                myNumber: this.state.myNumber - 1
            });
        }
    };
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
                                onPress={this.subNum.bind(this)}
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
                                onChangeText={text => this.onTextChanged(text)}
                                onEndEditing={() => this.onTextEnd()}
                                value={this.state.myNumber.toString()}
                            />
                            <Button
                                style={styles.buttonWhite}
                                onPress={this.addNum.bind(this)}
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
