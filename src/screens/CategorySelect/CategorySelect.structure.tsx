import React, { useState } from 'react';
import * as S from './CategorySelect.styles';
import { Container } from '../../components/Container/Container.structure';
import { Header } from '../../components/Header/Header.structure';
import { Category, CategorySelectProps } from './CategorySelect.types';
import { FlatList, Text } from 'react-native';
import { categories } from '../../utils/categories';
import { CategoryItem } from '../../components/CategoryItem';
import { Separator } from '../../components/CategoryItem/CategoryItem.styles';
import { Button } from '../../components/Form/Button';

export function CategorySelect({
  category,
  setCategory,
  closeCategorySelect,
}: CategorySelectProps) {
  function handleSelectCategory(categorySelected: Category) {
    setCategory(categorySelected);
  }

  function handleClearSelection() {
    setCategory({ key: 'category', name: 'Categoria' } as Category);
  }

  return (
    <Container>
      <Header title='Categorias' />
      <FlatList
        data={categories}
        keyExtractor={(category) => category.key}
        renderItem={({ item }) => (
          <CategoryItem
            isSelected={category.key == item.key}
            category={item}
            onPress={() => handleSelectCategory(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <S.Footer>
        <S.SecondaryButtonContainer onPress={handleClearSelection}>
          <S.SecondaryButtonText>Limpar seleção</S.SecondaryButtonText>
        </S.SecondaryButtonContainer>
        <Button title='Selecionar' onPress={() => closeCategorySelect()} />
      </S.Footer>
    </Container>
  );
}
