import {useEffect, useState} from "react";
import {getMobileOperatingSystem} from "@/utils";
import styles from "@/app/page.module.css";
import axios from "axios";

export default function HomeComponent() {
  const path = window.location.pathname.replace('/deferred-link/', '')
  const [linkInfo, setLinkInfo] = useState(null)

  const getDeferredLink = async () => {
    try {
      const info = await axios.get(`http://localhost:4000/deferred-link?path=${path}`)
      return info.data
    } catch (e) {
    }
  }

  const tryToOpenApp = async () => {
    const info = await getDeferredLink()
    setLinkInfo(info)
    window.location = `exp://192.168.1.8:8081/--/${info.path}`
  }

  useEffect(() => {
    tryToOpenApp()
  }, []);

  const os = getMobileOperatingSystem(navigator, window)

  return (
    <main className={styles.main}>
      <h1>Build your own deferred links</h1>
      {['android', 'ios'].includes(os) && (
        <div style={{flex: 1}}>
          <a className={styles.link}
             onClick={() => {
               navigator.clipboard.writeText(`deferred-link-code=${linkInfo.code}`)
             }}
             href={
               os === 'ios' ?
                 'https://apps.apple.com/vn/app/medium-read-write-stories/id828256236':
                 `https://play.google.com/store/apps/details?id=com.medium.reader?referrer=${linkInfo.code}`
             }
          >
            Download
          </a>
        </div>
      )}
    </main>
  );
}