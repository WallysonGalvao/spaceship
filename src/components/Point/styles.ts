import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.View`
  justify-content: center;
  align-items: center;
  background: #e08432;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin-right: 10px;
`;

export const Number = styled.Text`
  font-size: 15px;
  color: #ffffff;
`;
