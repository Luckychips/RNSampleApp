import {Dimensions} from 'react-native';
import styled from 'styled-components';
const {width, height} = Dimensions.get('window');


const Background = styled.View`
  flex: 1;
  background-color: ${props => props.bgColor ? props.bgColor : '#ffffff'};
`;

const AdjustFitSafeArea = styled.SafeAreaView`
  width: ${props => props.width ? props.width : width}px;
  height: ${props => props.height ? props.height : height}px;
`;

export {
    Background,
    AdjustFitSafeArea
};