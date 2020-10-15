import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { mapIcon } from '../../commons/utils'
import mapMarkerImg from '../../images/map-marker.svg'
import '../../styles/pages/orphanage-map.css'
import { happyApi } from '../../services/api'


interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

export default () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  useEffect(() => {
    happyApi.orphanageList()
      .then(res => {
        setOrphanages(res)
      })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um organato no mapa</h2>

          <p>Muitas crianças estão esperando a sua visita</p>
        </header>
        <footer>
          <strong>Volta Redonda</strong>
          <span>Rio de Janeiro</span>
        </footer>
      </aside>

      <Map
        center={[-22.5064716, -44.0949606]}
        zoom={15}
        style={
          {
            width: '100%',
            height: '100%'
          }
        }
      >
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
        <TileLayer
          url={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className='map-popup'
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight
                    size={20}
                    color='#fff'
                  />
                </Link>
              </Popup>
            </Marker>
          )
        })}

      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </div >
  )
}