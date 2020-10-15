import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import { Sidebar } from '../../commons/sidebar'
import { mapIcon } from "../../commons/utils";
import { happyApi } from "../../services/api";

import '../../styles/pages/orphanage.css';

interface Orphanage {
  about: string,
  instructions: string,
  latitude: number,
  longitude: number,
  name: string,
  opening_hours: string,
  open_on_weekend: string,
  images: Array<{
    id: number,
    url: string
  }>
}

interface RouteParams {
  id: string
}

export default () => {
  const params = useParams<RouteParams>()
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [activeImageIndex, setActivImageIndex] = useState<number>(0)

  const { id } = params

  useEffect(() => {
    happyApi.orphanageShow(Number(id))
      .then(res => {
        setOrphanage(res)
      })
  }, [id])


  return (
    !orphanage
      ? <p>Carregando</p>
      : <div id="page-orphanage">
        <Sidebar />
        <main>
          <div className="orphanage-details">
            <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

            <div className="images">
              {
                orphanage.images.map((image, index) => {
                  return (
                    <button
                      className={activeImageIndex === index ? 'active' : ''}
                      type="button"
                      key={image.id}
                      onClick={() => setActivImageIndex(index)}
                    >
                      <img src={image.url} alt={orphanage.name} />
                    </button>
                  )
                })
              }
            </div>

            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>

              <div className="map-container">
                <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />

                  <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                </Map>

                <footer>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  >
                    Ver rotas no Google Maps
                  </a>
                </footer>
              </div>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                  {orphanage.opening_hours}
                </div>
                {
                  orphanage.open_on_weekend
                    ? (
                      <div className="open-on-weekends">
                        <FiInfo size={32} color="#39CC83" />
                          Atendemos <br />
                          aos fim de semana
                      </div>
                    ) : (
                      <div className="open-on-weekends dont-open">
                        <FiInfo size={32} color="#ff6690" />
                          Não atendemos <br />
                          aos fim de semana
                      </div>
                    )
                }
              </div>

              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
            </div>
          </div>
        </main>
      </div>
  );
}