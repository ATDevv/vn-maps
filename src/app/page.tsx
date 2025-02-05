'use client'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import vnData from '../geodata/diaphantinhenglish.json'
import { useState } from "react"
import './style.css'

interface IPos {
  x: number,
  y: number
}

export default function Home() {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [name, setName] = useState<string>('')
  const [pos, setPos] = useState<IPos>({ x: 0, y: 0 }) 

  const handleClick = (geo: any, e: any) => {
    console.log(geo.properties)
    console.log('x :', e.clientX, ' ', 'y :',e.clientY);
  }

  const handleMouseLeave = () => {
    setHoveredRegion(null)
    setName('')
    setPos({x:0, y: 0})
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
                        setPos({x: e.clientX, y: e.clientY})
                      }}
                      onMouseLeave={() => handleMouseLeave()}
                      onClick={(e) => handleClick(geo, e)}
                      tabIndex={-1}
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 40}
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