import { useEffect, useState } from "react";

export default function ImageSlider(){
    const [imageId, setImageId] = useState(0)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState() 

    async function fetchImage(){
        setLoading(true)
        const response = await fetch("https://picsum.photos/v2/list")
        const json = await response.json()
        setData(json)
        setLoading(false)
        setImage(json[imageId]?.download_url)
    }
    
    useEffect(()=>{
        fetchImage()
    },[])

    useEffect(()=>{
        fetchImage()
    },[imageId])

    function setNextImg(){
        (imageId === 5) ? setImageId(0) :setImageId(imageId => imageId + 1)
    }
    function setPrevImg(){
        (imageId === 0) ? setImageId(5) :setImageId(imageId => imageId - 1)
    }
    
    return <div className="body h-svh w-full bg-slate-900">
        <div className="imgBox h-2/3 w-1/2 overflow-hidden rounded-3xl flex justify-center items-center text-white border border-white">
        {(loading) ? <h4>Loading...</h4> : <img className="h-full w-full object-cover" src={image} alt="" />}
        </div>
        <button className="bg-white p-1 px-3 rounded-full" onClick={()=> setNextImg()}>next</button>
        <button className="bg-white p-1 px-3 rounded-full" onClick={()=> setPrevImg()}>Previous</button>
    </div>

}