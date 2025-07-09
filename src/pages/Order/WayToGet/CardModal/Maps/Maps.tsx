import { useCallback, useEffect, useMemo } from 'react'
import { BehaviorType, GenericPointFeature, LngLat } from '@yandex/ymaps3-types'
import { YMapCamera } from '@yandex/ymaps3-types/imperative/YMap'
import { observer } from 'mobx-react-lite'
import css from './Maps.module.scss'
import {
  YMap,
  YMapClusterer,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapGeolocationControl,
  YMapListener,
  YMapMarker,
  YMapZoomControl,
  clusterByGrid,
} from './lib/ymaps'
import { MarketplaceBox, UserLocation } from '@/assets/icons'
import { DEFAULT_COORDINATES, DeliveryType } from '@/constants'
import { orderStore } from '@/features/order/model/orderStore'
import { getCurrentGeolocation } from '@/helpers'
import { ILocation } from '@/interfaces'

const DEFAULT_ZOOM = 10
const LOCATION: ILocation = { center: DEFAULT_COORDINATES, zoom: DEFAULT_ZOOM }

// const createMarkerTitleFromCoords = (coordinates: LngLat) => {
//   return `${coordinates[0].toFixed(4)}; ${coordinates[1].toFixed(4)}`
// }

export const Maps = observer(() => {
  const {
    getOnMapDeliveryPoints,
    setLocation,
    location,
    setDeliveryPoint,
    setCurrentZoom,
    // searchInputValue,
    getAllDeliveryPoints,
    currentDeliveryTypeTab,
  } = orderStore

  useEffect(() => {
    getAllDeliveryPoints()
    const getUserPosition = async () => {
      const userPosition = await getCurrentGeolocation()
      setLocation([userPosition[1], userPosition[0]], DEFAULT_ZOOM)
    }
    if (!location) {
      getUserPosition()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const points: GenericPointFeature<LngLat>[] =
    useMemo(
      () =>
        getOnMapDeliveryPoints?.map((point, i) => ({
          type: 'Feature',
          id: point.id,
          geometry: { type: 'Point', coordinates: [point.longitude, point.latitude] },
          properties: { name: 'marker', description: '' },
        })),
      [getOnMapDeliveryPoints],
    ) ?? []

  // We declare a render function. For the clustering method, we pass and store the size of one grid division in pixels
  const gridSizedMethod = useMemo(() => (clusterByGrid as any)({ gridSize: 64 }), [])

  // const [markerCoordinates, setMarkerCoordinates] = useState((LOCATION as YMapCenterLocation).center)

  // We declare a function for rendering markers. Note that the function must return any Entity element. In the example, this is YMapDefaultMarker
  const marker = (feature: GenericPointFeature<LngLat>) => (
    <YMapMarker
      key={feature.id}
      coordinates={feature.geometry.coordinates}
      onDragEnd={onDragEndHandler}
      /* onDragMove={onDragMoveHandler} */
    >
      <div
        className={css.markerContainer}
        // onMouseOver={() => markerMouseOver(feature.id)}
        // onMouseOut={() => markerMouseOut(feature.id)}
      >
        <div className={css.marker} onClick={() => setDeliveryPoint(feature.id)}>
          <MarketplaceBox />
        </div>
      </div>
    </YMapMarker>
  )

  // We declare a cluster rendering function that also returns an Entity element. We will transfer the marker and cluster rendering functions to the clusterer settings
  const cluster = (coordinates: LngLat, features: GenericPointFeature<LngLat>[]) => (
    <YMapMarker key={`${features[0].id}-${features.length}`} coordinates={coordinates}>
      <div className={css.circle}>
        <div className={css.circleContent}>
          <span className={css.circleText}>{features.length}</span>
        </div>
      </div>
    </YMapMarker>
  )

  // Create a handler function that will update the parameters of marker on drag move
  // const onDragMoveHandler = useCallback((coordinates: LngLat) => {
  //   setMarkerTitle(createMarkerTitleFromCoords(coordinates))
  //   setMarkerCoordinates(coordinates)
  // }, [])

  // Create a handler function that will update the parameters of marker on drag move
  const onDragEndHandler = useCallback((coordinates: LngLat) => {
    setLocation(coordinates)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This is needed to get current zoom
  const onActionEnd = (event: { type: BehaviorType; location: ILocation; camera: YMapCamera }) => {
    setCurrentZoom(event?.location.zoom)
  }

  if (!location) {
    return null
  }

  return (
    <YMap location={location} showScaleInCopyrights={true}>
      {/* Add a map scheme layer */}
      <YMapDefaultSchemeLayer />
      {/* Add clusterer data sources */}
      <YMapDefaultFeaturesLayer />
      <YMapControls position='top left' orientation='vertical'>
        {/* Add the geolocation control to the map */}
        <YMapGeolocationControl />
        <YMapZoomControl />
      </YMapControls>

      {currentDeliveryTypeTab === DeliveryType.Courier && (
        <YMapMarker
          draggable
          coordinates={location?.center ?? LOCATION.center}
          onDragEnd={onDragEndHandler}
          // onDoubleClick={onDoubleClick}
        >
          <div
            className={css.markerContainer}
            // onMouseOver={() => markerMouseOver(feature.id)}
            // onMouseOut={() => markerMouseOut(feature.id)}
          >
            <div className={css.marker}>
              <UserLocation />
            </div>
          </div>
        </YMapMarker>
      )}
      <YMapListener onActionEnd={onActionEnd} />

      <YMapClusterer marker={marker} cluster={cluster} method={gridSizedMethod} features={points} />
    </YMap>
  )
})
