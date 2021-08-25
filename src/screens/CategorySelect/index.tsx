import React from "react";

import { Alert, FlatList, Text } from "react-native";
import { Button } from "../../components/Forms/Button";
import { Header } from "../../components/Header";
import { categories } from "../../utils/categories";

import * as S from "./styles";

interface Category {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

function CategorySelect(props: CategorySelectProps) {
  function handleSelectCategory(item: Category) {
    props.setCategory(
      props.category.name === item.name
        ? { key: "category", name: "Categoria" }
        : item
    );
  }

  function handleCloseCategorySelect() {
    if (props.category.key === "category") {
      Alert.alert("Selecione uma categoria");

      return;
    }

    props.closeSelectCategory();
  }

  return (
    <S.Container>
      <Header title="Categoria" />

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <S.Separator />}
        renderItem={({ item }) => (
          <S.Category
            isActive={props.category.key === item.key}
            onPress={() => handleSelectCategory(item)}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
      />

      <S.Footer>
        <Button title="Selecionar" onPress={handleCloseCategorySelect} />
      </S.Footer>
    </S.Container>
  );
}

export { CategorySelect };
