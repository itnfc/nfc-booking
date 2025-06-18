"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, Calendar, Camera, Upload, Search, Filter, User } from "lucide-react"
import Image from "next/image"

interface AppUser {
  name: string
  email: string
  role: string
  department: string
}

interface Driver {
  id: number
  name: string
  email: string
  phone: string
  avatar: string
  licenseNumber: string
  licenseType: string
  licenseExpiry: string
  licensePhoto: string
  totalTrips: number
  totalDistance: number
  evaluationScore: number
  status: "Active" | "Inactive" | "Suspended"
  joinDate: string
  violations: string[]
  recentTrips: {
    id: number
    date: string
    vehicle: string
    destination: string
    distance: number
  }[]
  gallery: {
    id: number
    type: "license" | "issue" | "condition" | "handover"
    url: string
    caption: string
    date: string
    tags: string[]
  }[]
}

export default function DriversPage() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)

  // Mock data
  const mockDrivers: Driver[] = [
    {
      id: 1,
      name: "Jane Driver",
      email: "jane.driver@company.com",
      phone: "+1234567890",
      avatar: "/placeholder.svg?height=100&width=100",
      licenseNumber: "DL-123456789",
      licenseType: "Professional",
      licenseExpiry: "2025-12-31",
      licensePhoto: "/placeholder.svg?height=200&width=300",
      totalTrips: 150,
      totalDistance: 25000.5,
      evaluationScore: 4.8,
      status: "Active",
      joinDate: "2022-03-15",
      violations: [],
      recentTrips: [
        {
          id: 1,
          date: "2024-01-15",
          vehicle: "Toyota Hiace",
          destination: "Downtown Office",
          distance: 45.2,
        },
        {
          id: 2,
          date: "2024-01-12",
          vehicle: "Honda City",
          destination: "Client Meeting",
          distance: 28.7,
        },
      ],
      gallery: [
        {
          id: 1,
          type: "license",
          url: "/placeholder.svg?height=200&width=300",
          caption: "Professional Driver License",
          date: "2024-01-01",
          tags: ["license", "professional"],
        },
        {
          id: 2,
          type: "condition",
          url: "/placeholder.svg?height=200&width=300",
          caption: "Vehicle condition before trip",
          date: "2024-01-15",
          tags: ["condition", "before"],
        },
      ],
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      email: "mike.rodriguez@company.com",
      phone: "+1234567891",
      avatar: "/placeholder.svg?height=100&width=100",
      licenseNumber: "DL-987654321",
      licenseType: "Standard",
      licenseExpiry: "2024-08-15",
      licensePhoto: "/placeholder.svg?height=200&width=300",
      totalTrips: 89,
      totalDistance: 15600.3,
      evaluationScore: 4.2,
      status: "Active",
      joinDate: "2023-01-20",
      violations: ["Speeding - Minor"],
      recentTrips: [
        {
          id: 3,
          date: "2024-01-14",
          vehicle: "Mitsubishi L300",
          destination: "Warehouse",
          distance: 32.1,
        },
      ],
      gallery: [
        {
          id: 3,
          type: "license",
          url: "/placeholder.svg?height=200&width=300",
          caption: "Standard Driver License",
          date: "2023-01-20",
          tags: ["license", "standard"],
        },
      ],
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setDrivers(mockDrivers)
    setFilteredDrivers(mockDrivers)
  }, [])

  useEffect(() => {
    let filtered = drivers

    if (searchTerm) {
      filtered = filtered.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((driver) => driver.status === statusFilter)
    }

    setFilteredDrivers(filtered)
  }, [drivers, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600"
    if (score >= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(score) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  if (user.role !== "Approver" && user.role !== "Admin") {
    return (
      <DashboardLayout userRole={user.role}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Profiles</h1>
          <p className="text-gray-600">Manage and view driver information and performance</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search drivers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Stats</label>
                <div className="text-sm text-gray-600">
                  <div>Total Drivers: {drivers.length}</div>
                  <div>Active: {drivers.filter((d) => d.status === "Active").length}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={driver.avatar || "/placeholder.svg"}
                    alt={driver.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{driver.name}</h3>
                    <p className="text-sm text-gray-500">{driver.email}</p>
                    <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* License Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">License:</span>
                    <span className="font-medium">{driver.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span>{driver.licenseType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expires:</span>
                    <span
                      className={
                        new Date(driver.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                          ? "text-red-600 font-medium"
                          : ""
                      }
                    >
                      {new Date(driver.licenseExpiry).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Trips:</span>
                    <span className="font-medium">{driver.totalTrips}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Distance:</span>
                    <span>{driver.totalDistance.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center gap-1">
                      <div className="flex">{renderStars(driver.evaluationScore)}</div>
                      <span className={`font-medium ${getScoreColor(driver.evaluationScore)}`}>
                        {driver.evaluationScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Violations */}
                {driver.violations.length > 0 && (
                  <div className="p-2 bg-red-50 rounded-md">
                    <p className="text-xs font-medium text-red-800 mb-1">Violations:</p>
                    {driver.violations.map((violation, index) => (
                      <p key={index} className="text-xs text-red-600">
                        {violation}
                      </p>
                    ))}
                  </div>
                )}

                {/* View Profile Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedDriver(driver)}>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Driver Profile</DialogTitle>
                      <DialogDescription>Detailed information and performance history</DialogDescription>
                    </DialogHeader>

                    {selectedDriver && (
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="license">License</TabsTrigger>
                          <TabsTrigger value="history">History</TabsTrigger>
                          <TabsTrigger value="gallery">Gallery</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <Image
                              src={selectedDriver.avatar || "/placeholder.svg"}
                              alt={selectedDriver.name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
                              <p className="text-gray-600">{selectedDriver.email}</p>
                              <p className="text-gray-600">{selectedDriver.phone}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={getStatusColor(selectedDriver.status)}>{selectedDriver.status}</Badge>
                                <div className="flex items-center gap-1">
                                  {renderStars(selectedDriver.evaluationScore)}
                                  <span className={`font-medium ${getScoreColor(selectedDriver.evaluationScore)}`}>
                                    {selectedDriver.evaluationScore}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Total Trips</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-2xl font-bold">{selectedDriver.totalTrips}</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Total Distance</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-2xl font-bold">{selectedDriver.totalDistance.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">kilometers</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Join Date</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-lg font-medium">
                                  {new Date(selectedDriver.joinDate).toLocaleDateString()}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>

                        <TabsContent value="license" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">License Information</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">License Number:</span>
                                  <span className="font-medium">{selectedDriver.licenseNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Type:</span>
                                  <span>{selectedDriver.licenseType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Expiry Date:</span>
                                  <span
                                    className={
                                      new Date(selectedDriver.licenseExpiry) <
                                      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                        ? "text-red-600 font-medium"
                                        : ""
                                    }
                                  >
                                    {new Date(selectedDriver.licenseExpiry).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              {selectedDriver.violations.length > 0 && (
                                <div className="p-3 bg-red-50 rounded-lg">
                                  <h4 className="font-medium text-red-800 mb-2">Violations</h4>
                                  {selectedDriver.violations.map((violation, index) => (
                                    <p key={index} className="text-sm text-red-600">
                                      {violation}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">License Photo</h3>
                              <Image
                                src={selectedDriver.licensePhoto || "/placeholder.svg"}
                                alt="Driver License"
                                width={300}
                                height={200}
                                className="rounded-lg border object-cover w-full"
                              />
                              <Button variant="outline" size="sm" className="w-full">
                                <Upload className="h-4 w-4 mr-2" />
                                Update License Photo
                              </Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="history" className="space-y-4">
                          <h3 className="text-lg font-medium">Recent Trips</h3>
                          <div className="space-y-3">
                            {selectedDriver.recentTrips.map((trip) => (
                              <div key={trip.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Calendar className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <p className="font-medium">{trip.vehicle}</p>
                                    <p className="text-sm text-gray-500">{new Date(trip.date).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{trip.destination}</p>
                                  <p className="text-sm text-gray-500">{trip.distance} km</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="gallery" className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Photo Gallery</h3>
                            <Button size="sm">
                              <Camera className="h-4 w-4 mr-2" />
                              Add Photo
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedDriver.gallery.map((photo) => (
                              <div key={photo.id} className="space-y-2">
                                <Image
                                  src={photo.url || "/placeholder.svg"}
                                  alt={photo.caption}
                                  width={200}
                                  height={150}
                                  className="rounded-lg border object-cover w-full h-32"
                                />
                                <div>
                                  <p className="text-sm font-medium">{photo.caption}</p>
                                  <p className="text-xs text-gray-500">{new Date(photo.date).toLocaleDateString()}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {photo.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No drivers found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No drivers registered in the system."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
