import React, { Component } from "react";
import { Platform, StyleSheet, View, Image, Dimensions } from "react-native";

import { Content, Form, Item, Input, Label, Text, Button } from "native-base";

const { width, height } = Dimensions.get("screen");

import Background from "./assets/backgrounds/marching.gif";

import walk from "./assets/characters/kyo/walk.gif";
import stance from "./assets/characters/kyo/stance.gif";
import sit from "./assets/characters/kyo/sit.gif";


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      stance: 'yes',
      sit: 'standing',
      left: 0
    };
  }

  letCallback = way => {
    if (way === "left") {
      this.intervalId = setInterval(() => this.moveLeft(), 50); //this starts the interval
    } else {
      this.intervalId = setInterval(() => this.moveRight(), 50); //this starts the interval
    }
  };

  removeInterval = way => {
    if (way === "left") {
      this.setState({
        stance: 'yes'
      });
      clearInterval(this.intervalId); //make sure you call this when the timer needs to end
    } else {
      this.setState({
        stance: 'yes'
      });
      clearInterval(this.intervalId);
    }
  };

  moveRight = () => {
    if (this.state.left < 380) {
      this.setState({
        stance: 'no',
        left: (this.state.left += 20)
      });
    }
  };

  moveLeft = () => {
    if (this.state.left > 0)
      this.setState({
        stance: 'no',
        left: (this.state.left -= 20)
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={Background}
            style={{
              width: width,
              height: height * 0.5
            }}
          />
        </View>

        <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
          {this.state.stance === 'yes' && (
            <Image
              style={{
                width: 100,
                height: 180,
                left: this.state.left,
                position: "absolute"
              }}
              source={stance}
              resizeMode="contain"
            />
          )}

          {this.state.stance === 'no' && (
            <Image
              style={{
                width: 100,
                height: 180,
                left: this.state.left,
                position: "absolute"
              }}
              source={walk}
              resizeMode="contain"
            />
          )}

        {this.state.sit === 'yes' && (
            <Image
              style={{
                width: 120,
                height: 120,
                marginTop: 120,
                left: this.state.left,
                position: "absolute"
              }}
              source={sit}
              resizeMode="contain"
            />
          )}

        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "pink",
            justifyContent: "space-between",
            padding: 45
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Button
              onPressIn={() => {
                this.letCallback("left");
              }}
              onPressOut={() => this.removeInterval("left")}
              style={{
                backgroundColor: "indigo"
              }}
            >
              <Text>left</Text>
            </Button>

            <Button
              onPressIn={() => {
                this.setState({
                  stance: 'sitting',
                  sit: 'yes'
                })
              }}
              onPressOut={() => {
                this.setState({
                  stance: 'yes',
                  sit: 'standing'
                })
              }}
              style={{
                backgroundColor: "indigo"
              }}
            >
              <Text>Down</Text>
            </Button>

            <Button
              onPressIn={() => {
                this.letCallback("right");
              }}
              onPressOut={() => this.removeInterval("right")}
              style={{
                backgroundColor: "indigo"
              }}
            >
              <Text>Right</Text>
            </Button>
          </View>

          <View>
            <Button
              onPress={() => {
                this.punch();
              }}
              style={{
                backgroundColor: "red"
              }}
            >
              <Text>Punch</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
