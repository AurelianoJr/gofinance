import React, { useState } from "react";
import { View, Button, Text } from "react-native";

export function Teste() {
  return (
    <View
      onTouchStart={() => console.log("Pressed main container")}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ padding: 15, borderWidth: 1, marginBottom: 24 }}>
        Algum texto legal
      </Text>

      <View style={{ borderWidth: 1 }}>
        <Button
          title="Baby Yoda"
          onPress={() => console.log("Pressed button")}
        />
      </View>
    </View>
  );
}
