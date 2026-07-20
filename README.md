# api-node

API REST mock (sin base de datos) que expone saldos y transacciones de una cuenta, pensada como backend para los micro-frontends `mfe-consultas` y `mfe-reportes`.

## Endpoints

- `GET /health` — probe de salud para Kubernetes.
- `GET /api/saldos/:cuentaId` — saldo mock (obligatoria, voluntaria, cesantías) de una cuenta.
- `GET /api/transacciones/:cuentaId` — lista mock de 10 transacciones de una cuenta.

Los datos viven en [src/data.ts](src/data.ts), no hay base de datos ni autenticación.

## Correr local

```bash
npm install
npm run dev        # http://localhost:3001, con recarga en caliente
```

Build y ejecución sin recarga:

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

## Docker

```bash
docker build -t api-node .
docker run -p 3001:3001 api-node
curl http://localhost:3001/health
```

El contenedor corre como usuario no-root y expone el puerto `3001`.
# probando webhook lunes, 20 de julio de 2026, 11:40:51 -05
