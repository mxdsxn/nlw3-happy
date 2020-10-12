import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Landing } from '../pages/landing'
import { OrphanageMap } from '../pages/orphanage-map'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/map' component={OrphanageMap} />
            </Switch>
        </BrowserRouter>
    )
}