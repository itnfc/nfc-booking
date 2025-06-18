"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Car } from "lucide-react"
import Image from "next/image"

interface User {
  name: string
  email: string
  role: string
  department: string
}

interface Vehicle {
  id: number
  name: string
  capacity: number
  status: string
  image: string
  features: string[]
}

export default function RequestPage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    phone: "",
    dateFrom: "",
    timeFrom: "",
    dateTo: "",
    timeTo: "",
    passengers: "",
    purpose: "",
  })

  const vehicles: Vehicle[] = [
    {
      id: 1,
      name: "Toyota Hiace",
      capacity: 12,
      status: "Available",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Air Conditioning", "GPS", "First Aid Kit"],
    },
    {
      id: 2,
      name: "Honda City",
      capacity: 4,
      status: "Available",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Air Conditioning", "GPS", "Bluetooth"],
    },
    {
      id: 3,
      name: "Mitsubishi L300",
      capacity: 8,
      status: "Maintenance",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Air Conditioning", "Cargo Space"],
    },
    {
      id: 4,
      name: "Toyota Innova",
      capacity: 7,
      status: "Available",
      image: "/placeholder.svg?height=200&width=300",
      features: ["Air Conditioning", "GPS", "USB Charging"],
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.name,
        department: parsedUser.department,
      }))
    }
  }, [])

  const getRecommendedVehicles = () => {
    const passengerCount = Number.parseInt(formData.passengers) || 0
    return vehicles
      .filter((v) => v.capacity >= passengerCount && v.status === "Available")
      .sort((a, b) => a.capacity - b.capacity)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting request:", { ...formData, vehicleId: selectedVehicle })
    alert("Vehicle request submitted successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "In Use":
        return "bg-blue-100 text-blue-800"
      case "Maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const recommendedVehicles = getRecommendedVehicles()

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Request Vehicle</h1>
          <p className="text-gray-600">Submit a new vehicle booking request</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateFrom">From Date</Label>
                    <Input
                      id="dateFrom"
                      type="date"
                      value={formData.dateFrom}
                      onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeFrom">From Time</Label>
                    <Input
                      id="timeFrom"
                      type="time"
                      value={formData.timeFrom}
                      onChange={(e) => handleInputChange("timeFrom", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateTo">To Date</Label>
                    <Input
                      id="dateTo"
                      type="date"
                      value={formData.dateTo}
                      onChange={(e) => handleInputChange("dateTo", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeTo">To Time</Label>
                    <Input
                      id="timeTo"
                      type="time"
                      value={formData.timeTo}
                      onChange={(e) => handleInputChange("timeTo", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={formData.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} passenger{num > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Trip</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Describe the purpose of your trip"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange("purpose", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!selectedVehicle}>
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Vehicle Selection */}
          <div className="space-y-6">
            {/* Recommended Vehicles */}
            {formData.passengers && recommendedVehicles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recommended Vehicles
                  </CardTitle>
                  <CardDescription>
                    Based on {formData.passengers} passenger{Number.parseInt(formData.passengers) > 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendedVehicles.slice(0, 2).map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedVehicle === vehicle.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedVehicle(vehicle.id)}
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={vehicle.image || "/placeholder.svg"}
                            alt={vehicle.name}
                            width={80}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{vehicle.name}</h3>
                            <p className="text-sm text-gray-500">Capacity: {vehicle.capacity} passengers</p>
                            <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Vehicles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  All Vehicles
                </CardTitle>
                <CardDescription>Select a vehicle for your trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedVehicle === vehicle.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${vehicle.status !== "Available" ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => vehicle.status === "Available" && setSelectedVehicle(vehicle.id)}
                    >
                      <div className="flex items-start gap-4">
                        <Image
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.name}
                          width={120}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{vehicle.name}</h3>
                            <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            <Users className="inline h-4 w-4 mr-1" />
                            {vehicle.capacity} passengers
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
