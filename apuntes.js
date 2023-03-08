// ¿Qué es una API REST?

// API = Aplication Program Interface
// REST = REpresentational State Transfer
// HTTP = Hypertext Transfer Protocol.

// Las interfaces son los mecanismos a través de los cuales un robot le permite a los usuarios comunicarse/interactuar. Las API, no son para comunicar robots con usuarios, sino robots con robots (por ejemplo, comunicar el frontend y el backend, o incluso backend con otros backend).
// Las API REST son APIs para comunicar robots con HTTP, por medio de internet. HTTP es el protocolo que nos permite realizar una petición de datos y recursos, como pueden ser documentos HTML. La información que la API REST nos va a devolver estará en formato JSON.
// Una API RESTful es...

// Todas las páginas web tienen frontend y backend, además hay usuarios que de alguna forma deben interactuar con ella para obtener la información que requieren. Sin embargo, estos no la reciben directamente, si no que en el frontend captamos las interacciones y las traducimos en consultas al backend, que es quien tiene la información, para que pueda devolverla. Esta dinámica es el Server Side Rendering.
// Sin embargo, con JS puedo comunicarme con el backend consumiendo una API REST y, siendo capaz de manipular el DOM, puedo escuchar las acciones de los usuarios y alterarlo en función de las respuestas de la API; de otro modo el HTML tendria que cargar constantemente con cada solicitud directa al servidor.
// Las bases de datos me permiten persistir la información. La API se comunica con ella para requerirle información que solicitan los usuarios y poder devolverla o guardar nueva.

// ______________________________________

// HTTP Status Codes
// son un mensaje que el servidor envía al navegador indicando si la solicitud puede ser cumplida o no. Van desde el 100 hasta el 500
// - 100: Respuestas afirmativas
// - 200: Respuesta satisfactoria, tanto frontend como backend está bien. Puede ser sólo 200, pero también puede ser más específico acerca de las características del éxito de la ejecución: 201(mandamos a crear algo y esa creación salió bien), 202(mandamos a crear algo y todo va bien pero aun no terminó el proceso).
// - 300: Redirección, la ruta a la que estamos entrando no es la ruta final, sino que el backend hace una redirección hacia alguna otra ruta ("No se qué onda tu solicitud bro, a mi me digeron que todo lo que me manden por aca lo mande para allá y chau pinela"); por lo tanto no sabemos en qué estado esta la solicitud. Sin embargo podemos decidir si queremos seguir la ruta del redirect o no. 307(el redirect es temporal, puede cambiar la ruta), 308(siempre es la misma ruta).
// - 400: Error del cliente, nos equivocamos, el frontend hizo una solicitud incorrecta. 400(error en la sintaxis, typo), 401(la ruta/endpoint no funciona sin un método de autenticación), 402(necesitamos pagar para acceder a esa ruta), 404(lo que solicitamos no existe).
// - 500: Error del servidor, no se  sabe si el frontend esta bien o mal, pero el backend crasheó.

//
// API KEY

// - Autenticación: identificar quién es quién. No se sabe quién tiene qué permisos, sólo se lo identifica.
// - Autorización: nos dice quién tiene qué permisos.
// Estas trabajan en conjunto para prohibir o permitir el acceso a la información que hay en la app.

// Las API KEY son Una de las formas en las que el backend puede identificar quién está haciendo cada solicitud, además permiten limitar la cantidad de solicitudes. Por eso hay mucho endpoints inaccesibles, debemos envíarles una API KEY. Cada usuario debe tener una API KEY distinta para que el backend pueda identificarlas.
// Para enviarlas podemos usar un query parameter (ej: "?api_key=ABC123", el "?" indica el uso de un query parameter) o con un authorization header(es una forma más cómoda pero todavía no sé...).

// Application-based authentication
// User-based authentication

// _____________________________________________

// HEADERS

// Permiten enviar información adicional en una solicitud HTTP o su respuesta, ya sea acerca del navegador del vliente, de la página solicitada, del servidor, etc. Por ejemplo: en el caso de enviar una carta, podría decirse que el body es el contenido de la carta en sí, mientras que el header serían las especificaciones que necesita la empresa de correos para envíarla a dónde corresponda.

// - Content-Type: su función es que frontend y backend estén de acuerdo en qué tipo de contenido van a intercambiar. Si envíamos un Content-Type que el backend no puede soportar, va a saltar un error. 

// MIME Types (Multipurpose Internet Mail Extensions)
// Son la manera standard de mandar contenido a través de la red. Los tipos MIME especifican tipos de datos como por ejemplo texto, imagen, audio, etc. que los archivos contienen. Se debe utilizar el sufijo correcto para este tipo de archivo.
// MIME adjunta a cada archivo un archivo de cabecera donde se indica el tipo y el subtipo del contenido de los datos del archivo. Gracias a esta información tanto el servidor como el navegador pueden manejar y presentar los archivos correctamente. Éstas no son las únicas ventajas: el usuario puede combinar archivos de distintos tipos de datos; se pueden incluir, por ejemplo, archivos de imágenes y de sonido en un documento HTML.
// Para que MIME funcione correctamente, se debe utilizar la designación de nombres correcta.

// FormData
// Proporciona una manera sencilla de construir un conjunto de parejas clave/valor que representan los campos de un formulario y sus valores. Utiliza el formato "multipart/form-data"

const form = new FormData()

form.set('llave1', 'valor1')
form.get('llave1') // valor1
form.append('llave2', 'valor2')
form.append('llave2', 'valor3')
form.getAll('llave2') // [ valor2, valor3 ]

// ___________________________________________________

// Dentro de Fetch
// Por dentro, Fetch utiliza distintos prototipos (Request, Headers, Response, etc) para trabajar. Lo único que hace es consumir estos prototipos, que son los que realmente contienen el código de Fetch.

// Otras propiedades de Fetch

// Mode
// Muchas veces el backend quiere limitar con quién comparte determinada información. Dependiendo de quién haga la petición, va a bloquearla o permitirla. Mode: cors (para limitar quién puede hacer peticiones y a qué información puede acceder), no-cors (valor por defecto, no hay ninguna restricción en cuanto a quién puede realizar solicitudes ni a que información acceda), same-origin (el backend sólo permitirá que el frontend al que esta sirviendo pueda hacer solicitudes a la API).

// Caché
// La capacidad de recordar la información traída en una solicitud anterior. Podemos guardar los datos que nos haya traído la API en el navegador/en nuestra aplicación, y por ejemplo, si en un futuro tenemos que acceder nuevamente a esa información, no necesitamos hacer una nueva solicitud. Entonces, desde el frontend podemos especificar si siempre queremos cache o si nunca queremos caché y siempre hacer una nueva solicitud. Hay otras posibilidades pero no es recomendable su uso excepto en casos muy específicos.

// Redirect
// Podemos decidir que hacer cuando nos encontramos con un Status Code 3XX: follow (seguir la nueva ruta), error (bloquear la solicitud) y manuel (para casos nmuy específicos, se revisan manualmente los redirects; normalmente, el único caso de uso práctico es para los Service Workers que no sé que es).

