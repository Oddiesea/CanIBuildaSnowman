import React, { Component } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import checkForSnow from "./Api";

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    isSnowing: false
  };

  render() {
    const { isSnowing } = this.props;

    const MessageWrapper = styled.View`
      text-align: center;
      justify-content: center;
      align-items: center;
    `;

    const MessageText = styled.Text`
      justify-content: center;
      font-size: 30;
    `;

    return (
      <MessageWrapper>
        {isSnowing ? (
          <MessageText> Yes!</MessageText>
        ) : (
          <MessageText> No.</MessageText>
        )}
      </MessageWrapper>
    );
  }

  componentDidMount() {
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location }, () => {
      console.log(this.state.location);
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
