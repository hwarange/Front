import React, { useState, useReducer, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Image, Text, FlatList, TouchableOpacity } from "react-native";
import { useFonts, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import mascort from "../../image/mascort.png";
import { Feather } from "@expo/vector-icons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CheckButton from "./CheckButton";
import DeleteItem from "./DeleteItem";
import CartItem from "./CartItem";
import { ScrollView } from "react-native-gesture-handler";
import CartReducer from "./CartReducer";
import {
  ADD_TO_CART,
  DELETE_CART,
  CLEAR_CART,
  CHECK_ALL,
  CHECK,
} from "./CartActions";

const All = styled.SafeAreaView`
  align-items: center;
`;

const Container = styled.View`
  background-color: #fcf9f9;
  width: 323px;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-family: Inter;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Check = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 7px;
`;

const List = styled.View`
  border-color: #000000;
  border-top-width: 1;
  width: 100%;
  flex-direction: column;
`;

const AllCheck = styled.View`
  font-family: Inter;
  font-size: 13.217px;
  flex-direction: row;
  gap: 19px;
`;
const Head = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const Num = styled.View`
  flex-direction: row;
`;

const PopUp = ({ _onPress }) => {
  const [items, dispatch] = useReducer(CartReducer, {
    items: {
      1: {
        productID: 1,
        productName: "제주 1등급 삼겹살 300g(냉장)",
        image: "url",
        price: 12000,
        quantity: 1,
        checked: false,
      },
      2: {
        productID: 2,
        productName: "제주 1등급 삼겹살 300g(냉장)",
        image: "url",
        price: 12000,
        quantity: 1,
        checked: false,
      },
    },
    totalAmount: 0,
    allchecked: false,
  });
  const [num, setnum] = useState(0);
  const [allcheck, setallcheck] = useState(false);
  function handleAddItem(item) {
    dispatch({
      product: item,
      type: ADD_TO_CART,
    });
  }

  function handleDeleteItem(item) {
    dispatch({
      product: item,
      type: DELETE_CART,
    });
  }

  function handleClearItem(item) {
    dispatch({
      product: item,
      type: CLEAR_CART,
    });
  }

  function handleAlls() {
    dispatch({
      type: CHECK_ALL,
    });
  }
  function handleChecked(productID) {
    dispatch({
      type: CHECK,
      productID: productID,
    });
  }

  const renderItem = ({ item }) => {
    return (
      <CartItem
        name={item.productName}
        price={item.price}
        _onPress={() => {
          handleChecked(item.productID);
        }}
        tchecked={item.checked}
      ></CartItem>
    );
  };

  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-SemiBold.ttf"),
    InterB: require("../../assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity onPress={_onPress}>
        <All
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
        >
          <Container>
            <Header>
              <Title>홍길동님!{"\n"}그로시가 미리 장을 봐두었어요!</Title>
              <Image source={mascort}></Image>
            </Header>
            <Check>
              <Text style={{ fontSize: 11.5, fontFamily: "Inter" }}>
                식단구성 확인하기
              </Text>
              <Feather name="chevron-right" size={17} color="black" />
            </Check>
            <Head>
              <AllCheck>
                <CheckButton
                  _onPress={() => {
                    handleAlls();
                  }}
                  tchecked={items.allchecked}
                ></CheckButton>
                <Num>
                  <Text>전체선택</Text>
                  <Text>({num})</Text>
                </Num>
              </AllCheck>
              <DeleteItem></DeleteItem>
            </Head>
            <FlatList
              style={{ width: "100%" }}
              data={Object.values(items.items)}
              renderItem={renderItem}
              extraData={items.allchecked}
            />
          </Container>
        </All>
      </TouchableOpacity>
    );
  }
};

export default PopUp;