import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
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
import axios from "axios";

class CartData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            myNumber: 1,
            added: true
        };
    }
    componentDidMount() {
        const id = this.props.itemId;
        axios.get("http://192.168.43.139:3333/v1/product/" + id).then(res => {
            const product = res.data.data;
            this.setState({ product: product });
            console.log(this.state.product.image);
            const didBlurSubscription = this.props.navigation.addListener(
                "didBlur",
                payload => {
                    console.log("updating...");
                    axios.post("http://192.168.43.139:3333/v1/order", {
                        product_id: this.state.product.id,
                        price: this.state.product.price,
                        qty: this.props.itemQty,
                        addOrChange: "change"
                    });
                }
            );
        });
    }
    componentDidUpdate() {
        console.log("data.update!");
    }
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
        if (this.state.product !== null) {
            return (
                <View key={this.props.itemId}>
                    <Card>
                        <CardItem cardHeader>
                            <Left style={{ flex: 6 }}>
                                <Thumbnail
                                    source={{
                                        uri:
                                            "http://192.168.43.139:3333/" +
                                            this.state.product.image
                                    }}
                                />
                                <Body>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {this.state.product.name}
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
                                        {this.state.product.itemSeller}
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
        } else {
            return null;
        }
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
