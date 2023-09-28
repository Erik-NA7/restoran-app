import { Thick } from "./icons/Icons"

type Props = {
  checked: boolean
}

export default function CheckBox(props: Props) {
  const { checked } = props
  return (
    <div className="w-[20px] h-auto items-center">
      { checked &&
        <Thick/>
      }
    </div>
  )
}