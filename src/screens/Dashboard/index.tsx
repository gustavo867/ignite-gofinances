import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as S from "./styles";

import { TRANSACTIONS_KEY } from "../../keys";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { HighlightCard } from "../../components/HighlightCard";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

type Transaction = {
  amount: number;
  category: string;
  date: string;
  id: string;
  name: string;
  transactionType: "down" | "up";
};

type HighlightProps = {
  amount: string;
  lastTransaction: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([]);
  const [higlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function getLastTransactionDate(
    collection: Transaction[],
    type: "up" | "down"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((tr) => tr.transactionType === type)
          .map((tr) => new Date(tr.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    const transactions: Transaction[] = response ? JSON.parse(response) : [];

    if (transactions.length >= 1) {
      let entriesTotal = 0;
      let expensiveTotal = 0;

      const transactionsFormatted = transactions.map((item) => {
        if (item.transactionType === "up") {
          entriesTotal += Number(item.amount);
        }

        if (item.transactionType === "down") {
          expensiveTotal += Number(item.amount);
        }

        return {
          title: item.name,
          date: Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(item.date)),
          id: item.id,
          type: item.transactionType === "up" ? "positive" : "negative",
          amount: Number(item.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          categoryKey: item.category,
        };
      });

      const total = entriesTotal - expensiveTotal;

      setTransactions(transactionsFormatted.reverse());

      const lastTransactionEntries = getLastTransactionDate(transactions, "up");
      const lastTransactionExpensive = getLastTransactionDate(
        transactions,
        "down"
      );
      const totalInterval = `01 a ${lastTransactionExpensive}`;

      setHighlightData({
        entries: {
          amount: Number(entriesTotal).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
        },
        expensives: {
          amount: Number(expensiveTotal).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: `Última saída dia ${lastTransactionExpensive}`,
        },
        total: {
          amount: Number(total).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: totalInterval,
        },
      });

      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <S.Container>
      {loading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
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
              <S.LogoutButton onPress={() => {}}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>
          <S.HighlightCards>
            <HighlightCard
              title="Entrada"
              lastTransaction={higlightData?.entries.lastTransaction}
              amount={higlightData?.entries?.amount ?? ""}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              lastTransaction={higlightData?.expensives.lastTransaction}
              amount={higlightData?.expensives?.amount ?? ""}
              type="down"
            />
            <HighlightCard
              title="Total"
              lastTransaction={higlightData?.total.lastTransaction}
              amount={higlightData?.total?.amount ?? ""}
              type="total"
            />
          </S.HighlightCards>
          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};

export { Dashboard };
