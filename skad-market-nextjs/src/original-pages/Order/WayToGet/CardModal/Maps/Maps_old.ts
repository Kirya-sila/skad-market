// import React, { useEffect, useRef, useState } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
// import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

// import { YMapLocationRequest } from '@yandex/ymaps3-types';

// const API_KEY = 'apikey';

// const center = [47.2313, 39.7233];

// const images = [...Array(5)].map((n, i) => {
// const letter = String.fromCharCode(i + 97);
// return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
// });

// export const Maps = (props: any) => {
// const [currentLocation, setCurrentLocation] = useState<any>();

// const getCurrentGeolocation = () => {
// return new Promise((resolve, reject) => {
// if (navigator.geolocation) {
// navigator.geolocation.getCurrentPosition(
// (position) => {
// const lat = position.coords.latitude;
// const lon = position.coords.longitude;

// resolve([lat, lon]);
// // setCurrentLocation({ lat, lon });
// // return [lat, lon];
// },
// (error) => {
// console.error(`Error ${error} occured`);
// resolve([null, null]);
// // setCurrentLocation({ lat: null, lon: null });
// // return [null, null];
// },
// { enableHighAccuracy: true },
// );
// } else {
// console.warn('Разрешение не получено');
// resolve([null, null]);
// // setCurrentLocation({ lat: null, lon: null });
// // return [null, null];
// }
// });
// };

// useEffect(() => {
// const getUserPosition = async () => {
// const userPosition = await getCurrentGeolocation();
// setCurrentLocation(userPosition);
// };
// getUserPosition();
// }, []);

// // const aaa = await getCurrentGeolocation();
// const placemarkRef: any = useRef();
// const mapRef: any = useRef();
// const ymapsRef = useRef<YMapsApi>();

// const [newCoords, setNewCoords] = useState([47.06587193746529, 39.435380396518724]);

// const [address, setAddress] = useState('');
// const [value, setValue] = useState('');
// const [options, setOptions] = useState([]);

// import React, { useEffect, useRef, useState } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
// import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

// import { YMapLocationRequest } from '@yandex/ymaps3-types';

// const API_KEY = 'apikey';

// const center = [47.2313, 39.7233];

// const images = [...Array(5)].map((n, i) => {
// const letter = String.fromCharCode(i + 97);
// return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
// });

// export const Maps = (props: any) => {
// const [currentLocation, setCurrentLocation] = useState<any>();

// const getCurrentGeolocation = () => {
// return new Promise((resolve, reject) => {
// if (navigator.geolocation) {
// navigator.geolocation.getCurrentPosition(
// (position) => {
// const lat = position.coords.latitude;
// const lon = position.coords.longitude;

// resolve([lat, lon]);
// // setCurrentLocation({ lat, lon });
// // return [lat, lon];
// },
// (error) => {
// console.error(`Error ${error} occured`);
// resolve([null, null]);
// // setCurrentLocation({ lat: null, lon: null });
// // return [null, null];
// },
// { enableHighAccuracy: true },
// );
// } else {
// console.warn('Разрешение не получено');
// resolve([null, null]);
// // setCurrentLocation({ lat: null, lon: null });
// // return [null, null];
// }
// });
// };

// useEffect(() => {
// const getUserPosition = async () => {
// const userPosition = await getCurrentGeolocation();
// setCurrentLocation(userPosition);
// };
// getUserPosition();
// }, []);

// // const aaa = await getCurrentGeolocation();
// const placemarkRef: any = useRef();
// const mapRef: any = useRef();
// const ymapsRef = useRef<YMapsApi>();

// const [newCoords, setNewCoords] = useState([47.06587193746529, 39.435380396518724]);

// const [address, setAddress] = useState('');
// const [value, setValue] = useState('');
// const [options, setOptions] = useState([]);

// export function loadMapScript() {
// return new Promise((resolve, reject) => {
// const script = document.createElement('script');
// script.src =
// 'https://api-maps.yandex.ru/v3/?apikey=&lang=en_US';
// script.onload = resolve;
// script.onerror = reject;
// document.head.appendChild(script);
// });
// }

// const LOCATION: YMapLocationRequest = {
// center: [37.588144, 55.733842],
// zoom: 9,
// };

// async function main() {
// // Function for create a map component after initializing the JS Map API
// const createMapComponent = async () => {
// // For each object in the JS API, there is a React counterpart
// // To use the React version of the API, include the module @yandex/ymaps3-reactify
// const [ymaps3React] = await Promise.all([
// ymaps3.import('@yandex/ymaps3-reactify'),
// ymaps3.ready,
// ]);
// const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
// const { YMap, YMapDefaultSchemeLayer } = reactify.module(ymaps3);

// // Return a functional React component representing the map
// return () => {
// return (
// // Initialize the map and pass initialization parameters
// <YMap
// location={LOCATION}
// showScaleInCopyrights={true}
// // ref={React.useCallback((x) => (map = x), [])}
// >
// {/* Add a map scheme layer */}
// <YMapDefaultSchemeLayer />
// </YMap>
// );
// };
// };
// }
// main();

// export const Maps = () => {
// return createMapComponent();
// };