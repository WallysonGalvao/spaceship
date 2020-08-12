import styled from 'styled-components/native';

interface Props {
  circleColor: string;
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Right = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Circle = styled.View<Props>`
  justify-content: center;
  align-items: center;
  background: ${props => props.circleColor};
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 10px;
`;

const CommonText = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 14px;
  color: #ffffff;
`;

export const Name = styled(CommonText)``;

export const TimeText = styled(CommonText)`
  font-family: 'Montserrat_400Regular';
`;

export const Number = styled(CommonText)``;
