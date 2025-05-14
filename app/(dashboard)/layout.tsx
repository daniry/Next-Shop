export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className={` antialiased`}>
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
