import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { Header } from "../../components/Header/Header.structure";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { DataListProps } from "../Dashboard/Dashboard.types";
import * as S from "./styles";
import { CategoryData } from "./types";
import { useTheme } from "styled-components/native";
import { ActivityIndicator, Animated, Easing } from "react-native";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "../../hooks/auth";

export function Resume() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { userInfo } = useAuth();

  useFocusEffect(
    useCallback(() => {
      loadData();
      handlePress("start");
    }, [selectedDate])
  );

  function handleDateChange(action: "prev" | "next") {
    handlePress("reset");
    if (action === "prev") {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${userInfo.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    const expensives = filterTransactionByType(transactions, "negative");
    const totalByCategory: CategoryData[] = [];

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: DataListProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (!categorySum) return;

      const totalFormatted = categorySum.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const percente = `${((categorySum * 100) / expensivesTotal).toFixed(0)}%`;

      totalByCategory.push({
        key: category.key,
        name: category.name,
        total: categorySum,
        totalFormatted,
        color: category.color,
        percente,
      });
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
    handlePress("start");
  }

  function filterTransactionByType(
    transactions: DataListProps[],
    type: "positive" | "negative"
  ): DataListProps[] {
    return transactions.filter((transaction) => {
      const transactionMonth = new Date(transaction.date).getMonth();
      const transactionYear = new Date(transaction.date).getFullYear();

      return (
        transaction.type === type &&
        selectedDate.getMonth() === transactionMonth &&
        selectedDate.getFullYear() === transactionYear
      );
    });
  }

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["230deg", "360deg"],
  });

  const handlePress = (type: "start" | "reset") => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.sin,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.sin,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ])[type]();
  };

  return (
    <S.Container>
      <Header title="Resumo por categoria" />
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="small" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <S.MonthSelect>
              <S.MonthSelectButton onPress={() => handleDateChange("prev")}>
                <S.MonthSelectIcon name="chevron-left" />
              </S.MonthSelectButton>

              <S.Month>
                {format(selectedDate, "MMMM, yyyy", {
                  locale: ptBR,
                })}
              </S.Month>

              <S.MonthSelectButton onPress={() => handleDateChange("next")}>
                <S.MonthSelectIcon name="chevron-right" />
              </S.MonthSelectButton>
            </S.MonthSelect>
            <S.ChartContainer>
              <Animated.View
                style={{
                  transform: [{ rotate: spin }, { scale: scaleAnim }],
                  opacity: opacityAnim,
                }}
              >
                <VictoryPie
                  colorScale={totalByCategories.map(
                    (category) => category.color
                  )}
                  style={{
                    labels: {
                      fontSize: RFValue(12),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    },
                  }}
                  x={"percente"}
                  y={"total"}
                  labelRadius={114}
                  innerRadius={100}
                  data={totalByCategories}
                  padAngle={5}
                />
              </Animated.View>
              {/* <VictoryPie
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
            data={totalByCategories}
            x={"percente"}
            y={"total"}
          /> */}
            </S.ChartContainer>
            {totalByCategories.map((category) => (
              <HistoryCard
                key={category.key}
                title={category.name}
                amount={category.totalFormatted}
                color={category.color}
              />
            ))}
          </S.Content>
        </>
      )}
    </S.Container>
  );
}
