## Requirements
- Node18

## Getting Started
To install the dependencies
```
npm install
```

### Dev

Create a `.env` file in `/backend` and `/frontend` following the `example.env`. You will need a local instance of Postgres running and set its address in the backend `.env` file.

To set up the db, inside `/backend` run
```
npx prisma migrate dev
```
which will generate the required migrations

Finally in `/backend` and `/frontend`, run
```
npm run dev
```
