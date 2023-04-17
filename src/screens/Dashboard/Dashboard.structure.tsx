import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import * as S from "./Dashboard.styles";
import { DataListProps, HighlightDataProps } from "./Dashboard.types";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({
    entries: { amount: "R$00,00" },
    expensive: { amount: "R$00,00" },
    total: { amount: "R$00,00" },
  } as HighlightDataProps);

  const { userInfo, signout } = useAuth();

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const transactionsByType = collection
      .filter((transaction) => {
        return transaction.type === type;
      })
      .map((transaction) => new Date(transaction.date).getTime());

    if (transactionsByType.length === 0) return "";

    const lastTransaction = Math.max.apply(Math, transactionsByType);

    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    }).format(lastTransaction);
  }

  async function loadTransactions() {
    let entriesSum = 0;
    let expensive = 0;

    const dataKey = `@gofinances:transactions_user:${userInfo.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    if (transactions.length === 0) {
      setIsLoading(false);
      return;
    }

    const transactionFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps): DataListProps => {
        if (transaction.type === "positive") {
          entriesSum += Number(transaction.amount);
        } else {
          expensive += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        };
      }
    );

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 à ${lastTransactionExpensives}`;

    setHighlightData({
      entries: {
        amount: Number(entriesSum).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionEntries,
      },
      expensive: {
        amount: Number(expensive).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionExpensives,
      },
      total: {
        amount: Number(entriesSum - expensive).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setTransactions(transactionFormatted);

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  console.log(userInfo);
  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="small" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>
              <S.UserInfo>
                <S.UserPhoto
                  source={{
                    uri: userInfo.photo,
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá,</S.UserGreeting>
                  <S.UserName>{userInfo.name}</S.UserName>
                </S.User>
              </S.UserInfo>
              <GestureHandlerRootView>
                <S.LogoutButton onPress={signout}>
                  <S.Icon name="power" />
                </S.LogoutButton>
              </GestureHandlerRootView>
            </S.UserWrapper>
          </S.Header>
          <S.HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={
                highlightData.entries.lastTransaction
                  ? `Última entrada dia ${highlightData.entries.lastTransaction}`
                  : "Não há transações"
              }
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensive.amount}
              lastTransaction={
                highlightData.expensive.lastTransaction
                  ? `Última saída dia ${highlightData.expensive.lastTransaction}`
                  : "Não há transações"
              }
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </S.HighlightCards>

          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionList
              data={transactions?.reverse()}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
}
