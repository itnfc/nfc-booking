"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Car, Users, Upload, Search, Filter, Plus } from "lucide-react"
import Image from "next/image"
import { mockVehicles } from "@/lib/mock-data"

interface User {
  name: string
  email: string
  role: string
  department: string
}

interface Vehicle {
  id: number
  name: string
  registration: string
  capacity: number
  status: "Available" | "In Use" | "Maintenance" | "Inactive"
  images: {
    exterior: string[]
    interior: string[]
    documents: string[]
  }
  specifications: {
    make: string
    model: string
    year: number
    fuelType: string
    transmission: string
    mileage: number
  }
  maintenanceLog: {
    id: number
    date: string
    type: string
    description: string
    cost: number
    beforePhoto?: string
    afterPhoto?: string
  }[]
  currentBooking?: {
    user: string
    startDate: string
    endDate: string
    purpose: string
  }
}

export default function VehiclesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // Mock data
  const mockVehiclesData = mockVehicles

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setVehicles(mockVehiclesData)
    setFilteredVehicles(mockVehiclesData)
  }, [])

  useEffect(() => {
    let filtered = vehicles

    if (searchTerm) {
      filtered = filtered.filter(
        (vehicle) =>
          vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.specifications.make.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((vehicle) => vehicle.status === statusFilter)
    }

    setFilteredVehicles(filtered)
  }, [vehicles, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "In Use":
        return "bg-blue-100 text-blue-800"
      case "Maintenance":
        return "bg-red-100 text-red-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
            <p className="text-gray-600">Manage fleet vehicles and maintenance records</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search vehicles..."
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
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fleet Stats</label>
                <div className="text-sm text-gray-600">
                  <div>Total: {vehicles.length}</div>
                  <div>Available: {vehicles.filter((v) => v.status === "Available").length}</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Capacity Range</label>
                <div className="text-sm text-gray-600">
                  <div>Small (1-4): {vehicles.filter((v) => v.capacity <= 4).length}</div>
                  <div>Large (5+): {vehicles.filter((v) => v.capacity > 4).length}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={vehicle.images.exterior[0] || "/placeholder.svg"}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">{vehicle.name}</h3>
                  <p className="text-sm text-gray-500">{vehicle.registration}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{vehicle.capacity} seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-400" />
                    <span>{vehicle.specifications.year}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Make/Model:</span>
                    <span>
                      {vehicle.specifications.make} {vehicle.specifications.model}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mileage:</span>
                    <span>{vehicle.specifications.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fuel:</span>
                    <span>{vehicle.specifications.fuelType}</span>
                  </div>
                </div>

                {vehicle.currentBooking && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Current Booking</p>
                    <p className="text-xs text-blue-600">{vehicle.currentBooking.user}</p>
                    <p className="text-xs text-blue-600">{vehicle.currentBooking.purpose}</p>
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedVehicle(vehicle)}>
                      <Car className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Vehicle Details</DialogTitle>
                      <DialogDescription>Complete information and maintenance history</DialogDescription>
                    </DialogHeader>

                    {selectedVehicle && (
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="gallery">Gallery</TabsTrigger>
                          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                          <TabsTrigger value="documents">Documents</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="aspect-video relative rounded-lg overflow-hidden">
                                <Image
                                  src={selectedVehicle.images.exterior[0] || "/placeholder.svg"}
                                  alt={selectedVehicle.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold">{selectedVehicle.name}</h3>
                                <Badge className={getStatusColor(selectedVehicle.status)}>
                                  {selectedVehicle.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-medium">Vehicle Information</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Registration:</span>
                                  <span className="font-medium">{selectedVehicle.registration}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Make/Model:</span>
                                  <span>
                                    {selectedVehicle.specifications.make} {selectedVehicle.specifications.model}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Year:</span>
                                  <span>{selectedVehicle.specifications.year}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Capacity:</span>
                                  <span>{selectedVehicle.capacity} passengers</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Fuel Type:</span>
                                  <span>{selectedVehicle.specifications.fuelType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Transmission:</span>
                                  <span>{selectedVehicle.specifications.transmission}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Mileage:</span>
                                  <span>{selectedVehicle.specifications.mileage.toLocaleString()} km</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {selectedVehicle.currentBooking && (
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2">Current Booking</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-blue-600">User:</span>
                                  <p className="font-medium">{selectedVehicle.currentBooking.user}</p>
                                </div>
                                <div>
                                  <span className="text-blue-600">Period:</span>
                                  <p className="font-medium">
                                    {new Date(selectedVehicle.currentBooking.startDate).toLocaleDateString()} -
                                    {new Date(selectedVehicle.currentBooking.endDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-blue-600">Purpose:</span>
                                  <p className="font-medium">{selectedVehicle.currentBooking.purpose}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="gallery" className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Vehicle Gallery</h3>
                            <Button size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photos
                            </Button>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h4 className="font-medium mb-3">Exterior Photos</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedVehicle.images.exterior.map((image, index) => (
                                  <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                                    <Image
                                      src={image || "/placeholder.svg"}
                                      alt={`Exterior ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Interior Photos</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedVehicle.images.interior.map((image, index) => (
                                  <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                                    <Image
                                      src={image || "/placeholder.svg"}
                                      alt={`Interior ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="maintenance" className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Maintenance Log</h3>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Record
                            </Button>
                          </div>

                          <div className="space-y-4">
                            {selectedVehicle.maintenanceLog.map((record) => (
                              <Card key={record.id}>
                                <CardHeader className="pb-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle className="text-base">{record.type}</CardTitle>
                                      <CardDescription>{new Date(record.date).toLocaleDateString()}</CardDescription>
                                    </div>
                                    <Badge variant="outline">${record.cost}</Badge>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600 mb-4">{record.description}</p>

                                  {(record.beforePhoto || record.afterPhoto) && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {record.beforePhoto && (
                                        <div>
                                          <p className="text-sm font-medium mb-2">Before</p>
                                          <Image
                                            src={record.beforePhoto || "/placeholder.svg"}
                                            alt="Before maintenance"
                                            width={200}
                                            height={150}
                                            className="rounded-lg object-cover w-full h-32"
                                          />
                                        </div>
                                      )}
                                      {record.afterPhoto && (
                                        <div>
                                          <p className="text-sm font-medium mb-2">After</p>
                                          <Image
                                            src={record.afterPhoto || "/placeholder.svg"}
                                            alt="After maintenance"
                                            width={200}
                                            height={150}
                                            className="rounded-lg object-cover w-full h-32"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="documents" className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Vehicle Documents</h3>
                            <Button size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Document
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedVehicle.images.documents.map((document, index) => (
                              <div key={index} className="space-y-2">
                                <Image
                                  src={document || "/placeholder.svg"}
                                  alt={`Document ${index + 1}`}
                                  width={300}
                                  height={200}
                                  className="rounded-lg border object-cover w-full h-48"
                                />
                                <p className="text-sm font-medium">Registration Document {index + 1}</p>
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

        {filteredVehicles.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No vehicles registered in the fleet."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
