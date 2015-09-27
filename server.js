/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

import express from 'express';
import compression from 'compression';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';

// for fetchr plugin
import csurf from "csurf";

const htmlComponent = React.createFactory(HtmlComponent);
const env = process.env.NODE_ENV;

const debug = debugLib('gallery');

const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use(compression());

server.use((req, res, next) => {
    let context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const html = React.renderToStaticMarkup(htmlComponent({
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(createElementWithContext(context))
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

// csurf used by fetchr plugin.
server.use(csurf({ cookie: true}));

// Configure fetchr (for doing api calls server and client-side)
const fetchr = app.getPlugin("FetchrPlugin");

fetchr.registerService(require("./services/photos"));

// fetchr middleware will enable requests from /api
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());
const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
