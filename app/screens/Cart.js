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
    Body,
    Left,
    Thumbnail,
    Icon
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import CartData from "../components/CartData";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemDetail: [],
            qtyholder: 0
        };
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    componentDidMount() {
        this.addData();
        console.log("didmount");
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("didupdate");
        const { navigation } = this.props;
        const key = navigation.getParam("itemKey", "");
        const qty = navigation.getParam("itemQty", "");
        const update = navigation.getParam("update", false);
        const modID = this.state.itemDetail.filter(x => {
            return x.key == key;
        });
        const prevmodID = prevState.itemDetail.filter(x => {
            return x.key == key;
        });
        const index = this.state.itemDetail.indexOf(x => x.key == key) + 1;

        if (modID.length < 1) {
            this.addData();
            // } else {
            //     console.log(index);
            //     this.setState({
            //         itemDetail: [
            //             ...this.state.itemDetail.slice(0, index),
            //             Object.assign({}, this.state.itemDetail[index], {
            //                 qty: this.state.itemDetail[index].qty + qty
            //             }),
            //             ...this.state.itemDetail.slice(index + 1)
            //         ]
            //     });
        }
    }
    addNum = (item, index) => () => {
        this.setState({
            itemDetail: [
                ...this.state.itemDetail.slice(0, index),
                Object.assign({}, this.state.itemDetail[index], {
                    qty: item.qty + 1
                }),
                ...this.state.itemDetail.slice(index + 1)
            ]
        });
    };
    subNum = (item, index) => () => {
        if (this.state.itemDetail[index].qty < 2) {
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail.slice(0, index),
                    Object.assign({}, this.state.itemDetail[index], {
                        qty: 1
                    }),
                    ...this.state.itemDetail.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail.slice(0, index),
                    Object.assign({}, this.state.itemDetail[index], {
                        qty: item.qty - 1
                    }),
                    ...this.state.itemDetail.slice(index + 1)
                ]
            });
        }
    };
    textNum = (item, index) => text => {
        if (this.state.itemDetail[index].qty == 0) {
            console.log("if");
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail.slice(0, index),
                    Object.assign({}, this.state.itemDetail[index], {
                        qty: parseInt(text)
                    }),
                    ...this.state.itemDetail.slice(index + 1)
                ]
            });
        } else {
            console.log("else");
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail.slice(0, index),
                    Object.assign({}, this.state.itemDetail[index], {
                        qty: text.replace(/[^0-9]/g, "")
                    }),
                    ...this.state.itemDetail.slice(index + 1)
                ]
            });
        }
    };
    editNum = (item, index) => () => {
        if (this.state.itemDetail[index].qty == 0 || null) {
            console.log("if");
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail.slice(0, index),
                    Object.assign({}, this.state.itemDetail[index], {
                        qty: 1
                    }),
                    ...this.state.itemDetail.slice(index + 1)
                ]
            });
        }
    };
    addData() {
        var d = new Date();
        const { navigation } = this.props;
        const img = navigation.getParam("itemImage", "");
        const name = navigation.getParam("itemName", "");
        const price = navigation.getParam("itemPrice", "");
        const seller = navigation.getParam("itemSeller", "");
        const details = navigation.getParam("itemDetails", "");
        const key = navigation.getParam("itemKey", "");
        const qty = navigation.getParam("itemQty", "");
        console.log("QTY");
        console.log(qty);
        if (key !== "") {
            this.setState({
                itemDetail: [
                    ...this.state.itemDetail,
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
    }
    render() {
        const { navigation } = this.props;
        if (this.state.itemDetail.length < 1) {
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
            return (
                <Container>
                    <FlatList
                        data={this.state.itemDetail}
                        renderItem={({ item, index }) => (
                            <CartData
                                ref={child => {
                                    this.child = child;
                                }}
                                {...this.props}
                                itemKey={item.key}
                                itemImage={item.img}
                                itemName={item.name}
                                itemSeller={item.seller}
                                itemPrice={item.price}
                                itemDetails={item.details}
                                itemQty={item.qty.toString()}
                                addQty={this.addNum(item, index)}
                                subQty={this.subNum(item, index)}
                                textChange={this.textNum(item, index)}
                                editChange={this.editNum(item, index)}
                            />
                        )}
                    />
                </Container>
            );

            <CartData />;
        }
    }
}
export default withNavigation(ProductList);
