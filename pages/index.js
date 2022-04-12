
import { async } from "@firebase/util";
import react, { useState, useEffect } from "react";
import CopyButton from "../components/buttons/CopyButton";
import { db } from "../firebase/initFirebase";
import { collection, doc, getDocs, addDoc } from "firebase/firestore"



export default function Home() {


  const [hcgData, setHcgData] = useState([]);
  const [lotNumber, setLotNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')


  let currentLotAndExp = 'HCG1102052 09/30/23'





  const lotNumberChangeHandler = (e) => {
    setLotNumber(e.target.value)
  }

  const expirationDateChangeHandler = (e) => {
    setExpirationDate(e.target.value)
  }

  const submitHandler = (e) => {

    console.log(lotNumber)

    dataObject.lot = lotNumber;
    dataObject.exp = expirationDate;


    e.preventDefault();
  }

  const lotCollectionRef = collection(db, "Lots")




  useEffect(() => {

    const getLot = async () => {

      const data = await getDocs(lotCollectionRef);
      setHcgData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs)


      // const querySnapshot = await getDocs(collection(db, "users"));
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      //   console.log('hi')
      // });
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


          <form onSubmit={submitHandler}>
            {/* Input fields for lot and expiration */}
            <div>

              <input onChange={lotNumberChangeHandler} className="border-2 border-black"></input>
              <input onChange={expirationDateChangeHandler} className="border-2 border-black"></input>
              {hcgData.map((hcgLot) => {
                return <div><h1>{hcgLot.lotAndExp}</h1></div>;

              })}
            </div>
            <div className="flex justify-center">

              <button className="border-2 border-red-300">Submit</button>
            </div>
          </form>
        </div>

      </div>








    </div >

  )
}
