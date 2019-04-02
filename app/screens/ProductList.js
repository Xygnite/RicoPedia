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
    Thumbnail
} from "native-base";
import { FlatList, Text, TouchableOpacity } from "react-native";

import ProductData from "../components/ProductData";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemDetail: [
                {
                    key: "a",
                    img: require("../assets/a.jpg"),
                    val: "Sepatu Ah Did Us",
                    seller: "Pak Kartono",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 150,000"
                },
                {
                    key: "b",
                    img: require("../assets/b.jpg"),
                    val: "Edgar Backpack",
                    seller: "Xiao",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 200,000"
                },
                {
                    key: "c",
                    img: require("../assets/c.jpg"),
                    val: "RilMi KW",
                    seller: "Siaomay",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 5,000,000"
                },
                {
                    key: "d",
                    img: require("../assets/d.jpg"),
                    val: "Laptop GOR",
                    seller: "Usas",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 12,000,000"
                },
                {
                    key: "e",
                    img: require("../assets/e.png"),
                    val: "Helm TKY",
                    seller: "TKY Helmets",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 500,000"
                },
                {
                    key: "f",
                    img: require("../assets/f.jpg"),
                    val: "Smart TV Sumsang",
                    seller: "Sumsang Electronics",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 10,000,000"
                },
                {
                    key: "g",
                    img: require("../assets/g.jpg"),
                    val: "Gayung Original",
                    seller: "Perabot Online",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 15,000"
                },
                {
                    key: "h",
                    img: require("../assets/h.jpg"),
                    val: "Teflon Baja",
                    seller: "Alat Masak Online",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 1,000,000"
                },
                {
                    key: "i",
                    img: require("../assets/i.jpg"),
                    val: "PowerBank Robotto",
                    seller: "Robotto Batteries",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 750,000"
                },
                {
                    key: "j",
                    img: require("../assets/j.jpg"),
                    val: "Kacamata VR Ready",
                    seller: "NVideo Graphics",
                    details:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    price: "Rp. 18,000,000"
                }
            ]
        };
    }
    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.state.itemDetail}
                        renderItem={({ item }) => (
                            <ProductData
                                itemImage={item.img}
                                itemName={item.val}
                                itemSeller={item.seller}
                                itemPrice={item.price}
                                itemDetails={item.details}
                                getDetails={() => {
                                    this.props.navigation.navigate("PD", {
                                        itemImage: item.img,
                                        itemName: item.val,
                                        itemPrice: item.price,
                                        itemSeller: item.seller,
                                        itemDetails: item.details
                                    });
                                }}
                            />
                        )}
                        numColumns={2}
                    />
                </Content>
            </Container>
        );
    }
}

export default ProductList;
