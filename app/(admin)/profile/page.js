"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { data: session } = useSession();
  
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">User Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Name:</strong> {session?.user?.name}</p>
            <p><strong>Username:</strong> {session?.user?.username}</p>
            <p><strong>Employee ID:</strong> {session?.user?.employeeId}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}