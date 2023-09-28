import Link from "next/link"

type Props = {
  url: string,
  path: string
}

export default function Tab(props: Props) {
  const { url, path } = props
  const active = path == `/${url}` ? 'bg-background text-foreground shadow-sm' : ''

  return (
    <Link href={url} shallow>
      <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${active} min-w-[100px] capitalize`} tabIndex={0}>{url}
      </button>
    </Link>
  )
}