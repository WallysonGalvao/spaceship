import styled from 'styled-components/native';

export const Container = styled.View`
  /* width: 85%; */
  width: 240px;
  height: 380px;

  background: #302b4e;
  border-radius: 24px;
  padding: 20px;

  border-color: #ee5f40;
  border-width: 3px;
  margin-left: 15px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin: 25px;
`;

export const Name = styled.Text`
  font-family: 'Montserrat_600SemiBold';
  font-size: 14px;

  color: #ffffff;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-family: 'Montserrat_400Regular';
  font-size: 12px;

  color: #ffffff;
`;

export const Footer = styled.View`
  /* border-color: white;
  border-width: 1px; */

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
  width: 104px;
  height: 40px;
  background: #ce2949;
  border-radius: 10px;

  justify-content: center;
  align-self: center;

  /* padding: 15px 25px; */

  /* position: absolute;
  bottom: 100px; */
`;

export const CustomText = styled.Text`
  font-size: 12px;
  align-self: center;
  justify-content: center;
  font-size: 12px;

  color: #ffffff;
`;
