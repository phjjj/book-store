import React from "react";
import styled from "styled-components";
import { ButtonSchema, ButtonSize } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  schema: ButtonSchema;
  disabled?: boolean;
  isLoading?: boolean;
}
const Button = ({ children, size, schema, disabled, isLoading, ...props }: Props) => {
  return (
    <ButtonStyle size={size} schema={schema} disabled={disabled} isLoading={isLoading} {...props}>
      {children}
    </ButtonStyle>
  );
};
const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  color: ${({ theme, schema }) => theme.buttonSchema[schema].color};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ theme, schema }) => theme.buttonSchema[schema].backgroundColor};
  padding: ${({ theme, size }) => theme.button[size].padding};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export default Button;
