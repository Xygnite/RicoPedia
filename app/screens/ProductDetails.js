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
    FooterTab
} from "native-base";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
class ProductDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        const img = navigation.getParam("itemImage", "");
        const name = navigation.getParam("itemName", "");
        const price = navigation.getParam("itemPrice", "");
        const seller = navigation.getParam("itemSeller", "");
        const details = navigation.getParam("itemDetails", "");
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
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18
                                }}
                            >
                                {name} -{" "}
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "#44dd44",
                                    fontSize: 25
                                }}
                            >
                                {price}
                            </Text>
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
                    <Button style={styles.footerButton}>
                        <Text>Add to Cart</Text>
                    </Button>
                    <Button
                        style={styles.footerButtonMain}
                        onPress={() => {
                            this.props.navigation.navigate("Cart");
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
        backgroundColor: "#44dd44",
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
    }
});

export default ProductDetails;
