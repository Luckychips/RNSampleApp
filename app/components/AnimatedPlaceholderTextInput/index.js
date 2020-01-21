import React, {useState, useEffect} from 'react';
import {Animated, View} from 'react-native';
import styled from 'styled-components';
const PlaceholderText = styled.Text` 
  font-size: 18px;
  font-weight: bold;
  color: #bbbbbb;
`;
const StyledTextInput = styled.TextInput`
  background-color: #efefef;
  padding: 10px 15px;
  margin-top: ${props => props.marginTop}px;
  margin-left: ${props => props.marginLeft}px;
  margin-right: ${props => props.marginRight}px;
  font-size: 18px;
  font-weight: bold;
`;
const AnimatedPlaceholderTextInput = props => {
    const [focus, setFocus] = useState(false);
    const [placeholderAnimating] = useState(new Animated.Value(0));
    const onFocus = () => {
        setFocus(true);
        Animated.timing(placeholderAnimating, {
            toValue: 1,
            duration: 200,
        }).start();
    };
    const onBlur = () => {
        setFocus(false);
        if (props.value.length <= 0) {
            Animated.timing(placeholderAnimating, {
                toValue: 0,
                duration: 200,
            }).start();
        }
    };
    return (
        <View>
            <Animated.View style={{
                position: 'absolute',
                zIndex: 2,
                top: placeholderAnimating.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(props.marginTop ? props.marginTop : 32) + 9,  5]
                }),
                left: placeholderAnimating.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(props.marginLeft ? props.marginLeft : 24) + 12, props.marginLeft ? props.marginLeft : 24]
                })
            }}>
                <PlaceholderText>{props.placeholder}</PlaceholderText>
            </Animated.View>
            <StyledTextInput
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={text => props.onChangeText(text)}
                value={props.value}
                marginTop={props.marginTop ? props.marginTop : 32}
                marginLeft={props.marginLeft ? props.marginLeft : 24}
                marginRight={props.marginRight ? props.marginRight : 24}
            />
        </View>
    );
};

export default AnimatedPlaceholderTextInput;

