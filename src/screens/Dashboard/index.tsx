import React from "react";
import * as S from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

const Dashboard: React.FC = () => {
  const data: TransactionCardProps[] = [
    {
      id: "1",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "13/04/2021",
      type: "positive",
      category: {
        icon: "dollar-sign",
        name: "Vendas",
      },
    },
    {
      id: "2",
      title: "Aluguel do apartamento",
      amount: "R$ 1200,00",
      date: "10/04/2021",
      type: "negative",
      category: {
        icon: "shopping-bag",
        name: "Casa",
      },
    },
    {
      id: "3",
      title: "Hamburgueria",
      amount: "R$ 70,00",
      date: "11/04/2021",
      type: "negative",
      category: {
        icon: "coffee",
        name: "Alimentação",
      },
    },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/63013756?v=4",
              }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Gustavo</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>
      <S.HighlightCards>
        <HighlightCard
          title="Entrada"
          lastTransaction="Ultima transação dia 28 de Abril"
          amount="R$ 200,00"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          lastTransaction="Ultima transação dia 28 de Abril"
          amount="R$ 200,00"
          type="down"
        />
        <HighlightCard
          title="Total"
          lastTransaction="Ultima transação dia 28 de Abril"
          amount="R$ 200,00"
          type="total"
        />
      </S.HighlightCards>
      <S.Transactions>
        <S.Title>Listagem</S.Title>
        <S.TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <TransactionCard data={item} />}
        />
      </S.Transactions>
    </S.Container>
  );
};

export { Dashboard };
