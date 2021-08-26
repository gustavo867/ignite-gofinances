import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/native";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { TRANSACTIONS_KEY } from "../../keys";
import { categories } from "../../utils/categories";

import * as S from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

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
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        const response = await AsyncStorage.getItem(TRANSACTIONS_KEY);
        const responseFormatted: Transaction[] = response
          ? JSON.parse(response)
          : [];

        const expensives = responseFormatted.filter(
          (exp) => exp.transactionType === "down"
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

            const percent = `${((categorySum / expensiveTotal) * 100).toFixed(
              0
            )}%`;

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
      }

      loadData();
    }, [])
  );

  return (
    <S.Container>
      <Header title="Resumo por categoria" />
      <S.Content>
        {/* <S.ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((ct) => ct.color)}
            labelRadius={50}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
          />
        </S.ChartContainer> */}

        {totalByCategories.length >= 1 &&
          totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              color={item.color}
              amount={item.totalFormatted}
              title={item.name}
            />
          ))}
      </S.Content>
    </S.Container>
  );
}

export { Resume };
