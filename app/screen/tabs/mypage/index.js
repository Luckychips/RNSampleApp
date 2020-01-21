import React, {useState, useEffect} from 'react';
import {Dimensions, Animated, PanResponder, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import {IS_X, IPHONE_X_NOTCH_HEIGHT, IPHONE_X_BOTTOM_NOTCH_HEIGHT, STATUS_BAR_HEIGHT} from '../../../constants';
const {width, height} = Dimensions.get('window');
const Container = styled.View`
  flex: 1;
  background-color: #1f1f1f; 
`;
const Puller = styled.View`
  width: 50px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-top-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-color: #ffffff;
`;
const StickyContent = styled.View`
  width: ${width}px;
  height: ${height}px;
  z-index: 2;
  background-color: #ffffff;
`;
const MyPage = () => {
    const [y, setY] = useState(0);
    const [toTopPosition, setToTopPosition] = useState(false);
    const initialPosition = {x: 0, y: y};
    const position = new Animated.ValueXY(initialPosition);
    useEffect(() => {
        setY(getInitialPosition());
    }, []);
    const panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e, gestureState) => {
        },
        onPanResponderMove: (e, gestureState) => {
            const bottomTabBarHeight = 50,
                pullerHeight = 35;

            let target = gestureState.dy + initialPosition.y;
            if (IS_X) {
                if (target <= IPHONE_X_NOTCH_HEIGHT) {
                    target = IPHONE_X_NOTCH_HEIGHT;
                } else if (target >= height - bottomTabBarHeight - pullerHeight - IPHONE_X_BOTTOM_NOTCH_HEIGHT) {
                    target = height - bottomTabBarHeight - pullerHeight - IPHONE_X_BOTTOM_NOTCH_HEIGHT;
                }
            } else {
                if (target <= STATUS_BAR_HEIGHT) {
                    target = STATUS_BAR_HEIGHT;
                } else if (target >= height - bottomTabBarHeight - pullerHeight) {
                    target = height - bottomTabBarHeight - pullerHeight;
                }
            }

            position.setValue({x: 0, y: target});
            setY(target);
        },
        onPanResponderRelease: (e, gestureState) => {
            let targetY =  IS_X ? IPHONE_X_NOTCH_HEIGHT : STATUS_BAR_HEIGHT;
            let targetToTop = true;

            if (toTopPosition) {
                targetY = getInitialPosition();
                targetToTop = false;
            }

            Animated.timing(position, {
                toValue: {x: 0, y: targetY},
                duration: 500
            }).start(event => {
                if (event.finished) {
                    setY(targetY);
                    setToTopPosition(targetToTop);
                }
            });
        }
    });
    const getInitialPosition = () => {
        const bottomTabBarHeight = 50,
            pullerHeight = 35;

        let posY = height - bottomTabBarHeight - pullerHeight;
        if (IS_X) {
            posY -= IPHONE_X_BOTTOM_NOTCH_HEIGHT;
        }

        return posY;
    };
    const stickyViewStyles = {
        position: 'absolute',
        zIndex: 2,
        alignItems: 'center'
    };
    return (
        <Container>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    stickyViewStyles,
                    position.getLayout(),
                ]}>
                <Puller>
                    <Icon name="chevron-up" size={18} color={'#ffffff'} />
                </Puller>
                <StickyContent />
            </Animated.View>
        </Container>
    );
};

export default MyPage;