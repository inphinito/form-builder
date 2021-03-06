# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.10.5] - 2021-01-19
### Fixed
- Error al añadir elementos de construcción dentro de columnas de tablas.

## [0.10.2] - 2021-01-14
### Added
- Reordenación mediante drag and drop de columnas del elemento de construcción table y opciones del elemento de construcción select.
### Changed
- Los roles van a nivel del componente y no hay que inicializarlos en el módulo.
### Fixed
- Las propiedades dentro de las columnas de una tabla no desaparecen al ser eliminadas.

## [0.10.1] - 2021-01-14
### Added
- Posibilidad de poner por defecto el día y hora actual en el elemento de construcción Input cuando el formato seleccionado es date, time o datetime.

## [0.10.0] - 2021-01-05
### Added
- Permisos por rol en cada elemento de construcción.

## [0.9.9] - 2020-12-15
### Fixed
- No dan error los select en caso de alimentación externa.

## [0.9.8] - 2020-12-10
### Fixed
- Se muestra y selecciona correctamente el valor por defecto en los select.

## [0.9.7] - 2020-11-30
### Fixed
- Los objetos se clonan de forma profunda.
- Al editar una tab aparece correctamente su key.

## [0.9.6] - 2020-11-30
### Fixed
- Confirmación al cancelar cuando los formularios han sido rellenados.

## [0.9.5] - 2020-11-29
### Removed
- Eliminación del establecimineto del idioma por defecto.

## [0.9.4] - 2020-11-23
### Fixed
- Unificación del campo default en todos los componentes afectados.

## [0.9.3] - 2020-11-23
### Fixed
- Corrección de validación del componente de selectores.

## [0.9.2] - 2020-11-18
### Fixed
- Se establecen bien los validadores al cambiar la entrada de datos en los select.

## [0.9.1] - 2020-11-17
### Fixed
- Corrección de la validación en las Tabs.
- Mejorados los títulos del constructor.

## [0.9.0] - 2020-11-17
### Added
- Validación de los campos clave de los componentes de construcción.

## [0.8.1] - 2020-10-23
### Added
- Traducciones al español e inglés.

## [0.8.0] - 2020-10-22
### Added
- Incorporación de @ngx-translate.
### Fixed
- Corregida la eliminación de pestañas individualmente.

## [0.7.9] - 2020-10-15
### Fixed
- Campos requeridos en el componente Select.

## [0.7.8] - 2020-10-09
### Fixed
- Marcado de touched y dirty.

## [0.7.7] - 2020-10-08
### Fixed
- La barra de herramientas solo flota en el caso de que el componente esté en el viewport.

## [0.7.6] - 2020-10-08
### Fixed
- Exportación de componentes.

## [0.7.1] - 2020-10-08
### Fixed
- Assets dentro del módulo.

## [0.7.0] - 2020-10-08
### Added
- Nuevo elemento texto enriquecido.
- Barra de herramientas flotante en scroll.
### Fixed
- El formulario se marca como tocado cuando duplicas, eliminas o editas un elemento.
### Changed
- Maquetación general mejorada.

## [0.6.0] - 2020-08-17
### Added
- Nuevo elemento tablas.

## [0.5.0] - 2020-08-07
### Added
- Añadida la posibilidad de clonar elementos.
- Añadido el componente Triggers para condicionar cada elemento de construcción.

## [0.4.0] - 2020-07-27
### Added
- Nuevo componente fieldset.

## [0.3.0] - 2020-01-14
### Added
- Añadido nuevo componente para añadir inputs de tipo fichero.

## [0.2.0] - 2020-01-14
### Added
- Implementación de control reactivo y deshabilitado.

## [0.1.1] - 2020-01-14
### Changed
- Añadidos bootstrap y ngx-drag-drop como dependencias.

## [0.1.0] - 2020-01-14
### Changed
- Refactorización del código.
### Added
- Nuevo componente para añadir pestañas al formualrio.

## [0.0.2] - 2020-01-09
### Changed
- Las dependencias de bootstrap y ngx-drag-drop ya no son de desarrollo.

## [0.0.1] - 2020-01-09
### Added
- Construcción del esquema de un formulario básico a través de drag and drop.
