import { useState } from "react"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider(){
    const[images, setImages] = useState([])
    const[loading,setLoading] = useState(false)
    const[currentSlide, setCurrentSlide] = useState(0)

    async function fetchImages(url,page,limit) {
        setLoading(true)
        const response = await fetch(`${url}?page=${page}&limit=${limit}`)      //page and limit are just used to divide a large data set into smaller more manageable subset, like if an api gets reponse of 100 datasets, and limit is set to 10, and there will be 10 pages of 10 datasets each and each will load separately and per further request and not entirely, significantly reducing the loading time and the app overload
        const json = await response.json()
        setImages(json)
        console.log(images);
        setLoading(false)
    }

    function handlenext(){
        (currentSlide=== images.length-1) ? setCurrentSlide(0) : setCurrentSlide(c=>c+1)
    }
    function handlePrev(){
        (currentSlide=== 0) ? setCurrentSlide(images.length -1) : setCurrentSlide(c=>c-1)
    }

    return <div className="min-h-svh w-full bg-slate-900 flex flex-col justify-center items-center">
    <button onClick={()=>fetchImages("https://picsum.photos/v2/list",1,5)} className="bg-gray-300 rounded p-2">Fetch Image</button>

    {(loading) 
    ? <h2 className="text-3xl text-white">Loading...</h2>
    : images.map((image,index) => {
        return<img className="h-64 w-96 relative" style={{display : (currentSlide===index) ? "block" : "none"}} 
            key={index}
            src={image.download_url}
            alt="image"
             />
    })
    }
    <button style={{display : (images.length) ? "block" : "none"}} onClick={handlenext} className="absolute text-4xl bg-none right-1/3 top-50 bg-white rounded-full"><BsArrowRightCircleFill/></button>
    <button style={{display : (images.length) ? "block" : "none"}} onClick={handlePrev} className="absolute text-4xl left-1/3 top-50 bg-white rounded-full"><BsArrowLeftCircleFill/></button>

    <div className="indicators flex">
        {(images.length>0) && images.map((_,index) => {
            return <button className=" bg-black p-2 m-2 rounded-full" style={{backgroundColor : (currentSlide===index) ? "white" : "grey"}} key={index} onClick={() => setCurrentSlide(index)}></button>
        })}
    </div>
    
    </div>


    

}