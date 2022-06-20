import { useEffect } from "react"
import { useMap } from "../hooks/useMap"
import MapMarker from "./MapMarker"
import { PlaceType } from "./mapTypes"

interface MapMarkerControllerProps {
  places:PlaceType[]
  selectedPlaceId?: string
}

const MapMarkerController = (props:MapMarkerControllerProps) => {
  const map = useMap()

  useEffect(() => {
    if(props.places.length < 1) {
      return;
    }

    const bounds = new window.kakao.maps.LatLngBounds();
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    props.places.forEach(place => {
      bounds.extend(place.position);
    })
    
    map.setBounds(bounds)
  }, [props.places])

  return (
    <>
      {
        props.places.map((place, index) => {
          return (
            <MapMarker key={place.id} place={place} index={index}
                       showInfo={props.selectedPlaceId === place.id} />
          )
        })
      }
    </>
  )
}

export default MapMarkerController