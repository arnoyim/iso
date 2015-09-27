import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';

import fetchrPlugin from "fluxible-plugin-fetchr";

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

// Make fetchr services respond to api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api" }));

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);

export default app;
