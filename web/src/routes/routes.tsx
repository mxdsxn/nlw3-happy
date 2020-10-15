import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Landing } from '../pages/landing'
import { OrphanageMap } from '../pages/orphanage-map'
import { CreateOrphanage } from '../pages/create-orphanage'
import { Orphanage } from '../pages/orphanage'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/map' component={OrphanageMap} />
                <Route path='/orphanages/create' component={CreateOrphanage} />
                <Route path='/orphanages/:id' component={Orphanage} />
            </Switch>
        </BrowserRouter>
    )
}