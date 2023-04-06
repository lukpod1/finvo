export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container">
            <header>
                <h1>Header</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    )
}



