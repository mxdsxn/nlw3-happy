import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { FiPlus } from "react-icons/fi";

import { Sidebar } from "../../commons/sidebar";
import { mapIcon } from '../../commons/utils'

import '../../styles/pages/create-orphanage.css';
import { happyApi } from "../../services/api";
import { useHistory } from "react-router-dom";


export default () => {
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const handleMapClick = (event: LeafletMouseEvent) => {
    const {
      lat,
      lng
    } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files)

    if (!event.target.files)
      return
    const imagesFile = Array.from(event.target.files)
    setImages(imagesFile)

    const previewImagesFile = imagesFile.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(previewImagesFile)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('open_on_weekend', String(open_on_weekend))
    data.append('opening_hours', opening_hours)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    images.forEach(image => {
      data.append('images', image)
    })

    await happyApi.orphanageCreate(data)

    alert('Cadastro realizado')

    history.push('/map')
  }

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [open_on_weekend, setOpenOnWeekend] = useState(true)
  const [opening_hours, setOpeningHours] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                (position.latitude !== 0 || position.longitude !== 0) &&
                (
                  <Marker
                    icon={mapIcon}
                    interactive={false}
                    position={[position.latitude, position.longitude]}
                  />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre
                <span>
                  Máximo de 300 caracteres
                </span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">
                Fotos
              </label>
              <div className="images-container">
                {
                  previewImages.map((preview, index) => {
                    return (
                      <img key={index} src={preview} alt="" />
                    )
                  })
                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">
                Horario de Atendinmento
              </label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">
                Atende fim de semana
              </label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekend ? "active" : ''}
                  onClick={() => setOpenOnWeekend(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekend ? "active" : ''}
                  onClick={() => setOpenOnWeekend(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
