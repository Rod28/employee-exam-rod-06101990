import { Request, Response } from 'express';
import axios from 'axios';

exports.getDataEmployees = (_: Request, res: Response) => {
  const url = `https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/rodrigo_gallegos`;
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

exports.createNewEmployees = (req: Request, res: Response) => {
  const url = `https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/rodrigo_gallegos`;
  const body = req.body;
  const requestConfig = {
    method: 'post',
    url,
    data: body
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
