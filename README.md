# api-node

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest"/>
</p>

REST API serving account balances and transactions. It backs the
[`mfe-consultas`](https://github.com/Rxcxrdx/mfe-consultas) and
[`mfe-reportes`](https://github.com/Rxcxrdx/mfe-reportes) micro-frontends.

> Part of the [**Micro-Frontends on Azure AKS**](https://github.com/Rxcxrdx/microfrontends-aks-jenkins)
> project — see that repository for the full architecture and deployment guide.

## Endpoints

| Method | Path | Description |
|:--|:--|:--|
| `GET` | `/health` | Health probe for Kubernetes liveness and readiness checks |
| `GET` | `/api/saldos/:cuentaId` | Account balance breakdown (mandatory, voluntary, severance) |
| `GET` | `/api/transacciones/:cuentaId` | List of ten transactions for the account |

Data is served from [`src/data.ts`](src/data.ts). There is no database and no
authentication — this is a mock backend for the lab.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3001, with hot reload
```

Build and run without hot reload:

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

The image is built in multiple stages and runs as a non-root user, exposing
port `3001`.

## Deployment

A push to `dev` triggers the Jenkins pipeline defined in
[`Jenkinsfile`](Jenkinsfile): install, test, build the image, push it to Azure
Container Registry, and roll out the new revision on AKS.
