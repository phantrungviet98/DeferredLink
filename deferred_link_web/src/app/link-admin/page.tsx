"use client"
import appStyles from "@/app/page.module.css";
import styles from "./page.module.css"
import {useRef} from "react";
import axios from "axios";

export default function LinkAdmin() {
  const pathRef = useRef('')
  const shortPathRef = useRef('')

  const onGenerate = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4000/deferred-link',
        {
          path: pathRef.current,
          shortPath: shortPathRef.current || undefined,
        },
      )
      alert('Created successfully!')
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className={appStyles.main}>
      <h1>Generate your link</h1>
      <p>Input your custom link</p>
      <div className={styles.row} style={{marginBottom: 16}}>
        <p>http://localhost:3000/</p>
        <input
          className={styles.customLinkInput}
          style={{height: 24, width: '98%'}}
          placeholder={'your-path?params=abc'}
          onChange={(event) => pathRef.current = event.target.value}
        />
      </div>
      <p>Input your short link (Optional)</p>
      <div className={styles.row}>
        <p>http://localhost:3000/</p>
        <input
          className={styles.customLinkInput}
          style={{height: 24, width: '98%'}}
          onChange={(event) => shortPathRef.current = event.target.value}
          placeholder={'short path'}
        />
      </div>
      <button className={styles.button} onClick={onGenerate}>Generate</button>
      <div style={{flex: 1}}/>
    </main>
  )
}