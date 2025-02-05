'use client'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import vnData from '../geodata/diaphantinhenglish.json'
import { useState } from "react"
import './style.css'

export default function Home() {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [name, setName] = useState<string>('')
  // const [pos, setPos] = 

  const handleClick = (geo: any) => {
    console.log(geo.properties)
  }

  const handleMouseLeave = () => {
    setHoveredRegion(null)
    setName('')
  }

  return (
    <>
      <div style={{ width: '100vw', height: '100wh' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [108, 14],
            scale: 1700,
          }}
        >
          <Geographies geography={vnData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const nameProvince = geo.properties.Name
                return (
                  <>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={hoveredRegion === geo.rsmKey ? '#FF5533' : '#EAEAEC'}
                      stroke="#D6D6DA"
                      onMouseEnter={(e) => {
                        setHoveredRegion(geo.rsmKey)
                        setName(nameProvince)
                      }}
                      onMouseLeave={() => handleMouseLeave()}
                      onClick={() => handleClick(geo)}
                      tabIndex={-1}
                    />
                    <text
                      x={50}
                      y={250}
                      fill="black"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      {name}
                    </text>
                  </>
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div >
    </>
  )
}