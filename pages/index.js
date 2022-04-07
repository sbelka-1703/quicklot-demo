import react, { useState } from "react";

export default function Home() {
  
  const [hcgData, setHcgData] = useState('') 
  const [lotNumber, setLotNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')

  let currentLotAndExp = hcgData

  const lotNumberChangeHandler = (e) => {
    setLotNumber(e.target.value)
  }

  const expirationDateChangeHandler = (e) => {
    setExpirationDate(e.target.value)
  }

  const submitHandler = (e) => {

    const hcgData = {
      lot : lotNumber,
      exp: expirationDate
    }

    setHcgData(lotNumber + expirationDate)

    e.preventDefault();
  }


  return (

    <div className='m-auto h-screen flex items-center justify-center'>


      <div className=" flex flex-col space-y-2 ">


        {/* Current lot, expiration and a copy button */}
        <div className='flex justify-center space-x-1'>
          <h1> {currentLotAndExp} </h1>
          <div className=" flex flex-col justify-center items-center">

            <button onClick={() => { navigator.clipboard.writeText(currentLotAndExp) }}>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>


            </button>
            <span className="text-[7px]">Press to copy</span>
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
