import { Request, Response } from 'express';
import axios from 'axios';

exports.getDataEmployees = (req: Request, res: Response) => {
  const { results } = req.query;
  const url = `https://randomuser.me/api/?results=${results}`;
  const requestConfig = {
    method: 'get',
    url
  };

  axios(requestConfig)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res
        .status(error?.response?.status || 500)
        .json(error?.response?.data || {});
    });
};
