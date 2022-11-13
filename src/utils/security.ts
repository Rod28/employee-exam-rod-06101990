import { Request, Response, NextFunction } from 'express';
// envs
require('dotenv').config({ path: '.env' });

/**
 * Funcion que se encarga de agregar cabeceras personalizada o sobrescribir las que Helment
 * proporciona en caso de ser necesario.
 * @param {*} res Argumento de respuesta HTTP a la función de middleware, denominado "res" por convención.
 * @param {*} next Argumento de devolución de llamada a la función de middleware, denominado "next" por convención.
 */
const setCustomHeaders = (_: Request, res: Response, next: NextFunction) => {
  let allowOrigins = (process.env?.ALLOW_ORIGINS || '').split(',');

  // Arreglo de dominios que indica quienes tienen permiso de acceder a los recursos.
  res.setHeader('Access-Control-Allow-Origin', allowOrigins);

  // Pass control to the next handler
  next();
};

module.exports.setCustomHeaders = setCustomHeaders;
