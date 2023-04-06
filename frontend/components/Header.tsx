export default function Header({ title }: { title: string }) {
    return (
        <header className="flex justify-between items-center py-4">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl tracking-tight font-bold text-white-900">{title}</h1>
            </div>
        </header>
    )
}