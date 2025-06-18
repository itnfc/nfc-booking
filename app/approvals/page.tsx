"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckSquare, X, Check, Calendar, Users, Clock, Search, Filter } from "lucide-react"
import Image from "next/image"

interface User {
  name: string
  email: string
  role: string
  department: string
}

interface BookingRequest {
  id: number
  requester: {
    name: string
    department: string
    email: string
    avatar: string
  }
  vehicle: {
    name: string
    image: string
    capacity: number
  }
  dateFrom: string
  dateTo: string
  timeFrom: string
  timeTo: string
  passengers: number
  purpose: string
  status: "Pending" | "Approved" | "Rejected"
  submittedAt: string
  phone: string
}

export default function ApprovalsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [requests, setRequests] = useState<BookingRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<BookingRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null)
  const [comment, setComment] = useState("")

  // Mock data
  const mockRequests: BookingRequest[] = [
    {
      id: 1,
      requester: {
        name: "John Smith",
        department: "Sales",
        email: "john.smith@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      vehicle: {
        name: "Toyota Hiace",
        image: "/placeholder.svg?height=100&width=150",
        capacity: 12,
      },
      dateFrom: "2024-01-20",
      dateTo: "2024-01-20",
      timeFrom: "09:00",
      timeTo: "17:00",
      passengers: 8,
      purpose: "Client presentation and site visit to showcase our new products",
      status: "Pending",
      submittedAt: "2024-01-15T10:30:00",
      phone: "+1234567890",
    },
    {
      id: 2,
      requester: {
        name: "Sarah Johnson",
        department: "Marketing",
        email: "sarah.johnson@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      vehicle: {
        name: "Honda City",
        image: "/placeholder.svg?height=100&width=150",
        capacity: 4,
      },
      dateFrom: "2024-01-22",
      dateTo: "2024-01-22",
      timeFrom: "14:00",
      timeTo: "18:00",
      passengers: 2,
      purpose: "Meeting with advertising agency for new campaign",
      status: "Pending",
      submittedAt: "2024-01-16T14:20:00",
      phone: "+1234567891",
    },
    {
      id: 3,
      requester: {
        name: "Mike Wilson",
        department: "Operations",
        email: "mike.wilson@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      vehicle: {
        name: "Mitsubishi L300",
        image: "/placeholder.svg?height=100&width=150",
        capacity: 8,
      },
      dateFrom: "2024-01-25",
      dateTo: "2024-01-25",
      timeFrom: "08:00",
      timeTo: "16:00",
      passengers: 4,
      purpose: "Equipment delivery to branch office",
      status: "Approved",
      submittedAt: "2024-01-14T09:15:00",
      phone: "+1234567892",
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setRequests(mockRequests)
    setFilteredRequests(mockRequests)
  }, [])

  useEffect(() => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.requester.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((request) => request.requester.department === departmentFilter)
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, statusFilter, departmentFilter])

  const handleApproval = (requestId: number, approved: boolean) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: approved ? "Approved" : ("Rejected" as const) } : request,
      ),
    )
    setSelectedRequest(null)
    setComment("")
  }

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeStr: string) => {
    return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
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

  const departments = [...new Set(requests.map((r) => r.requester.department))]

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approval Dashboard</h1>
          <p className="text-gray-600">Review and approve vehicle booking requests</p>
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
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Stats</label>
                <div className="text-sm text-gray-600">
                  <div>Total: {requests.length}</div>
                  <div>Pending: {requests.filter((r) => r.status === "Pending").length}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={request.requester.avatar || "/placeholder.svg"}
                      alt={request.requester.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{request.requester.name}</p>
                      <p className="text-sm text-gray-500">{request.requester.department}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Vehicle Info */}
                <div className="flex items-center gap-3">
                  <Image
                    src={request.vehicle.image || "/placeholder.svg"}
                    alt={request.vehicle.name}
                    width={60}
                    height={40}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{request.vehicle.name}</p>
                    <p className="text-sm text-gray-500">
                      <Users className="inline h-3 w-3 mr-1" />
                      {request.passengers}/{request.vehicle.capacity} passengers
                    </p>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(request.dateFrom)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                      {formatTime(request.timeFrom)} - {formatTime(request.timeTo)}
                    </span>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Purpose:</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{request.purpose}</p>
                </div>

                {/* Actions */}
                {request.status === "Pending" && (
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <CheckSquare className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Booking Request</DialogTitle>
                          <DialogDescription>Review the details and approve or reject this request</DialogDescription>
                        </DialogHeader>

                        {selectedRequest && (
                          <div className="space-y-4">
                            {/* Requester Info */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <Image
                                src={selectedRequest.requester.avatar || "/placeholder.svg"}
                                alt={selectedRequest.requester.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                              <div>
                                <p className="font-medium">{selectedRequest.requester.name}</p>
                                <p className="text-sm text-gray-500">{selectedRequest.requester.department}</p>
                                <p className="text-sm text-gray-500">{selectedRequest.requester.email}</p>
                                <p className="text-sm text-gray-500">{selectedRequest.phone}</p>
                              </div>
                            </div>

                            {/* Vehicle and Trip Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <h4 className="font-medium">Vehicle Details</h4>
                                <div className="flex items-center gap-3">
                                  <Image
                                    src={selectedRequest.vehicle.image || "/placeholder.svg"}
                                    alt={selectedRequest.vehicle.name}
                                    width={80}
                                    height={60}
                                    className="rounded-md object-cover"
                                  />
                                  <div>
                                    <p className="font-medium">{selectedRequest.vehicle.name}</p>
                                    <p className="text-sm text-gray-500">
                                      Capacity: {selectedRequest.vehicle.capacity} passengers
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <h4 className="font-medium">Trip Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>{formatDate(selectedRequest.dateFrom)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>
                                      {formatTime(selectedRequest.timeFrom)} - {formatTime(selectedRequest.timeTo)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <span>{selectedRequest.passengers} passengers</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Purpose */}
                            <div>
                              <h4 className="font-medium mb-2">Purpose of Trip</h4>
                              <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                {selectedRequest.purpose}
                              </p>
                            </div>

                            {/* Comment */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Approval Comment (Optional)</label>
                              <Textarea
                                placeholder="Add a comment for your decision..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <DialogFooter className="gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedRequest(null)
                              setComment("")
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => selectedRequest && handleApproval(selectedRequest.id, false)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button onClick={() => selectedRequest && handleApproval(selectedRequest.id, true)}>
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {/* Submitted time */}
                <div className="text-xs text-gray-400 pt-2 border-t">
                  Submitted: {new Date(request.submittedAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all" || departmentFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "No vehicle booking requests to review at this time."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
