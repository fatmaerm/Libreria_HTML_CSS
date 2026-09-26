# Aviso sobre código y recursos de terceros

## Estado de distribución

La `LICENSE` de la raíz se aplica únicamente al código original de la aplicación y a la documentación creados para este repositorio por `kindred-98`. No concede derechos sobre los demos existentes ni sobre recursos de terceros de `BibliotecaDeHtml_CSS/`.

La auditoría local encontró 116 páginas de demos y ninguna carpeta contiene su propio archivo `LICENSE`, `LICENCE`, `COPYING`, `NOTICE` o `README`. Este repositorio no acredita quién creó originalmente cada demo, de dónde procede ni bajo qué condiciones se puede redistribuir. El catálogo marca `source` y `license` como `Unverified`; por defecto, ningún demo está autorizado para descargarse como ZIP ni para incluirse en el artefacto público de Pages.

El ejemplo de reacciones de Facebook contiene código y referencias a recursos que coinciden con el proyecto público [facebook-reactions-css](https://github.com/deividmarques/facebook-reactions-css), atribuido allí a Deivid Marques. La página del repositorio revisada el 26-09-2026 no mostraba un archivo de licencia. Que un repositorio sea público no concede permiso para redistribuir su código. Este demo seguirá bloqueado hasta confirmar sus derechos.

Los archivos locales, como `Movie-Card-UI/pngwing.png`, y las imágenes, fuentes, iconos o bibliotecas remotas también pueden tener condiciones propias. Corregir un enlace roto o reemplazar una referencia remota no concede permiso para redistribuir el resto del componente.

## Autorizar un componente

1. Identifica al autor original y la fuente del código y de cada recurso incluido.
2. Confirma que la licencia o el permiso por escrito permite redistribuirlo en este sitio y mediante descargas ZIP.
3. Guarda la licencia completa y los avisos de atribución requeridos dentro de la carpeta del componente.
4. Añade la fuente verificada, el identificador de licencia, la ruta relativa `licenseFile` y `redistributable: true` en `Web/data/component-overrides.json`.
5. Regenera el catálogo y confirma que `downloadable` sea `true` para ese componente.

El constructor de despliegue publica solo los componentes que cumplen estas condiciones. No marques un componente como autorizado solo porque esté en este repositorio o porque exista la MIT en la raíz. Este documento es un inventario técnico, no asesoramiento legal.
