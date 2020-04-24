### Repaso clase 0:

- Tipos de datos:

  - String.
  - Number.
  - Null.
  - Undefined.
  - Object.
  - boolean.
  - symbol.

- **ECMAScript 2015**: especificacion que describe como el lenguaje se deberia comportar.

- Que especificacion soportan la mayoria de los navegadores? **ES5**

- **Transpiler**:
  Toma tu codigo de ultima especificacion y lo convierte a codigo acorde a ES5.
  Ej: Babel, TypeScript, CoffeeScript.

- ## **Closures:**
  **INVESTIGAR QUE SON PORQUE NO ENTENDI UNA GARCHA**
  let vs var:
  scope, el scope de var es hasta que termina la funcion en la que se la declaro, el scope de let hasta el final del bloque de codigo en el que se declaro.

### Immediately Invoked Function Expression (iife)

- Function expresion that gets invoked Closures.
- Creates closure.
- Doesnt add to or modify global object.

## First-Class Functions

Describe la manera la manera en que el lenguaje maneja funciones.
Javascript--> classes son first class citizens.
Es decir que las funciones son tratadas como cualquier otro objeto.
Pueden ser pasadas como argumento, asignarse a una variable, o ser retornadas de otra funcion.
Una funcion que retorna a otra funcion o toma a una funcion como argumento se llama High Order Function.

Las _High Order Function_ mas conocidas :

- Map()
- Filter()
- Reduce()

**Ejemplo:**
Queremos una funcion que tome un Array, y le aplique otra funcion a cada elemento en ese array y nos devuelva un nuevo array modificado. (basicamente lo mismo que hace map).

```javascript
function map(arr, fn) {
  const newArr = [];

  for (let i = 0; i > arr.lenght; i++) {
    let val = arr[i];
    newArr.push(fn(val));
  }
  return newArr;
}

function addOne(num) {
  return num + 1;
}

const x = [0, 1, 2, 3];

console.log(map(x, addOne));
```

El codigo de arriba se puede mejorar usando el metodo forEach().

```javascript
function map(arr, fn) {
  const newArr = [];
  arr.forEach((val) => {
    newArr.push(fn(val));
  });
  return newArr;
}

function addOne(num) {
  return num + 1;
}

const x = [0, 1, 2, 3];

console.log(map(x, addOne));
```

## Sync/Async/Single-Threaded

JavaScript es un lenguaje synchronous y single-threaded.
Esto quiere decir que si una determinada funcion tarda demasiado en ejecutarse, va a trabar el sitio/documento/navegador donde se este ejecutando.
Pero ademas JavaScript tiene funciones asyncronas. Como `setTimeOut()`.

### Asynchronous JavaScript

#### Execution Stack:

- Las funciones invocadas por otras funiones son agregadas al stack de llamadas.
- Cuando una funcion se completa, se remueve del stack y la siguiente en el stack se ejecuta.
- Ejemplo: Se puede ver el orden de un stack de ejecucion cuando tenemos un error en consola que nos dice error: at funcion1() linea tanto; at funcion2() linea tanto.. Lo que nos dice con funcion1() funcion2() es el stack que de llamadas a funciones que desenvoco en el error.

#### Function Queue

Si la funcion que se carga en el stack, es una funcion asyncrona, entonces sale del stack y es manejada por el navegador, y se pasa a la funcion syncrona siguiente del stack.
Cuando el navegador finaliza la ejecucion de la funcion asyncrona y obtiene la respuesta, la manda a la **Function Queue**. Mientras tanto hay una especie de Event Listener o algo asi que chequea que no haya nada en la Function Queue. Si aparece algo, lo manda de nuevo al stack syncrono, y se ejecuta.

Ejemplos de funciones asyncronas:

- setTimeout()
- XMLHttpRequest(), jQuery.ajax(), fetch()
- Database calls

#### Callbacks

Controlan lo que hay que hacer cuando se retorna el resultado de una funcion asyncrona.
_Cabllback hell_

#### Promises

Las promises hacen uso del metodo `then()` para corregir el gran problema de sintaxis que generan los callback hells.
De esta manera se pueden manejar los callbacks de una manera mucho mas concisa y accesible, y facil de editar.

```javascript
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (json) {
    return { importantData: json.importantData };
  })
  .catch(function (error) {
    //handle error
  });
```

#### Async/Await (ES2017)

Nos permite escribir codigo asyncrono como si fuera Syncrono.

```javascript
async function login(req, res, callback) {
  try {
    const user = await User.finOne({ emai: req.body.email });
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) return res.status(401).send("Incorrect password");
    const payload = { id: user._id, emai: user.email };
    const token = await jwt.sign(payload, config.secret, {});

    user.token = toke;
    const succes = await user.save();
  } catch (err) {
    callback(err);
  }
}
```

## this

- Se refiere a un objeto que es seteado en la creacion de un nuevo contexto de ejecucion (invocaicon de funcion).
- En el global context, se refiere al objeto global.
- Si la funcion es llamada como un metodo de un objeto, `this`, se refiere al objeto sobre el cual se invoca a ese metodo.

Si queremos que `this` se refiera a algun objeto en particular, lo que tenemos que hacer es usar `bind()` o `call()` o `apply()`.

Si queremos que `this` solo se refiera al objeto en donde se escribio el metodo al momento de escribirlo y siempre a ese objeto, usamos una _arrow function_. `() => { return this.tuvieja }`

## Browsers y el DOM

**Document Object Model**
