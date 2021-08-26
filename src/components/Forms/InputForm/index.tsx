import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import * as S from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

const InputForm: React.FC<Props> = ({ control, name, error, ...rest }) => {
  return (
    <S.Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...(rest as any)}
          />
        )}
      ></Controller>
      {Boolean(error) && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

export { InputForm };
