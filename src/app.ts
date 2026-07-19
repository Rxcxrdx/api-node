import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { obtenerSaldo, obtenerTransacciones } from './data';

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.get('/api/saldos/:cuentaId', (req: Request, res: Response) => {
    const { cuentaId } = req.params;
    res.status(200).json(obtenerSaldo(cuentaId));
  });

  app.get('/api/transacciones/:cuentaId', (req: Request, res: Response) => {
    const { cuentaId } = req.params;
    res.status(200).json(obtenerTransacciones(cuentaId));
  });

  return app;
}
