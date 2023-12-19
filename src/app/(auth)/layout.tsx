export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex-center w-full bg-primary-50 
      bg-dotted-pattern bg-cover bg-center bg-fixed min-h-screen">
       {children}
      </div>
    )
  }
  