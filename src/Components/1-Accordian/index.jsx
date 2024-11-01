
import { useState } from "react"
import data from "./data"

export function Accordian(){
    const [singleSelected, setSingleSelected] = useState(null);
    const [multiSelected, setMultiSelected] = useState([]);
    const [multiSelection, setMultiselection] = useState(false);

    function handleSelection(id){
        if(multiSelection){
            setMultiSelected((selecteditems) => selecteditems.includes(id)         //check if id is already present
        ? selecteditems.filter(itemsId => itemsId !== id)               //if so filter out that id
        : [...multiSelected, id]                                        // else append that id
        )       // to toggle the visibility of answer
        }
        else{
            setSingleSelected(singleSelected === id ? null : id)
        }
    }

    function SetmultiSelection(){
        setMultiselection(!multiSelection)
    }

    return <div  className="parentContainer min-h-svh bg-slate-950 flex justify-center items-center text-white p-10">
        <div className="Accordian h-3/4 w-2/3">
            <div className="Accordian-heading bg-slate-900 h-16 mb-4 w-full border border-white font-medium rounded-xl flex justify-evenly items-center text-4xl">Accordian Heading
                <button onClick={SetmultiSelection} className="text-lg bg-slate-400 text-black p-2 rounded-xl ">{(multiSelection) ? "Disable multiSelection":"Enable multiSelection"}</button>
            </div>
            <div className="Accordian-items">{
                data.map(dataItem => {
                    return <div onClick={() => handleSelection(dataItem.id)} className="item border bg-slate-900 border-gray-300 rounded-xl p-4 m-2 text-xl font-medium">
                        <div className="question flex justify-between">
                            <div className="question w-5/6">{dataItem.question}</div>
                            <div className="add-icon ">+</div>
                        </div>
                        <div style={{display: (multiSelected.includes(dataItem.id)) || singleSelected===dataItem.id  ? "block" : "none"}} className="answer font-light text-lg">
                            {dataItem.answer}
                        </div>
                    </div>
                })
                }
            </div>

        </div>
    </div>
}