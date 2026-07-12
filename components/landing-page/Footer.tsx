import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="flex w-svw items-center justify-center bg-muted">
      <div className="flex w-full max-w-5xl justify-between px-4 py-8 xl:px-10">
        <div>
          <Link href="/">
            <h2 className="text-xl font-bold">CV_BUILDER</h2>
          </Link>
          <p className="text-base text-muted-foreground">Pokok e gratis</p>
        </div>
        <div className="text-right">
          <h2>Kontributor</h2>
          <div className="flex flex-col">
            <span className="text-base text-muted-foreground">
              Masih saya sendiri
            </span>
            {/* {Array.from({ length: 3 }).map((_, index) => (
              <span>
                Nama kontributor {index + 1} <span>kalau ada</span>{" "}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </footer>
  )
}
