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
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

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
  const { logOutUser, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([]);
  const [higlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function getLastTransactionDate(
    collection: Transaction[],
    type: "up" | "down"
  ) {
    const existsTransactions = collection.find(
      (cl) => cl.transactionType === type
    );

    if (existsTransactions) {
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

    return null;
  }

  async function mountTransactionData(transactionsData: Transaction[]) {
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted = transactionsData.map((item) => {
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

    const lastTransactionEntries = getLastTransactionDate(
      transactionsData,
      "up"
    );
    const lastTransactionExpensive = getLastTransactionDate(
      transactionsData,
      "down"
    );
    const totalInterval = lastTransactionExpensive
      ? `01 a ${lastTransactionExpensive}`
      : "Não há transações";

    return {
      transactions: transactionsFormatted.reverse(),
      higlightData: {
        entries: {
          amount: Number(entriesTotal).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: lastTransactionEntries
            ? `Última entrada dia ${lastTransactionEntries}`
            : "Não há transações",
        },
        expensives: {
          amount: Number(expensiveTotal).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: lastTransactionExpensive
            ? `Última saída dia ${lastTransactionExpensive}`
            : "Não há transanções",
        },
        total: {
          amount: Number(total).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: totalInterval,
        },
      },
    };
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(
      `${TRANSACTIONS_KEY}_user:${user.id}`
    );
    const transactions: Transaction[] = response ? JSON.parse(response) : [];

    if (transactions.length >= 1) {
      const { higlightData, transactions: transactionsData } =
        await mountTransactionData(transactions);

      setHighlightData(higlightData);
      setTransactions(transactionsData);

      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  function removeTransaction(id: string) {
    try {
      Alert.alert("Deseja excluir a transação?", "", [
        {
          text: "Sim",
          onPress: async () => {
            setLoading(true);

            const response = await AsyncStorage.getItem(
              `${TRANSACTIONS_KEY}_user:${user.id}`
            );

            const transactions: Transaction[] = response
              ? JSON.parse(response)
              : [];

            if (!transactions) {
              return Alert.alert("Erro ao excluir transação");
            }

            const newsTransactions = transactions.filter((tr) => tr.id !== id);

            await AsyncStorage.setItem(
              `${TRANSACTIONS_KEY}_user:${user.id}`,
              JSON.stringify(newsTransactions)
            );

            const mountedData = await mountTransactionData(newsTransactions);

            setHighlightData(mountedData.higlightData);
            setTransactions(mountedData.transactions);

            setLoading(false);
          },
          style: "default",
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.log(error);

      throw new Error(error);
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
                    uri:
                      user.photo ??
                      `https://ui-avatars.com/api/?name=${user.name}&length=2`,
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá,</S.UserGreeting>
                  <S.UserName>{user.name}</S.UserName>
                </S.User>
              </S.UserInfo>
              <S.LogoutButton onPress={logOutUser}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>
          <S.HighlightCards>
            <HighlightCard
              title="Entrada"
              lastTransaction={higlightData?.entries?.lastTransaction}
              amount={higlightData?.entries?.amount ?? "R$ 0,00"}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              lastTransaction={higlightData?.expensives?.lastTransaction}
              amount={higlightData?.expensives?.amount ?? "R$ 0,00"}
              type="down"
            />
            <HighlightCard
              title="Total"
              lastTransaction={higlightData?.total?.lastTransaction}
              amount={higlightData?.total?.amount ?? "R$ 0,00"}
              type="total"
            />
          </S.HighlightCards>
          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TransactionCard
                  removeTransaction={removeTransaction}
                  data={item}
                />
              )}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};

export { Dashboard };
