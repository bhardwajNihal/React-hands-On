import { useEffect, useState } from "react"
import { LuGoal } from "react-icons/lu"

export function LoadMoreProduct(){

    const [products, setProducts] = useState([])
    const [loads, setLoads] = useState(0)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)

    async function fetchProducts(){
        try{
            setLoading(true)
            const response = await fetch(`
                https://dummyjson.com/products?
                limit=${20}&
                skip=${(loads===0) ? 0 : loads*20}`)
            const json =await response.json()
            setProducts(previousProducts => [...previousProducts,...json.products])
            console.log(products);
            setLoading(false)
        }catch(e){
            console.log("An error occured : " + e);
            
        }
    }   

    function handleFetch(){
        if(loads<=4) {                  //once 100 products are loaded
            fetchProducts();
            setLoads(loads => loads+1)
        }
        else{
            setDisabled(true)
        }
    }

    useEffect(()=>{
        fetchProducts()
        setLoads(loads => loads +1)
    },[])


    return <div className="text-center">
        <div className="products flex gap-12 flex-wrap">
        {products.map((pro) =><div className="product h-80 w-64 rounded m-2 overflow-hidden border border-gray-400">
            <div className="imgpart h-1/2 w-full bg-white object-cover flex justify-center items-center "><img className="h-full " src={pro.thumbnail} alt="" /></div>
            <div className="title text-sm font-semibold m-2 text-violet-800 mt-2">{pro.title}</div>
            <div className="description text-xs m-2 mb-4 mt-4 h-10 overflow-hidden overflow-y-auto">{pro.description}</div>
            <span className="ml-4 text-violet-800">$ {pro.price}</span>
            <span className="text-xs text-gray-600 ml-24">Rating : {pro.rating}</span>
        </div>)}
        </div>
        <p style={{display: (disabled) ? "block" : "none"}} className="text-lg font-bold mt-4" >Itna hi maal tha!!!</p>
        <button style={{backgroundColor : (disabled) ? "gray" : "purple"}} className="text-white rounded-lg px-8 py-2 m-8" onClick={handleFetch}>{(loading) ? "Loading..." : "fetch more products"}</button>
    </div>
}