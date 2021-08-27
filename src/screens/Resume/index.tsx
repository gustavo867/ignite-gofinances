import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PieChart from "react-native-pie-chart";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { TRANSACTIONS_KEY } from "../../keys";
import { categories } from "../../utils/categories";

import * as S from "./styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

type CategoryData = {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  key: string;
  percent: string;
};

type Transaction = {
  amount: number;
  category: string;
  date: string;
  id: string;
  name: string;
  transactionType: "down" | "up";
};

function Resume() {
  const theme = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedData] = useState(new Date());
  const tabBarHeight = useBottomTabBarHeight();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedData((state) => addMonths(state, 1));
    } else {
      setSelectedData((state) => subMonths(state, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);

    const response = await AsyncStorage.getItem(
      `${TRANSACTIONS_KEY}_user:${user.id}`
    );
    const responseFormatted: Transaction[] = response
      ? JSON.parse(response)
      : [];

    const expensives = responseFormatted.filter(
      (exp) =>
        exp.transactionType === "down" &&
        new Date(exp.date).getMonth() === selectedDate.getMonth() &&
        new Date(exp.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensives.reduce((acc, exp) => {
      return acc + Number(exp.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((cat) => {
      let categorySum = 0;

      expensives.forEach((exp) => {
        if (exp.category === cat.key) {
          categorySum += Number(exp.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          name: cat.name,
          color: cat.color,
          key: cat.key,
          totalFormatted: total,
          total: categorySum,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <S.Container>
      <Header title="Resumo por categoria" />
      <S.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: tabBarHeight,
          paddingTop: 20,
        }}
      >
        {isLoading ? (
          <S.LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </S.LoadContainer>
        ) : (
          <>
            <S.MonthSelect>
              <S.MonthSelectButton onPress={() => handleDateChange("prev")}>
                <S.MonthSelectIcon name="chevron-left" />
              </S.MonthSelectButton>
              <S.Month>
                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
              </S.Month>
              <S.MonthSelectButton onPress={() => handleDateChange("next")}>
                <S.MonthSelectIcon name="chevron-right" />
              </S.MonthSelectButton>
            </S.MonthSelect>

            <S.ChartContainer>
              <PieChart
                widthAndHeight={250}
                series={totalByCategories.map((ct) => ct.total)}
                sliceColor={totalByCategories.map((ct) => ct.color)}
              />
            </S.ChartContainer>

            {totalByCategories.length >= 1 &&
              totalByCategories.map((item) => (
                <HistoryCard
                  key={item.key}
                  color={item.color}
                  amount={item.totalFormatted}
                  title={item.name}
                />
              ))}
          </>
        )}
      </S.Content>
    </S.Container>
  );
}

export { Resume };
