import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import * as Yup from "yup";
import * as S from "./styles";

import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { Header } from "../../components/Header";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TRANSACTIONS_KEY } from "../../keys";
import { useNavigation } from "@react-navigation/native";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo"),
});

function Register() {
  const { navigate } = useNavigation();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");

  const [category, setCategory] = useState({
    key: "category",
    name: "Category",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionType(type: "up" | "down") {
    setTransactionType((state) => (state === type ? "" : type));
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category") return Alert.alert("Selecione a category");

    const data = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const transactionsHistoryData = await AsyncStorage.getItem(
        TRANSACTIONS_KEY
      );
      const transactionsHistory = transactionsHistoryData
        ? JSON.parse(transactionsHistoryData)
        : [];

      const dataFormatted = [...transactionsHistory, data];

      await AsyncStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(dataFormatted)
      );

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Category",
      });

      navigate("Listagem");
    } catch (e) {
      console.log(e);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <S.Container>
        <Header title="Cadastro" />

        <S.Form>
          <S.Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <S.TransactionsTypes>
              <TransactionTypeButton
                isActive={transactionType === "up"}
                title="Income"
                type="up"
                onPress={() => handleTransactionType("up")}
              />
              <TransactionTypeButton
                isActive={transactionType === "down"}
                title="Outcome"
                type="down"
                onPress={() => handleTransactionType("down")}
              />
            </S.TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>

        <Modal visible={categoryModalOpen} style={{ flex: 1 }}>
          <CategorySelect
            category={category}
            setCategory={(categ) => setCategory(categ)}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}

export { Register };
