import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"#111"}}>
        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
