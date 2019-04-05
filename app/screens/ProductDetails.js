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
    Button,
    Footer,
    Body,
    Left,
    Right,
    Input
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Cart from "./Cart";
class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myNumber: 1
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        style={{ paddingLeft: 8 }}
                        name={"chevron-left"}
                        size={32}
                    />
                </TouchableOpacity>
            )
        };
    };
    onTextChanged = text => {
        if (this.state.myNumber < 1) {
            this.setState({
                myNumber: parseInt(text)
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
        const { navigation } = this.props;
        const key = navigation.getParam("itemKey", "");
        const img = navigation.getParam("itemImage", "");
        const name = navigation.getParam("itemName", "");
        const price = navigation.getParam("itemPrice", "");
        const seller = navigation.getParam("itemSeller", "");
        const details = navigation.getParam("itemDetails", "");
        const qty = this.state.myNumber;
        console.log(qty);
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Image
                                source={img}
                                style={{ height: 350, width: null, flex: 1 }}
                            />
                        </CardItem>
                        <CardItem header>
                            <Left style={{ flex: 6 }}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 15
                                    }}
                                >
                                    {name} -{" "}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#44bb44",
                                        fontSize: 18
                                    }}
                                >
                                    Rp.{" "}
                                    {price
                                        .toString()
                                        .replace(
                                            /(\d)(?=(\d\d\d)+(?!\d))/g,
                                            "$1,"
                                        )}
                                </Text>
                            </Left>
                        </CardItem>
                        <CardItem header>
                            <Left style={{ flex: 6 }} />
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
                                    onChangeText={text =>
                                        this.onTextChanged(text)
                                    }
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
                    <Card>
                        <CardItem>
                            <Text>{details}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{seller}</Text>
                        </CardItem>
                    </Card>
                </Content>
                <Footer style={styles.footerStyle}>
                    <Button
                        style={styles.footerButton}
                        onPress={() => {
                            this.props.navigation.navigate("Cart", {
                                itemKey: key,
                                itemImage: img,
                                itemName: name,
                                itemPrice: price,
                                itemSeller: seller,
                                itemDetails: details,
                                itemQty: this.state.myNumber
                            });
                        }}
                    >
                        <Text>Add to Cart</Text>
                    </Button>
                    <Button
                        style={styles.footerButtonMain}
                        onPress={() => {
                            this.props.navigation.navigate("Checkout",{
                                itemPrice: price*this.state.myNumber
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>Buy Now</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    footerButton: {
        backgroundColor: "#dddddd",
        marginLeft: 4,
        marginRight: 4,
        flex: 0.5,
        justifyContent: "center"
    },
    footerButtonMain: {
        backgroundColor: "#44bb44",
        marginLeft: 4,
        marginRight: 4,
        flex: 0.5,
        justifyContent: "center"
    },
    buttonText: {
        color: "#ffffff"
    },
    footerStyle: {
        backgroundColor: "#ffffff",
        paddingBottom: 5,
        paddingTop: 5
    },
    buttonWhite: {
        backgroundColor: "#44bb44"
    }
});

export default ProductDetails;
