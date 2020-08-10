import styled from 'styled-components/native';

interface Props {
  timer: boolean;
}

export const Container = styled.View<Props>`
  flex-direction: row;
  justify-content: ${props => (props.timer ? 'space-between' : 'flex-end')};

  margin-top: 50px;
  margin-horizontal: 15px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  color: #ffffff;
`;
