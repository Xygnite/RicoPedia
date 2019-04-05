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
    Radio,
    Input,
    Form,
    Picker,
    Item,
    Textarea
} from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    BackHandler,
    ScrollView
} from "react-native";

import Cart from "./Cart";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            selected: "key0",
            selectedp: "key0"
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onValueChangep(value) {
        this.setState({
            selectedp: value
        });
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerLeft: (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Cart", {
                            itemKey: "",
                            itemImage: "",
                            itemName: "",
                            itemPrice: "",
                            itemSeller: "",
                            itemDetails: "",
                            itemQty: ""
                        })
                    }
                >
                    <MaterialIcons
                        style={{ paddingLeft: 8 }}
                        name={"chevron-left"}
                        size={32}
                    />
                </TouchableOpacity>
            )
        };
    };
    componentDidMount() {
        const { navigation } = this.props;

        const price = navigation.getParam("itemPrice", "");
        this.setState({
            price: price
        });
        BackHandler.addEventListener("hardwareBackPress", function() {
            navigation.navigate("Cart", {
                itemKey: ""
            });
            return true;
        });
    }

    componentDidUpdate() {
        const { navigation } = this.props;

        const price = navigation.getParam("itemPrice", "");
        if (this.state.price !== price) {
            this.setState({
                price: price
            });
        }
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <Content>
                        <Card>
                            <CardItem
                                header
                                style={{
                                    flex: 1
                                }}
                            >
                                <Body
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Text>Total Belanjamu:</Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "#44bb44",
                                            paddingTop: 8,
                                            fontSize: 30
                                        }}
                                    >
                                        Rp.{" "}
                                        {this.state.price
                                            .toString()
                                            .replace(
                                                /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                "$1,"
                                            )}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem
                                header
                                style={{
                                    flex: 1
                                }}
                            >
                                <Body
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Form>
                                        <Text
                                            style={{
                                                fontSize: 15
                                            }}
                                        >
                                            Mau Diantar Siapa Nih?
                                        </Text>
                                        <Item picker>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                style={{ width: 120 }}
                                                selectedValue={
                                                    this.state.selected
                                                }
                                                onValueChange={this.onValueChange.bind(
                                                    this
                                                )}
                                            >
                                                <Picker.Item
                                                    label="Je En Ey"
                                                    value="key0"
                                                />
                                                <Picker.Item
                                                    label="Jey En Ti"
                                                    value="key1"
                                                />
                                                <Picker.Item
                                                    label="Tee Key"
                                                    value="key2"
                                                />
                                                <Picker.Item
                                                    label="She Cepats"
                                                    value="key3"
                                                />
                                                <Picker.Item
                                                    label="Wah Ana"
                                                    value="key4"
                                                />
                                            </Picker>
                                        </Item>
                                    </Form>
                                    <Form>
                                        <Text
                                            style={{
                                                fontSize: 15
                                            }}
                                        >
                                            Bayarnya?
                                        </Text>
                                        <Item picker>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                style={{ width: 120 }}
                                                selectedValue={
                                                    this.state.selectedp
                                                }
                                                onValueChange={this.onValueChangep.bind(
                                                    this
                                                )}
                                            >
                                                <Picker.Item
                                                    label="Wallet"
                                                    value="key0"
                                                />
                                                <Picker.Item
                                                    label="ATM Card"
                                                    value="key1"
                                                />
                                                <Picker.Item
                                                    label="Debit Card"
                                                    value="key2"
                                                />
                                                <Picker.Item
                                                    label="Credit Card"
                                                    value="key3"
                                                />
                                                <Picker.Item
                                                    label="Net Banking"
                                                    value="key4"
                                                />
                                            </Picker>
                                        </Item>
                                    </Form>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>Nomor ID</Text>
                                    <Input placeholder={"ID..."} />
                                    <Text>PIN</Text>
                                    <Input placeholder={"PIN..."} />
                                </Body>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Body>
                                    <Form>
                                        <Text>Alamat</Text>
                                        <Textarea placeholder={"Alamat..."} />
                                    </Form>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header>
                                <Button
                                    style={{
                                        backgroundColor: "#44bb44",
                                        flex: 1,
                                        justifyContent: "center",
                                        textAlign: "center"
                                    }}
                                    onPress={() =>
                                        this.props.navigation.navigate("Cart", {
                                            itemKey: "delete"
                                        })
                                    }
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff"
                                        }}
                                    >
                                        Pay Now
                                    </Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

export default Checkout;
