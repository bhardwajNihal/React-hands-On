import { useState } from "react"


export function RandomColor(){

    const [bgColor , setBgColor] = useState("black")

    function generateRandomRGB(){
        let colorRange1 = Math.floor(Math.random() * 255)
        let colorRange2 = Math.floor(Math.random() * 255)
        let colorRange3 = Math.floor(Math.random() * 255)

        let rgbColorString = `rgb(${colorRange1},${colorRange2},${colorRange3})`
        setBgColor(rgbColorString)
    }


    return <div style={{backgroundColor : bgColor }} className="h-svh w-full">
        <button className="border border-black bg-white p-2" onClick={()=>generateRandomRGB()}>Generate Random Rgb color</button>
    </div>
}