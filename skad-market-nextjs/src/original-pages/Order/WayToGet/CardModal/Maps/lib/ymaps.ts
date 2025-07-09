import React from 'react'
import ReactDom from 'react-dom'

const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready])
await ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@0.0.4')

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom)
export const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls, YMapListener } = reactify.module(ymaps3)

// Import the package to add a default marker
export const { YMapDefaultMarker, YMapGeolocationControl, YMapZoomControl } = reactify.module(await (ymaps3 as any).import('@yandex/ymaps3-default-ui-theme'))
export const { YMapClusterer, clusterByGrid } = reactify.module(await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1'))
