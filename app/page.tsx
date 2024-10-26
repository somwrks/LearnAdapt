'use client'
import Landing from "@/components/Landing";
import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [nextMessage, setNextMessage] = useState('');
  const [flaskMessage, setFlaskMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const nextResponse = await fetch('/api/hello');
        const nextData = await nextResponse.json();
        setNextMessage(nextData); // Access the message property

        const flaskResponse = await fetch('/api/python/hello');
        const flaskData = await flaskResponse.json();
        setFlaskMessage(flaskData.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Next.js with Clerk, MongoDB, and Flask</h1>
      {isSignedIn ? (
        <Landing/>
      ) : (
        <SignIn />
      )}
      <div>
        <h2>Messages:</h2>
        <p>Message from Next.js: {nextMessage}</p>
        <p>Message from Flask: {flaskMessage}</p>
      </div>
    </main>
  );
}