import React, { Component } from "react";
import { Container, Content } from "native-base";
import { FlatList } from "react-native";
import axios from "axios";

import ProductData from "../components/ProductData";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }
    componentDidMount() {
        axios.get("http://192.168.43.139:3333/v1/products").then(res => {
            const products = res.data.data;
            this.setState({ products: products });
            console.log(res.data.data[0].image);
        });
    }
    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data={this.state.products}
                        renderItem={({ item }) => (
                            <ProductData
                                itemId={item.id}
                                itemImage={item.image}
                                itemName={item.name}
                                itemSeller={item.seller}
                                itemPrice={item.price}
                                getDetails={() => {
                                    this.props.navigation.navigate("PD", {
                                        itemId: item.id
                                    });
                                }}
                            />
                        )}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                </Content>
            </Container>
        );
    }
}

export default ProductList;
