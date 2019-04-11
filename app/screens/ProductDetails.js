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
    Input
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            product: []
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
    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam("itemId", "");
        axios.get("http://192.168.43.139:3333/v1/product/" + id).then(res => {
            const product = res.data.data;
            this.setState({ product: product });
            console.log(this.state.product.id);
        });
    }
    onTextChanged = text => {
        if (this.state.qty < 1) {
            this.setState({
                qty: parseInt(text)
            });
        } else {
            this.setState({
                qty: text.replace(/[^0-9]/g, "")
            });
        }
    };
    onTextEnd() {
        if (this.state.qty < 1) {
            this.setState({
                qty: 1
            });
        }
    }
    addNum = () => {
        if (this.state.qty < 1) {
            this.setState({
                qty: 1
            });
        } else {
            this.setState({
                qty: this.state.qty + 1
            });
        }
    };
    subNum = () => {
        if (this.state.qty < 2) {
            this.setState({
                qty: 1
            });
        } else {
            this.setState({
                qty: this.state.qty - 1
            });
        }
    };
    render() {
        if (this.state.product.length !== 0) {
            return (
                <Container>
                    <Content>
                        <Card>
                            <CardItem header>
                                <Image
                                    source={{
                                        uri:
                                            "http://192.168.43.139:3333/" +
                                            this.state.product.image
                                    }}
                                    style={{
                                        height: 350,
                                        width: null,
                                        flex: 1
                                    }}
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
                                        {this.state.product.name} -{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "#44bb44",
                                            fontSize: 18
                                        }}
                                    >
                                        Rp.{" "}
                                        {this.state.product.price
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
                                        value={this.state.qty.toString()}
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
                                <Text>{this.state.product.description}</Text>
                            </CardItem>
                            <CardItem>
                                <Text>{this.state.product.seller}</Text>
                            </CardItem>
                        </Card>
                    </Content>
                    <Footer style={styles.footerStyle}>
                        <Button
                            style={styles.footerButton}
                            onPress={() => {
                                this.props.navigation.navigate("Cart"),
                                    axios.post(
                                        "http://192.168.43.139:3333/v1/order",
                                        {
                                            product_id: this.state.product.id,
                                            price: this.state.product.price,
                                            qty: this.state.qty,
                                            addOrChange: "add"
                                        }
                                    );
                            }}
                        >
                            <Text>Add to Cart</Text>
                        </Button>
                        <Button
                            style={styles.footerButtonMain}
                            onPress={() => {
                                this.props.navigation.navigate("Checkout", {
                                    itemPrice: this.state.price * this.state.qty
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>Buy Now</Text>
                        </Button>
                    </Footer>
                </Container>
            );
        } else {
            return null;
        }
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
