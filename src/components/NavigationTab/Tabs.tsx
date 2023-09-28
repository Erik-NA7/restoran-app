export default function Tabs({children,}: {children: React.ReactNode}) {
  return (
    <div role="tablist" aria-orientation="horizontal" className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground" tabIndex={0} data-orientation="horizontal" style={{ outline: "none" }}>
      { children }
    </div>
  )
}