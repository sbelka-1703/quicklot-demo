import react, { useState } from "react";

function CopyButton(props) {

  const [copyButtonPressed, setCopyButtonPressed] = useState(true);

  const UncopiedButton = () => {
    return (
      <div className=" flex flex-col justify-center items-center">

        <button onClick={onCopyButtonClickHandler} >

          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>


        </button>
        <span className="text-[7px]">Press to copy</span>
      </div>
    )
  }

  const CopiedButton = () => {
    return (
      <div className=" flex flex-col justify-center items-center">

        <button>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>


        </button>
        <span className="text-[7px]">Copied!</span>
      </div>
    )
  }




  const onCopyButtonClickHandler = () => {
    navigator.clipboard.writeText(props.currentLotAndExp)
      .then(() => {
        // Success!
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });

    setCopyButtonPressed(false)
    setTimeout(function () {
      setCopyButtonPressed(true)
    }, 1000);
  }



  return (
    <>
      {
        copyButtonPressed ?
          <UncopiedButton /> :
          <CopiedButton />
      }

    </>
  )
}

export default CopyButton