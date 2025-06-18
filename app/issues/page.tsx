"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface User {
  name: string
  email: string
  role: string
  department: string
}

interface Issue {
  id: number
  vehicleId: number
  vehicleName: string
  vehicleRegistration: string
  reportedBy: string
  reportedDate: string
  description: string
  status: "Open" | "In Progress" | "Resolved"
  priority: "Low" | "Medium" | "High" | "Critical"
  images: string[]
  bookingId?: number
  resolution?: string
  resolvedDate?: string
}

export default function IssuesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showReportForm, setShowReportForm] = useState(false)
  const [newIssue, setNewIssue] = useState({
    vehicleId: '',
    description: '',
    priority: 'Medium' as const,
    images: [] as string[]
  })

  const vehicles = [
    { id: 1, name: 'Toyota Hiace', registration: 'ABC-1234' },
    { id: 2, name: 'Honda City', registration: 'XYZ-5678' },
    { id: 3, name: 'Mitsubishi L300', registration: 'DEF-9012' }
  ]

  // Mock data
  const mockIssues: Issue[] = [
    {
      id: 1,
      vehicleId: 1,
      vehicleName: 'Toyota Hiace',
      vehicleRegistration: 'ABC-1234',
      reportedBy: 'John Smith',
      reportedDate: '2024-01-15T10:30:00',
      description: 'Air conditioning not working properly. Blowing warm air instead of cold.',
      status: 'Open',
      priority: 'Medium',
      images: [
        '/placeholder.svg?height=200&width=300',
        '/placeholder.svg?height=200&width=300'
      ],
      bookingId: 123
    },
    {
      id: 2,
      vehicleId: 2,
      vehicleName: 'Honda City',
      vehicleRegistration: 'XYZ-5678',
      reportedBy: 'Sarah Johnson',
      reportedDate: '2024-01-14T14:20:00',
      description: 'Strange noise coming from the engine when accelerating. Sounds like grinding.',
      status: 'In Progress',
      priority: 'High',
      images: [
        '/placeholder.svg?height=200&width=300'
      ]
    },
    {
      id: 3,
      vehicleId: 3,
      vehicleName: 'Mitsubishi L300',
      vehicleRegistration: 'DEF-9012',
      reportedBy: 'Mike Wilson',
      reportedDate: '2024-01-12T09:15:00',
      description: 'Brake pedal feels spongy and requires more pressure than usual.',
      status: 'Resolved',
      priority: 'Critical',
      images: [
        '/placeholder.svg?height=200&width=300'
      ],
      resolution: 'Replaced brake pads and brake fluid. System tested and working properly.',
      resolvedDate: '2024-01-13T16:00:00'
    },
    {
      id: 4,
      vehicleId: 1,
      vehicleName: 'Toyota Hiace',
      vehicleRegistration: 'ABC-1234',
      reportedBy: 'Admin User',
      reportedDate: '2024-01-10T08:00:00',
      description: 'Minor scratch on the rear bumper. Cosmetic damage only.',
      status: 'Open',
      priority: 'Low',
      images: [
        '/placeholder.svg?height=200&width=300'
      ]
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setIssues(mockIssues)
    setFilteredIssues(mockIssues)
  }, [])

  useEffect(() => {
    let filtered = issues

    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.vehicleRegistration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter)
    }

    setFilteredIssues(filtered)
  }, [issues, searchTerm, statusFilter, priorityFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const selectedVehicle = vehicles.find(v => v.id === Number.parseInt(newIssue.vehicleId))
    if (!selectedVehicle) return

    const issue: Issue = {
      id: issues.length + 1,
      vehicleId: Number.parseInt(newIssue.vehicleId),
      vehicleName: selectedVehicle.name,
      vehicleRegistration: selectedVehicle.registration,
      reportedBy: user.name,
      reportedDate: new Date().toISOString(),
      description: newIssue.description,
      status: 'Open',
      priority: newIssue.priority,
      images: newIssue.images
    }

    setIssues(prev => [issue, ...prev])
    setNewIssue({
      vehicleId: '',
      description: '',
      priority: 'Medium',
      images: []
    })
    setShowReportForm(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setNewIssue(prev => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole={user.role}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issues & Reports</h1>
            <p className="text-gray-600">Report and track vehicle issues</p>
          </div>
          <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Report Vehicle Issue</DialogTitle>
                <DialogDescription>
                  Describe the problem you encountered with the vehicle
                </DialogDescription>
              </DialogHeader\
