import React, { Component } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import styled from "styled-components";

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    isSnowing: false
  };

  MessageWrapper = styled.View`
    text-align: center;
  `;

  MessageText = styled.Text`
    justify-content: center;
    font-size: 30;
  `;

  render() {
    const { isSnowing } = this.props;
    return (
      <this.MessageWrapper>
        <this.MessageText>{isSnowing ? "Yes!" : "No."}</this.MessageText>;
      </this.MessageWrapper>
    );
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
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
