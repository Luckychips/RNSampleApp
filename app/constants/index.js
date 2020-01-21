import {Dimensions} from 'react-native';
export const THEME_COLOR = '';
export const STATUS_BAR_HEIGHT = 20;
export const IPHONE_X_NOTCH_HEIGHT = 44;
export const IPHONE_X_BOTTOM_NOTCH_HEIGHT = 34;
export const IS_X_SIZE = dim => {
    return dim.height === 812 || dim.width === 812;
};

export const IS_XR_SIZE = dim => {
    return dim.height === 896 || dim.width === 896;
};

export const IS_X =
    Platform.OS === 'ios' &&
    (IS_X_SIZE(Dimensions.get('window')) ||
        IS_XR_SIZE(Dimensions.get('window')));

/*

todo
1. sticky content
2. tab view
3. animated text input
 */