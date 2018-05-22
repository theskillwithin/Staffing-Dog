import React from 'react'
import { bool, number, object, oneOfType } from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


const Map = withScriptjs(
  withGoogleMap(
    ({ isMarkerShown, position, defaultZoom, defaultCenter }) => (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      >
        {isMarkerShown && <Marker position={position} />}
      </GoogleMap>
    ),
  ),
)

Map.defaultProps = ({
  isMarkerShown: false,
  defaultZoom: 8,
  defaultCenter: { lat: -34.397, lng: 150.644 },
  position: false,
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '332px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
})

Map.propTypes = ({
  isMarkerShown: bool,
  defaultZoom: number,
  defaultCenter: object,
  position: oneOfType([
    object,
    bool,
  ]),
})

export default Map
