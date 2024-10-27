import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import Main from '@/components/Dashboard/Main'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
          {children}
          </SignedOut>
          <SignedIn>
          <Main/>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}