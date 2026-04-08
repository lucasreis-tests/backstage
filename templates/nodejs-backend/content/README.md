# ${{ values.name }}

${{ values.description }}

## Running locally

```bash
npm install
npm run dev
```

## API

- `GET /healthcheck` — Health check
- `GET /api` — Service info
- `GET /api/items` — List items
- `POST /api/items` — Create item (`{ "name": "..." }`)

## Docker

```bash
docker build -t ${{ values.name }} .
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```
