import express, { Express, Request, Response } from 'express';

const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
// Utils
const { setCustomHeaders } = require('./src/utils/security');
const { shouldCompress } = require('./src/utils/filterCompression');
// envs
require('dotenv').config({ path: '.env' });

// Server
const app: Express = express();

// Enabled express.json
app.use(express.json({ extended: true } as any));

// Compress all HTTP responses
app.use(
  compression({
    filter: shouldCompress,
    threshold: 0
  })
);

// Permite el uso de CORS en el servidor
app.use(cors());

// Establecen cabeceras HTTP relacionadas con la seguridad
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Custom headers
app.use(setCustomHeaders);

// App's port current
const PORT = process.env.PORT || 4000;

// Static files
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('dist/build'));
  // Render app
  app.get('/', (_: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'build', 'index.html'));
  });
}

// All API routes
app.use('/api/employees', require('./src/routes/employees'));

// Start app
app.listen(PORT, () => {
  console.log(`Server started on port: >> ${PORT}`);
});
