import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  let a = 'HCG1102052 09/30/23'
  return (
    <div className='m-auto h-screen flex items-center justify-center'>
      <div>
        <h1>${a}</h1>
        <button onClick={() => { navigator.clipboard.writeText(a)}}>Button</button>
      </div>

    </div>

  )
}
