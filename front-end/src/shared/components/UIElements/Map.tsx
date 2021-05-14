import React, { useRef, useEffect } from "react";

import "./Map.css";

interface props {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
    className?: string;
    style?: React.CSSProperties | undefined;
}

const Map: React.FC<props> = (props) => {
    const { center, zoom } = props;
    const mapRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        let map: google.maps.Map;

        map = new window.google.maps.Map(mapRef.current as HTMLElement, {
            center,
            zoom,
        });

        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);

    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );
};

export default Map;
