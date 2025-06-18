"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, CheckSquare, AlertTriangle, Calendar, TrendingUp } from "lucide-react"
import { getDashboardStats, mockBookingRequests, mockIssues } from "@/lib/mock-data"

interface User {
  name: string
  email: string
  role: string
  department: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const dashboardStats = getDashboardStats()

  const stats = [
    {
      title: "Total Vehicles",
      value: dashboardStats.totalVehicles.toString(),
      description: `${dashboardStats.availableVehicles} available now`,
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Bookings",
      value: dashboardStats.activeBookings.toString(),
      description: `${dashboardStats.pendingApprovals} pending approval`,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Approvals",
      value: dashboardStats.pendingApprovals.toString(),
      description: "Requires attention",
      icon: CheckSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Open Issues",
      value: dashboardStats.openIssues.toString(),
      description: `${mockIssues.filter((i) => i.priority === "Critical").length} critical`,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  const recentBookings = mockBookingRequests.slice(0, 5).map((booking) => ({
    id: booking.id,
    vehicle: booking.vehicle.name,
    user: booking.requester.name,
    department: booking.requester.department,
    date: booking.dateFrom,
    status: booking.status,
    purpose: booking.purpose.substring(0, 50) + "...",
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-lg">{user.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest vehicle booking requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{booking.vehicle}</p>
                        <p className="text-sm text-gray-500">
                          {booking.user} • {booking.department}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{booking.purpose}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    <p className="text-sm text-gray-500 mt-1">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
