import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import '../../styles/pages/landing.css'

import logoImg from '../../images/logo.svg'

export default () => {
    return (
        <div id='page-landing'>
            <div className="content-wrapper">
                <img src={logoImg} alt="" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visiste orfanoatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <strong>
                        Volta Redonda é o bixo
                    </strong>
                    <span>Rio de Janeiro</span>
                </div>

                <Link to='/map' className='enter-app' >
                    <FiArrowRight size={26} color='rgba(0,0,0,0.6)' />
                </Link>
            </div>
        </div>
    );
}

