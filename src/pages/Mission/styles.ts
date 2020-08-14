import styled from 'styled-components/native';

export const Info = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CommonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #ffffff;
`;

export const TextLeft = styled(CommonText)`
  font-family: 'Montserrat-SemiBold';
`;

export const Number = styled(CommonText)`
  font-family: 'Montserrat-SemiBold';
`;

export const CustomText = styled(CommonText)`
  font-family: 'Montserrat-Regular';
`;
