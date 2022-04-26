

import react, { useState, useEffect, useRef } from "react";

import CopyButton from "../components/buttons/CopyButton";
import { db } from "../firebase/initFirebase";
import { collection, doc, getDocs, addDoc, updateDoc } from "firebase/firestore"

export default function Home(props) {

  //hcgData is being retrived from the database
  //newHcgData is being sent to the database (overwrites the previous data)
  const [hcgData, setHcgData] = useState([]);
  const [newHcgData, setNewHcgData] = useState("");
  const [openInput, setOpenInput] = useState(false)

  let currentLotAndExp
  const ref = useRef(null);
  const inputRef = useRef();
  const { onClickOutside } = props;

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

  const handleDoubleClick = (e) => {
    switch (e.detail) {
      case 1:
        break;
      case 2:
        setOpenInput(true)
        console.log(inputRef.current); 
        break;
      default:
        return;
    }
  };

  //A refrence to the collection, where the lot it stored in the database
  const lotCollectionRef = collection(db, "Lots")

  //A refence to the doc in the collection 
  const docRef = doc(db, "Lots", "P1w0rnBI2WullBO3KQ3P");

  //Updates the document in the collection and sets it to the newHcgData that we got from the input 
  const updateLot = async () => {
    if(newHcgData !== ""){

      await updateDoc(docRef, {
        lotAndExp: newHcgData
      });
  
      window.location.reload(false);
    }

    else{
      return
    }
  }

  useEffect(() => {
    //Retireves the data every time the page reloads 
    const getLot = async () => {

      const data = await getDocs(lotCollectionRef);
      console.log(data.docs);
      setHcgData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      document.title = "HCG Lot App"
    }
    getLot();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {

        setOpenInput(false)
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  //Puts the cursor on the input field when double click occurs  
  useEffect(() => {
    if (openInput === true) {
   inputRef.current.focus();
    }
     
  }, [openInput])
  

  return (
    <div className='m-auto h-screen flex items-center justify-center bg-gray-100 '>
      <div className=" flex flex-col space-y-2 ">
        {/* Current lot, expiration and a copy button */}
        <div className='flex justify-center space-x-1'>
          <div className="flex flex-col">
            <label className="font-bold text-lg ">Current lot & expiration </label>
            {/* Main continer */}
            <div className="bg-gray-600 text-white px-2 py-3 rounded drop-shadow text-center   ">
              {
                openInput ? (
                  <>
                    <div className="space-y-2" ref={ref}>
                      <div>
                        {/* Input field that renders conditinaly based on a double click */}
                        <input placeholder="Enter New Lot Here" ref={inputRef} className=" appearance-none focus:outline-none border border-white text-black rounded" onChange={newHcgLotSubmitHandler} ></input>
                      </div>
                      <div className="flex justify-center">
                        <button onClick={updateLot} className=" bg-teal-500 hover:bg-teal-400 text-xs py-1 px-2 mb-1 rounded-2xl"> Record New Lot</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <button onClick={handleDoubleClick} className="text-lg font-mono cursor-default" > {currentLotAndExp} </button>
                )
              }
              <CopyButton currentLotAndExp={currentLotAndExp} />
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}
