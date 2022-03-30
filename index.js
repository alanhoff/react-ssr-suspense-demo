import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import {App} from './app';
import {FakerProvider} from './app/faker-provider';

const app = express();

app.get('/', (req, res) => {
  const seed = req.query.seed || Date.now();
  const root = (
    <FakerProvider seed={seed}>
      <App />
    </FakerProvider>
  );

  const {pipe} = ReactDOMServer.renderToPipeableStream(root, {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');

      pipe(res);
    },
    onShellError(err) {
      console.error(err);

      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.send('<p>Error</p>');
    }
  });
});

app.listen(8080);