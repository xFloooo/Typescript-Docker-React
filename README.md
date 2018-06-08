# Typescript-Docker-React

One command for development and for production

###FULL-STACK
This is not development server. This is an assembly for server and client development at the same time

### production

`docker-compose up` and goto http://localhost:8000

### development

need rename `docker-compose.override.sample.yml` to `docker-compose.override.yml` and `docker-compose up` and goto http://localhost:8000

```
structure

    src
      /index.ts - server
      /frontend - client
```

### in the package included

1.  nodemon - to reload the server after the changes in server code
2.  react-hot-loader - for hot development react app
3.  express - server
