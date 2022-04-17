
import { async } from "@firebase/util";
import react, { useState, useEffect } from "react";
import CopyButton from "../components/buttons/CopyButton";
import { db } from "../firebase/initFirebase";
import { collection, doc, getDocs, addDoc, updateDoc } from "firebase/firestore"



export default function Home() {

  //hcgData is being retrived from the database
  //newHcgData is being sent to the database (overwrites the previous data)
  const [hcgData, setHcgData] = useState([]);
  const [newHcgData, setNewHcgData] = useState("");


  let currentLotAndExp



 
  /* 
     Every time the page renders this functions runs, retrives the current lot
     from the database and sets the currentLotAndExp variable to it
     hcgData is data from the document. ".lotAndExp" is a key in the document that points to the current lot
  */
  (function changeLot() {
    hcgData.map((hcgLot) => {
      currentLotAndExp = hcgLot.lotAndExp;
    })
  }())


  //takes the data from the input fields and sets newHcgData(this data gets sent to the database and overwrites it)
  const newHcgLotSubmitHandler = (e) => {
    setNewHcgData(e.target.value)
  }



  //A refrence to the collection, where the lot it stored in the database
  const lotCollectionRef = collection(db, "Lots")

  //A refence to the doc in the collection 
  const docRef = doc(db, "Lots", "P1w0rnBI2WullBO3KQ3P"); 


  //Updates the document in the collection and sets it to the newHcgData that we got from the input 
  const updateLot = async () => {
    await updateDoc(docRef, {
      lotAndExp: newHcgData
    });
    console.log(newHcgData)
  }



  useEffect(() => {
    //
    const getLot = async () => {
      
      const data = await getDocs(lotCollectionRef);
      console.log(data.docs);
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

            <button onClick={updateLot} className="border-2 border-red-300">Submit</button>
          </div>


        </div>

      </div>


    </div >

  )
}
