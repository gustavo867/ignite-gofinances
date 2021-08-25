import React from "react";
import { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import * as S from "./styles";

interface RegisterProps {}

function Register() {
  const [transactionType, setTransactionType] = useState("");

  function handleTransactionType(type: "up" | "down") {
    setTransactionType((state) => (state === type ? "" : type));
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
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
          <Input placeholder="AOBBAAA" />
        </S.Fields>

        <Button title="Enviar" />
      </S.Form>
    </S.Container>
  );
}

export { Register };
