/*
  This is not being used at the moment, if you wish to use must first:
  npm i mapbox-gl react-mapbox-gl --save

  experienced:
  console error: Failed to initialize WebGL
  console warning: Using unescaped '#' characters in a data URI body is 
    deprecated and will be removed in M67, around May 2018. Please use '%23'
    instead.
*/

import React from 'react'
import { array } from 'prop-types'
import ReactMapboxGl, { Layer, Feature, ZoomControl } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidGhlc2tpbGx3aXRoaW4iLCJhIjoiY2podWl3OXVsMG95ejNwcGRpM2xxaHhuNSJ9.srQbrb72e33iv_nzgLfojQ',
})

const MapBox = ({ coordinates }) => (
  <Map
    style="mapbox://styles/mapbox/streets-v9"  // eslint-disable-line
    containerStyle={{ height: '332px', width: '100%' }}
    center={coordinates}
    zoom={[13]}
  >
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={coordinates} />
    </Layer>
    <ZoomControl />
  </Map>
)

MapBox.propTypes = {
  coordinates: array.isRequired,
}

export default MapBox
