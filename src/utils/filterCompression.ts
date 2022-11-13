import { Request, Response } from 'express';
const compression = require('compression');

/**
 * Funcion que decide si la respuesta debe comprimirse o no, dependiendo de si existe o no
 * la cabecera 'x-no-compression'.
 * @param {*} req Argumento de solicitud HTTP para la función de middleware, llamado "req" por convención.
 * @param {*} res Argumento de respuesta HTTP a la función de middleware, denominado "res" por convención.
 */
const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    // No comprimirá las respuestas, si este encabezado está presente
    return false;
  }
  // Recurrir a la compresión estándar return compression.filter(req, res);
  return compression.filter(req, res);
};

module.exports.shouldCompress = shouldCompress;
