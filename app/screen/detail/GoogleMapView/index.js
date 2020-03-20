import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
`;

const GoogleMapView = props => {
    return (
        <Container>
            <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </Container>
    );
};

export default GoogleMapView;