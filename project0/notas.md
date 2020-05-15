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

# React Native

¿Como funciona?

- JavaScript is bundled:
  - Javascript se transpila todo de ES7, ES6 dowt to ES5 y se minifica.
- Hilos separados para UI, layout y Javascript. No se cuelga todo si se cuelga alguna d elas partes.
- Y estos elemento se comunican entre si asyncronamente a traves de un "**bridge**".
  - El hil de JS va a requerir que se muestren los elementos de la UI.
  - El hilo de JS puede colgarse y la UI va a seguir funcionando igual.

## Principales diferencias con WEB:

- Base Componentes
- Style
- No browser APIs
  - CSS animations, Canvas, SVG, etc.
  - Algunos fueron Polyfilled (fetch, timers, console, etc.)
- Navigation
- Los componentes ya no estan disponibles globalmente como en React sino que tenemos que importarlos de 'react-native'.
- div -> View
- span -> Text
- button -> button
- checkbox -> Switch
- ScrollView

## Style

- React usa objetos JS para el estilo
- Los Objects keys estan basados en propiedades CSS
- El layout se maneja con Flexbox (con default en columnas en vez de row como en el browser)
- Longitudes estan en numeros isn unidades
- la `tyle prop` ppuede tener un array de styles.
- Expo Constants

  Expo nos provee de esta gran herramienta o modulo el cual nos permite acceder a un monton informacion del dispositivo.
  _Ejemplo_:
  Si quisieramos acceder a la propiedad altura del status bar de nuestro dispositivo para poder configurar el paddingTop de la pantalla de nuestra app. ¿Como lo hariamos?

  ```javascript
  Constants.statusBarHeight;
  ```

- StyleSheet.create(). Nos permite crear una constante con todo el estilo de la pantalla fuera del codigo de la pantalla.

  ```javascript
  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
  });
  ```

  Nos permite tener estilos en clases reutilizables.

## Event Handling

- No todos los componentes tienen interaccion como en Web.
- Solo los touchables:
  - Button
  - Todos los Touchables que estan en la documentacion
- En web, el handler se recibe como un argumento, pero en React Native los handlers a menudo reciben diferentes argumentos.

## Components

- Devuelven un nodo (algo que puede ser rendirzado)
- Representan un apieza discreta de UI
  . 'Todos los componentes de react deben actuar como funciones puras con respecto a sus props."
- **Dos tipos:**
  1. Statelees Functional Componentes _SFC_(Componentes funcionales). Solo son funciones, toman props y devuelven un nodo. No tienen tal concepto como un State.
  2. React.Component.

### Stateless Funcional Component (SFC)

Es el componente mas simple. Toma props como argumentos y devuelven un nodo. Se usa cuando no se necesita un estado.
No deberia hacer otra cosa mas que tomar props y devolver un nodo. Es lo que se llama una **funcion pura**.
No tendria que tener **sideffects**, como ssetear un valor, o agregar el valor a un array, o actualizar un objeto o cosas por el estilo. **TOMA PROPS Y RETORNA UN VALOR**. Sino podriamos estar creando bugs o crashear la app.

Cualquier cambio en las props, hara que la funcion sea re-invocada (es decir, se actualiza el componente usando el virtualDOM como ya vimos antes).

### React.Component

Clase abstracta que se puede extender para que se comporte como queramos.
**¿Que es un React.Component?**
Tienen algunas features que un componente funcional no tiene.

- Instancias.
- Mantienen su propio estado.
- Tienen lifecycle methods (similares a hooks o event handlers) que son automaticamente invocados.
- La funcion `render()` toma tanto props como class props.

### Component Lifecycle.

1. Mount
2. Update (cada vez que se recibe una nueva prop o se actualiza el state se invoca este metodo).
3. Unmount (cada vez que se esta por salir del componente, sirve para limpiar, como una escoba.)

**Mount**:

- constructor(props):
  - Se inicializa el state o otra propiedad de la clase (bound methos etc)
- render()
- El objetivo final del componente es rendizarse
- Retorna un nodo
- componentDidMount()
  - Se hace todo lo que no se necesita para la UI. (acciones asyncronas, timers, etc).
  - Actualizar el estado sin que se re-renderice la UI.

**Update**:

- componentWillReceiveProps(nextProps):
  - Actualiza cualquier campo del state que este basado en props.
- shouldComponentUpdate(nextProps, nextState):
  - Compara valores cambiados y retorna `true` si el componente deberia se re-renderizado.
    - Si retorna `false` el ciclo de update termina.
- componentDidUpdate(prevProps, prevState)
  - Hacer cualquier cosa que no se necesita para la UI (requests, etc)

**Unmount**:

- componentWillUnmount
  - limpiar
    - eliminar requests pendientes no resueltas
    - Eliminar event listeners
    - limpiar timeouts/intervals para evitar memory leaks.

## PropTypes

Chequea los tipos de datos que son pasados como props a un componente y si hay algo mal, te lo devuelve en un warning.

```javascript
import PropTypes from "prop-types";
```

# Como leer Documentacion

1. Tener un objetivo en mente. Tiene que haber algo concreto que queremos solucionar sino no tiene sentido andar leyendo documentacion a lo pavo por leer.
2. ver lo que la libreria/framework/API ofrece.
3. Encontrar algo que soluciona tu problema.
4. Configurar la solucion usando dicha API.
