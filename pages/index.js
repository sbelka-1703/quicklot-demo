
import { async } from "@firebase/util";
import react, { useState, useEffect } from "react";
import CopyButton from "../components/buttons/CopyButton";
import { db } from "../firebase/initFirebase";
import { collection, doc, getDocs, addDoc } from "firebase/firestore"



export default function Home() {

  
  const [hcgData, setHcgData] = useState([]);
  const [newHcgData, setNewHcgData] = useState("");
  const [lotNumber, setLotNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');


  let currentLotAndExp

  (function () {
    hcgData.map((hcgLot) => {
     currentLotAndExp = hcgLot.lotAndExp;
    })
  }())



  const newHcgLotSubmitHandler = (e) => {
    setNewHcgData(e.target.value)
  }

  

  
  const lotCollectionRef = collection(db, "Lots")
  
  const addNewLot = async () => {
    await addDoc(lotCollectionRef, {lotAndExp: newHcgData});
  }



  useEffect(() => {

    const getLot = async () => {

      const data = await getDocs(lotCollectionRef);
      setHcgData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      
   
    }

    getLot();
  }, [])

  

  return (

    <div className='m-auto h-screen flex items-center justify-center bg-gray-100 '>


      <div className=" flex flex-col space-y-2 ">


        {/* Current lot, expiration and a copy button */}
        <div className='flex justify-center space-x-1'>
          <div className="flex flex-col">
            <label className="font-bold text-lg ">Current lot & expiration </label>

            {/* Main continer */}
            <div className="bg-gray-600 text-white px-2 py-3 rounded drop-shadow text-center   ">
              <h1 className="text-lg font-mono" > {currentLotAndExp} </h1>

              <CopyButton currentLotAndExp={currentLotAndExp} />

            </div>

          </div>

        </div>


        {/* Record new lot button */}


        <div className=" space-y-2">

          <div className="border-2 border-red-500 flex justify-center ">
            <button>Record New Lot</button>
          </div>


         
            {/* Input fields for lot and expiration */}
            <div>

              <input onChange={newHcgLotSubmitHandler} className="border-2 border-black"></input>
             
            </div>
            <div className="flex justify-center">

              <button onClick={addNewLot} className="border-2 border-red-300">Submit</button>
            </div>
        
        </div>

      </div>








    </div >

  )
}
