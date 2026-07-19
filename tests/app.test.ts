import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('GET /health', () => {
  it('responde 200 y status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/saldos/:cuentaId', () => {
  it('responde 200 con el saldo de una cuenta conocida', async () => {
    const res = await request(app).get('/api/saldos/1001');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      cuentaId: '1001',
      moneda: 'COP',
    });
    expect(typeof res.body.obligatoria).toBe('number');
    expect(typeof res.body.voluntaria).toBe('number');
    expect(typeof res.body.cesantias).toBe('number');
  });

  it('responde 200 con saldo por defecto para una cuenta desconocida', async () => {
    const res = await request(app).get('/api/saldos/9999');
    expect(res.status).toBe(200);
    expect(res.body.cuentaId).toBe('9999');
  });
});

describe('GET /api/transacciones/:cuentaId', () => {
  it('responde 200 con 10 transacciones mock', async () => {
    const res = await request(app).get('/api/transacciones/1001');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(10);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      fecha: expect.any(String),
      descripcion: expect.any(String),
      tipo: expect.any(String),
      monto: expect.any(Number),
    });
  });
});
