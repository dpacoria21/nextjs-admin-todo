# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Crear una copia de el .env.template y .renombrarlo a .dev
3. Reemplazar las variables de entorno
4. Ejecuta el comando ``` npm install ```
5. Ejecuta el comando ``` npm run dev ```
6. Ejecuta los comandos de Prisma
7. Ejecuta la SEED para [crear la base de datos local](localhost:3000/api/seed)
# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod


# Stage