# ${{ values.name }}

${{ values.description }}

## Running locally

```bash
npm install
npm run start:dev
```

## API Docs (Swagger)

```
http://localhost:${{ values.port }}/docs
```

## Endpoints

- `GET /api/health` — Health check (Terminus)
- `GET /api/items` — List items
- `POST /api/items` — Create item (`{ "name": "..." }`)

## Docker

```bash
docker build -t ${{ values.name }} .
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```
