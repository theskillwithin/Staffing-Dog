import React from 'react'
import { array } from 'prop-types'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidGhlc2tpbGx3aXRoaW4iLCJhIjoiY2podWl3OXVsMG95ejNwcGRpM2xxaHhuNSJ9.srQbrb72e33iv_nzgLfojQ',
})

const MapBox = ({ coordinates }) => (
  <Map
    style="mapbox://styles/mapbox/streets-v9"  // eslint-disable-line
    containerStyle={{ height: '332px', width: '100%' }}
    center={coordinates}
  >
    <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
      <Feature coordinates={coordinates} />
    </Layer>
  </Map>
)

MapBox.propTypes = {
  coordinates: array.isRequired,
}

export default MapBox
