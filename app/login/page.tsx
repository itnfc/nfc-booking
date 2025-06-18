"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate login - in real app, this would be an API call
      if (email === "admin@company.com" && password === "Password1234") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: "Admin",
            name: "Admin User",
            department: "IT",
          }),
        )
        router.push("/dashboard")
      } else if (email === "approver@company.com" && password === "Password1234") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: "Approver",
            name: "John Approver",
            department: "Management",
          }),
        )
        router.push("/dashboard")
      } else if (email === "driver@company.com" && password === "Password1234") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: "Driver",
            name: "Jane Driver",
            department: "Operations",
          }),
        )
        router.push("/dashboard")
      } else if (email === "user@company.com" && password === "Password1234") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: "User",
            name: "Bob User",
            department: "Sales",
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access the vehicle booking system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <Link href="/register" className="text-sm text-blue-600 hover:text-blue-500">
                {"Don't have an account? Register here"}
              </Link>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Admin: admin@company.com</div>
                <div>Approver: approver@company.com</div>
                <div>Driver: driver@company.com</div>
                <div>User: user@company.com</div>
                <div className="font-medium">Password: Password1234</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
