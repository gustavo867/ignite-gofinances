import React from "react";
import { View, Text, Button, TextInput } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        value="Gustavo"
        placeholder="Nome"
        autoCorrect={false}
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Santana"
        autoCorrect={false}
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
