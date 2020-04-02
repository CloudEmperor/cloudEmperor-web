import React, {Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';

import FullScreenLayout from '../components/Layout/FullScreenLayout'
import HasSiderHeadLayout from '../components/Layout/HasSiderHeadLayout'
import HasHeadLayout from '../components/Layout/HasHeadLayout'


const LayoutTypeKey= {
    'FullScreenLayout': FullScreenLayout,
    'HasSiderHeadLayout': HasSiderHeadLayout,
    'HasHeadLayout': HasHeadLayout
}

class CreateRoutes extends React.Component{
    renderRoute = route => {
        const { layoutType, path, component: Component, ...rest } = route
        const LayoutComponent = LayoutTypeKey[layoutType]
        return (
            <LayoutComponent
                key={path}
                exact
                path={path}
                {...rest}
                component={() => (
                    <Suspense fallback={<div />}>
                        <Component />
                    </Suspense>
                )}
            />
        )
    }

    render(){
       return (
           <Switch>
               {routes.map(route => this.renderRoute(route))}
               <Route render={() => < Redirect to='/404' />} />
           </Switch>
       )
    }
}

export default CreateRoutes
