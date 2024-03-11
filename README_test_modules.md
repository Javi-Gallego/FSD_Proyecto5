## JEST TRABAJA CON COMMONJS
## PARA PODER TRABAJAR CON MODULE HAY QUE INSTALAR BABEL

### Instalamos Jest, Supertest y Babel

``` bash
npm i jest -D
```   
``` bash
npm i supertest -D
```   
``` bash
npm i babel-jest -D
```   
``` bash
npm i @types/jest -D
```   
``` bash
npm i @types/supertest -D
```   
``` bash
npm i @babel/preset-env -D
```   

### Dentro de src creamos la carpeta __test__ y dentro el archivo api.test.js
#### Ejemplo de api.test.js

``` javascript
import request from "supertest"
import { dbConnection } from "../database/db.js"
import { app } from "../app.js"
import "dotenv/config"
import mongoose from "mongoose"

let server

beforeAll(async () => {
    await dbConnection()

    server = app.listen(4001)
})

afterAll(async () => {
    try {
        if (server) {
        await server.close()
        console.log('Server closed')
        }

        await mongoose.connection.close()
    } catch (error) {
        console.error('Error closing server and destroying database connection:', error)
        throw error
    }
})

describe("control healthy", () => {
    test("GET healthy", async () => {
        const { status, body } = await request(server).get("/api/healthy")
        expect(status).toBe(200)
        expect(body).toEqual({
            success: true,
            message: "Server is healthy",
        })
    })
})
```   

### En la raíz del proyecto creamos el archivo "babel.config.json" y dentro ponemos esto:
```javascript
{
    "presets": 
      [
        "@babel/preset-env"
        
      ]
}
```  

### Hay que modificar el package.json y añadir al final "jest"
### Cuando vamos a usar Babel para poder usar Jest con Modules

```javascript
"jest": {
    "testEnvironment": "node",
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
```  

### Cuando usamos Jest con typeorm que es commonJS
#### porque no queremos que coja los archivos .ts, solo los que compile en /dist

``` javascript
"jest": {
    "modulePathIgnorePatterns": [
      "src"
    ]
  }
```  