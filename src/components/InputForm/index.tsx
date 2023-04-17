import React from 'react';
import { TextInput } from '../Form/TextInput';
import * as S from './InputForm.styles';
import { InputFormProps } from './InputForm.types';
import { Controller } from 'react-hook-form';

export function InputForm({ name, control, error, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <S.Container>
            <TextInput onChangeText={onChange} value={value} {...rest} />
            {error && <S.ErrorFeedback>{error}</S.ErrorFeedback>}
          </S.Container>
        )}
      />
    </S.Container>
  );
}
