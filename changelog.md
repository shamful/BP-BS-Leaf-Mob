# HTML5-Boilerplate-Leaflet
## Purpose
- A leaflet map built on the HTML5-Boilerplate template
- Visualises data using geoserver feeds

## Requirements
- Must have a mobile friendly responsive design (bootstrap) and be compatible on 80% of devices
- Must be compatible when embedded in a sitecore webpage
- Must show markers in correct position

# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased]
### Issues
- On mobile zoomIn / Out changes display of map object to none
- On mobile bootstrap navbar is covered by keyboard when address input is selected.  User can't see what they're typing.

### Changed
- Removed onclick in DOM.  Using jquery event listeners instead i.e zoom in, zoom out
- Removed id from all zoom controls and replaced with class, because there are four zoom buttons
- Hid bootstrap navbar 'address search' and replaced with default search in top right of screen
- 

### To be added
- Bound address lookup control
- Use KNN plugin to add find nearest bay/cage/garage to track my location popup
- Basemap switcher: Need to add Bing streets map and try with leaflet crs set to projection of 27700
- Basemap switcher: Try loading mapthat mashup tiles (uses bing like quadkey for tiles) as BNG 27700
- Preferrably create function for any geoserver point layer OR create specific function for estate parking?

## [0.1.1] - 2015-10-25
### Issues
- Routing machine is probably not mobile friendly
- Address search does nothing - Needs to be bound to address lookup api: Bing / Nominatim?
- Filter does nothing

### Changed
- Changed islingtonBoundary.js to geoserverPolygons.js - Will now act as a main function for all polygon layers.  Currently requires a function for each layer that needs to be added to the map.

### Added
- Generic geoserver polygon function: tested by adding housing office areas and estate boundaries

## [0.1.0] - 2015-10-23
### Issues
- Routing machine is probably not mobile friendly
- Address search does nothing - Needs to be bound to address lookup api: Bing / Nominatim?
- Filter does nothing

### Changed
- Restyled routing machine ( probably not mobile friendly )
- Islington Boundary

### Added - Combined already made leaflet map with HTML5 boilerplate template
#### What it does now
- Map object with default controls disabled
- Bootstrap botton navbar
- Zoom in / out buttons
- Track my location button ( needs testing on mobile device )
- Directions button (routing machine)
- Home button: Navigates map to Islington boundary extent
- Basemap switch
- Islington boundary