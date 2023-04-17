import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { TransactionButton } from "../../components/TransactionButton";
import { Button } from "../../components/Form/Button";
import { Gap } from "../../components/Gap";
import * as S from "./Register.styles";
import { Header } from "../../components/Header/Header.structure";
import { CategorySelect } from "../CategorySelect";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/InputForm";
import { useForm } from "react-hook-form";
import { Category } from "../CategorySelect/CategorySelect.types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { TransactionTypeProps } from "../../components/TransactionCard/TransactionCard.types";
import { DataListProps } from "../Dashboard/Dashboard.types";
import { useAuth } from "../../hooks/auth";

interface RegisterProps {
  title?: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Deve conter pelo menos 3 dígitos"),
  amount: Yup.number()
    .required("Preço é obrigatório")
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo"),
});

/**
 * @param {RegisterProps} [title='opa'] A optional param responsible to rendering a custom name on screen
 *
 * @return Tela responsavel por exeibir a seleção de usuários para agendamento no pronto atendimento
 *
 * [See this component on Figma](https://www.figma.com/file/fVzWbw9fxPVIDNoawyEVsl/Team-Components?node-id=3584%3A19635&t=gRZhlyvgCE2uZXwg-4)
 */
export function Register({ title = "opa" }: RegisterProps) {
  const navigation = useNavigation();
  const { userInfo } = useAuth();

  const [transactionType, setTransactionType] = useState<
    "positive" | "negative"
  >();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  } as Category);

  const [isVisible, setIsVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function closeCategorySelect() {
    setIsVisible(false);
  }

  function handleSelectTransactionType(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setIsVisible(true);
  }

  async function handleRegister(data: any) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação");
    }

    if (category.key === "category") {
      return Alert.alert(
        "Selecione a categoria",
        "Para prosseguir é necessário informar o tipo da transação."
      );
    }

    console.log(transactionType);

    const newTransaction = {
      id: String(uuid.v4()),
      name: data.name,
      amount: data.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transactions_user:${userInfo.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataToSave = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataToSave));

      navigation.navigate("Dashboard");
      reset();
      setTransactionType(undefined);
      setCategory({
        key: "category",
        name: "Categoria",
      } as Category);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  function getError(error: any, name: any) {
    if (!error[name] && !error[name]?.message) return "";
    return error[name].message;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <StatusBar barStyle="light-content" />
        <Header title="Cadastro" />
        <S.ContainerForm>
          <S.Fields>
            <Gap gapSize={8}>
              <S.ContainerTextInput>
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  error={getError(errors, "name")}
                />
              </S.ContainerTextInput>
              <S.ContainerTextInput>
                <InputForm
                  name="amount"
                  control={control}
                  placeholder="Preço"
                  keyboardType="number-pad"
                  error={getError(errors, "amount")}
                />
              </S.ContainerTextInput>
            </Gap>
            <S.ContainerTransactionType>
              <TransactionButton
                isActived={transactionType === "positive"}
                text="Income"
                type="up"
                onPress={() => handleSelectTransactionType("positive")}
              />
              <S.GapSm />
              <TransactionButton
                isActived={transactionType === "negative"}
                text="Outcome"
                type="down"
                onPress={() => handleSelectTransactionType("negative")}
              />
            </S.ContainerTransactionType>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>
          <S.ContainerButton>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          </S.ContainerButton>
        </S.ContainerForm>
        <Modal animationType="slide" visible={isVisible}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeCategorySelect={closeCategorySelect}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
