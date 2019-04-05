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
    Icon,
    Footer,
    Button
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";

import CartData from "../components/CartData";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemDetail: [],
            shouldUpdate: true,
            isDel: false
        };
    }
    componentDidMount() {
        this.addData();
    }
    shouldComponentUpdate(nextProp, nextState) {
        if (this.state.shouldUpdate == false) {
            return false;
        } else {
            return true;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { navigation } = this.props;
        const key = navigation.getParam("itemKey", "");
        const qty = navigation.getParam("itemQty", "");
        const update = navigation.getParam("update", false);
        const modID = this.state.itemDetail.filter(x => {
            return x.key == key;
        });

        const index = this.state.itemDetail.map(x => x.key).indexOf(key);
        console.log();
        this.setState({
            shouldUpdate: true
        });
        console.log("didupdate");
        if (modID.length < 1) {
            this.addData();
        } else if (this.state.shouldUpdate == true) {
            if (this.state.isDel == true) {
                this.setState({
                    itemDetail: []
                });
            } else {
                this.setState({
                    itemDetail: [
                        ...this.state.itemDetail.slice(0, index),
                        Object.assign({}, this.state.itemDetail[index], {
                            qty: this.state.itemDetail[index].qty + qty
                        }),
                        ...this.state.itemDetail.slice(index + 1)
                    ]
                });
            }

            this.setState({
                shouldUpdate: false
            });
        }
    }
    delData = (item, index) => () => {
        if (this.state.itemDetail.length == 0) {
            this.setState({
                itemDetail: []
            });
        } else {
            const modState = this.state.itemDetail.filter(x => {
                return x.key !== item.key;
            });
            this.setState(
                {
                    itemDetail: [...modState],
                    shouldUpdate: true,
                    isDel: true
                },
                this.setState({
                    shouldUpdate: false,

                    isDel: false
                })
            );
        }
    };
    addNum = (item, index) => () => {
        this.setState(
            {
                itemDetail: [
                    ...this.state.itemDetail.slice(0, index),
                    Object.assign({}, this.state.itemDetail[index], {
                        qty: item.qty + 1
                    }),
                    ...this.state.itemDetail.slice(index + 1)
                ]
            },
            this.setState({
                shouldUpdate: false
            })
        );
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
        this.setState({
            shouldUpdate: false
        });
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
        } else if (this.state.itemDetail[index].qty == "") {
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
        this.setState({
            shouldUpdate: false
        });
    };
    editNum = (item, index) => () => {
        if (
            this.state.itemDetail[index].qty == 0 ||
            this.state.itemDetail[index].qty == null
        ) {
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
        this.setState({
            shouldUpdate: false
        });
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
            this.setState({
                shouldUpdate: false
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
            const total = this.state.itemDetail
                .map(x => x.price * x.qty)
                .reduce((a, b) => a + b)
                .toString();
            console.log(total);
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
                                delData={this.delData(item, index)}
                            />
                        )}
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
                        <Button style={styles.buttonMain}>
                            <Text />
                        </Button>
                    </Footer>
                </Container>
            );
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
export default withNavigation(ProductList);
