import { Thick } from "../icons/Icons"
import styles from "./Reset.module.css"

type Props = {
  state: string
}

export default function ResetFlash(props: Props) {
  const { state } = props
  const flashStyle = state == 'resetting' ? styles.flash : `${styles.flash} ${styles.closed}`
  return (
    <div role="alert" className={`${flashStyle} bg-green-600 flex items-center space-x-2 h-10 px-3 py-3 text-white text-sm rounded-md shadow-md absolute top-[-3rem] right-[-3rem]`}>
      <Thick/>
      <span>Data telah direset ulang</span>
    </div>
  )
}