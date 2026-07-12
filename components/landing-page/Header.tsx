import Link from "next/link"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center bg-muted">
      <div className="w-full max-w-5xl">
        <div className="flex items-end justify-between p-4">
          <Link href="/">
            <h1 className="text-xl font-bold">CV_BUILDER</h1>
          </Link>
          <nav className="flex gap-8">
            <Link href="/builder">Builder</Link>
            <Link href="https://github.com/Rizkyemha/cv-builder/tree/master/docs">
              Docs
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
