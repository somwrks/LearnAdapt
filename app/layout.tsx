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
          <SignOutButton />
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  )
}