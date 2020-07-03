import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";
const { compose, withProps, withState, withHandlers } = require("recompose");

const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

const MapWithControlledZoom = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCh_uo9Ov1TgcvJAx3cG1CUWWiCsFXcLYE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withState('zoom', 'onZoomChange', 14),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onZoomChanged: ({ onZoomChange }) => () => {
                onZoomChange(refs.map.getZoom())
            }
        }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultCenter={{ lat: 54.718162, lng: 20.508678 }}
        zoom={props.zoom}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
    >
        <Marker
            position={{ lat: 54.720189, lng: 20.509106 }}
            onClick={props.onToggleOpen}
        >
            <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                    Адрес: Автобусная остановка по адресу
                    Калининград, Черняховского, 15
                </div>
            </InfoWindow>
        </Marker>
        <Marker
            position={{ lat: 54.712434, lng: 20.507978 }}
            onClick={props.onToggleOpen}
        >
            <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                    Адрес: Автобусная остановка по адресу
                    Калининград пр-т. Ленинский, 26
                </div>
            </InfoWindow>
        </Marker>
    </GoogleMap>
);
let Maps =connect()(MapWithControlledZoom);
export default Maps

