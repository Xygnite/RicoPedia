import React, { Component } from "react";
import { Container, Body, Footer, Button } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    KeyboardAvoidingView
} from "react-native";
import { withNavigation } from "react-navigation";
import axios from "axios";

import CartData from "../components/CartData";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            deletedKey: "",
            total: 0
        };
    }
    componentDidMount() {
        axios.get("http://192.168.43.139:3333/v1/orders").then(res => {
            const orders = res.data.data;
            this.setState({ orders: orders });
            console.log(orders);
        });
    }
    componentDidUpdate() {
        // console.log("updated!");
        // axios.get("http://192.168.43.139:3333/v1/orders").then(res => {
        //     const orders = res.data.data;
        //     this.setState({ orders: orders });
        //     console.log(orders);
        // });
    }
    // componentWillUnmount() {}
    // componentDidMount() {
    //     this.addData();
    // }
    // componentDidUpdate() {
    //     const { navigation } = this.props;
    //     if (this.state.orders.length > 0) {
    //         const total = this.state.orders
    //             .map(x => x.price * x.qty)
    //             .reduce((a, b) => a + b)
    //             .toString();
    //         if (this.state.total !== total) {
    //             this.setState({
    //                 total: total
    //             });
    //         }
    //     }
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log("didupdate");
    //     const { navigation } = this.props;
    //     const key = navigation.getParam("itemKey", "");
    //     const qty = navigation.getParam("itemQty", "");
    //     const update = navigation.getParam("update", false);
    //     const modID = this.state.orders.filter(x => {
    //         return x.key == key;
    //     });
    //     const prevmodID = prevState.orders.filter(x => {
    //         return x.key == key;
    //     });
    //     const index = this.state.orders.indexOf(x => x.key == key) + 1;

    //     if (modID.length < 1) {
    //         this.addData();
    // } else {
    //     console.log(index);
    //     this.setState({
    //         orders: [
    //             ...this.state.orders.slice(0, index),
    //             Object.assign({}, this.state.orders[index], {
    //                 qty: this.state.orders[index].qty + qty
    //             }),
    //             ...this.state.orders.slice(index + 1)
    //         ]
    //     });
    //     }

    // }
    addNum = (item, index) => () => {
        this.setState({
            orders: [
                ...this.state.orders.slice(0, index),
                Object.assign({}, this.state.orders[index], {
                    qty: item.qty + 1
                }),
                ...this.state.orders.slice(index + 1)
            ]
        });
    };
    subNum = (item, index) => () => {
        if (this.state.orders[index].qty < 2) {
            this.setState({
                orders: [
                    ...this.state.orders.slice(0, index),
                    Object.assign({}, this.state.orders[index], {
                        qty: 1
                    }),
                    ...this.state.orders.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                orders: [
                    ...this.state.orders.slice(0, index),
                    Object.assign({}, this.state.orders[index], {
                        qty: item.qty - 1
                    }),
                    ...this.state.orders.slice(index + 1)
                ]
            });
        }
    };
    textNum = (item, index) => text => {
        if (this.state.orders[index].qty == 0) {
            console.log("if");
            this.setState({
                orders: [
                    ...this.state.orders.slice(0, index),
                    Object.assign({}, this.state.orders[index], {
                        qty: parseInt(text)
                    }),
                    ...this.state.orders.slice(index + 1)
                ]
            });
        } else {
            console.log("else");
            this.setState({
                orders: [
                    ...this.state.orders.slice(0, index),
                    Object.assign({}, this.state.orders[index], {
                        qty: text.replace(/[^0-9]/g, "")
                    }),
                    ...this.state.orders.slice(index + 1)
                ]
            });
        }
    };
    editNum = (item, index) => () => {
        if (this.state.orders[index].qty == 0 || null) {
            console.log("if");
            this.setState({
                orders: [
                    ...this.state.orders.slice(0, index),
                    Object.assign({}, this.state.orders[index], {
                        qty: 1
                    }),
                    ...this.state.orders.slice(index + 1)
                ]
            });
        }
    };
    addData() {
        var d = new Date();
        const { navigation } = this.props;
        navigation.addListener("willFocus", () => {
            const { navigation } = this.props;
            const img = navigation.getParam("itemImage", "");
            const name = navigation.getParam("itemName", "");
            const price = navigation.getParam("itemPrice", "");
            const seller = navigation.getParam("itemSeller", "");
            const details = navigation.getParam("orderss", "");
            const key = navigation.getParam("itemKey", "");
            const qty = navigation.getParam("itemQty", "");
            const modID = this.state.orders.filter(x => {
                return x.key == key;
            });
            if (key == "delete") {
                this.setState({
                    orders: []
                });
            } else if (modID.length == 1) {
                console.log(key);
                const index = this.state.orders.map(x => x.key).indexOf(key);

                console.log("index", index);
                this.setState({
                    orders: [
                        ...this.state.orders.slice(0, index),
                        Object.assign({}, this.state.orders[index], {
                            qty: this.state.orders[index].qty + qty
                        }),
                        ...this.state.orders.slice(index + 1)
                    ]
                });
            } else if (modID.length < 1 && key !== "") {
                this.setState({
                    orders: [
                        ...this.state.orders,
                        {
                            key: key,
                            img: img,
                            name: name,
                            price: price,
                            seller: seller,
                            details: details,
                            qty: qty
                        }
                    ]
                });
            }
        });
    }
    delData = (item, index) => () => {
        // if (this.state.orders.length == 1) {
        //     this.setState({
        //         orders: [],
        //         deletedKey: item.key
        //     });
        // } else {
        // const modState = this.state.orders.filter(x => {
        //     return x.key !== item.key;
        // });
        // this.setState({
        //     orders: [...modState],
        //     deletedKey: item.key
        // });
        // }
        console.log()
        axios
            .delete("http://192.168.43.139:3333/v1/order/" + item.id)
            .then(() => {
                const modState = this.state.orders.filter(x => {
                    return x.id !== item.id;
                });
                this.setState({
                    orders: [...modState]
                });
            });
    };
    render() {
        const { navigation } = this.props;

        if (this.state.orders.length < 1) {
            return (
                <Container
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <MaterialIcons
                        name="add-shopping-cart"
                        style={{ fontSize: 200 }}
                    />
                    <Text>Hey Misqueen! Tambah Item yuk!</Text>
                </Container>
            );
        } else {
            console.log(this.state.orders[0].qty);
            const total = this.state.orders
                .map(x => x.price * x.qty)
                .reduce((a, b) => a + b)
                .toString();
            return (
                <Container>
                    <FlatList
                        viewabilityConfig={{
                            viewAreaCoveragePercentThreshold: 0
                        }}
                        data={this.state.orders}
                        renderItem={({ item, index }) => (
                            <CartData
                                ref={child => {
                                    this.child = child;
                                }}
                                {...this.props}
                                cartId={item.id}
                                itemId={item.product_id}
                                itemPrice={item.price}
                                itemQty={item.qty.toString()}
                                addQty={this.addNum(item, index)}
                                subQty={this.subNum(item, index)}
                                textChange={this.textNum(item, index)}
                                editChange={this.editNum(item, index)}
                                delData={this.delData(item, index)}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />

                    <Footer style={styles.footerStyle}>
                        <View
                            style={{
                                fontWeight: "bold",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Body>
                                <Text
                                    style={{ color: "#dddddd", fontSize: 12 }}
                                >
                                    Total Belanjamu :
                                </Text>
                            </Body>
                            <Body>
                                <Text
                                    style={{
                                        color: "#44bb44",
                                        fontSize: 18,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Rp.{" "}
                                    {total.replace(
                                        /(\d)(?=(\d\d\d)+(?!\d))/g,
                                        "$1,"
                                    )}
                                </Text>
                            </Body>
                        </View>
                        <Button
                            style={styles.buttonMain}
                            onPress={() => {
                                this.props.navigation.navigate("Checkout", {
                                    itemPrice: this.state.total
                                });
                            }}
                        >
                            <Text style={{ color: "#ffffff" }}>Checkout</Text>
                        </Button>
                    </Footer>
                </Container>
            );

            <CartData />;
        }
    }
}
const styles = StyleSheet.create({
    footerStyle: {
        backgroundColor: "#ffffff",
        paddingBottom: 5,
        paddingTop: 5,
        justifyContent: "center",
        textAlign: "center"
    },
    buttonMain: {
        backgroundColor: "#44bb44",
        marginLeft: 4,
        marginRight: 4,
        flex: 1,
        justifyContent: "center"
    }
});
export default Cart;
