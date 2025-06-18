// Comprehensive mock data for the vehicle booking system

export interface User {
  id: number
  name: string
  email: string
  role: "User" | "Approver" | "Driver" | "Admin"
  department: string
  profilePhoto: string
  status: "Active" | "Inactive"
  phone: string
  joinDate: string
}

export interface Vehicle {
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
    color: string
    engineSize: string
  }
  features: string[]
  maintenanceLog: MaintenanceRecord[]
  currentBooking?: {
    user: string
    startDate: string
    endDate: string
    purpose: string
  }
  lastService: string
  nextService: string
  insuranceExpiry: string
}

export interface MaintenanceRecord {
  id: number
  date: string
  type: string
  description: string
  cost: number
  beforePhoto?: string
  afterPhoto?: string
  mechanic: string
  status: "Completed" | "Pending" | "In Progress"
}

export interface BookingRequest {
  id: number
  requester: {
    id: number
    name: string
    department: string
    email: string
    avatar: string
    phone: string
  }
  vehicle: {
    id: number
    name: string
    image: string
    capacity: number
    registration: string
  }
  dateFrom: string
  dateTo: string
  timeFrom: string
  timeTo: string
  passengers: number
  purpose: string
  status: "Pending" | "Approved" | "Rejected" | "Completed" | "Cancelled"
  submittedAt: string
  approver?: {
    name: string
    comment: string
    approvedAt: string
  }
  priority: "Low" | "Medium" | "High" | "Urgent"
  estimatedDistance: number
  destination: string
}

export interface Driver {
  id: number
  userId: number
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
  certifications: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  recentTrips: {
    id: number
    date: string
    vehicle: string
    destination: string
    distance: number
    rating: number
    feedback?: string
  }[]
  gallery: {
    id: number
    type: "license" | "issue" | "condition" | "handover" | "training"
    url: string
    caption: string
    date: string
    tags: string[]
  }[]
}

export interface Issue {
  id: number
  vehicleId: number
  vehicleName: string
  vehicleRegistration: string
  reportedBy: string
  reportedDate: string
  description: string
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  priority: "Low" | "Medium" | "High" | "Critical"
  category: "Mechanical" | "Electrical" | "Cosmetic" | "Safety" | "Comfort"
  images: string[]
  bookingId?: number
  resolution?: string
  resolvedDate?: string
  assignedTo?: string
  estimatedCost?: number
  actualCost?: number
  location: string
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@company.com",
    role: "Admin",
    department: "IT",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567800",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "John Approver",
    email: "approver@company.com",
    role: "Approver",
    department: "Management",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567801",
    joinDate: "2020-03-20",
  },
  {
    id: 3,
    name: "Jane Driver",
    email: "driver@company.com",
    role: "Driver",
    department: "Operations",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567802",
    joinDate: "2022-03-15",
  },
  {
    id: 4,
    name: "Bob User",
    email: "user@company.com",
    role: "User",
    department: "Sales",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567803",
    joinDate: "2021-06-10",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "User",
    department: "Marketing",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567804",
    joinDate: "2021-08-22",
  },
  {
    id: 6,
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    role: "User",
    department: "Operations",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567805",
    joinDate: "2020-11-05",
  },
  {
    id: 7,
    name: "Lisa Chen",
    email: "lisa.chen@company.com",
    role: "Approver",
    department: "Finance",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567806",
    joinDate: "2019-04-12",
  },
  {
    id: 8,
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    role: "Driver",
    department: "Operations",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567807",
    joinDate: "2023-01-20",
  },
  {
    id: 9,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "User",
    department: "HR",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567808",
    joinDate: "2022-07-18",
  },
  {
    id: 10,
    name: "Tom Anderson",
    email: "tom.anderson@company.com",
    role: "User",
    department: "Sales",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567809",
    joinDate: "2021-12-03",
  },
  {
    id: 11,
    name: "Rachel Green",
    email: "rachel.green@company.com",
    role: "User",
    department: "Marketing",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567810",
    joinDate: "2022-02-14",
  },
  {
    id: 12,
    name: "James Brown",
    email: "james.brown@company.com",
    role: "Driver",
    department: "Operations",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567811",
    joinDate: "2021-09-30",
  },
  {
    id: 13,
    name: "Anna Martinez",
    email: "anna.martinez@company.com",
    role: "User",
    department: "Finance",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567812",
    joinDate: "2023-03-08",
  },
  {
    id: 14,
    name: "Kevin Lee",
    email: "kevin.lee@company.com",
    role: "User",
    department: "IT",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567813",
    joinDate: "2020-10-25",
  },
  {
    id: 15,
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    role: "User",
    department: "HR",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    status: "Active",
    phone: "+1234567814",
    joinDate: "2022-05-16",
  },
]

// Mock Vehicles Data
export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Hiace",
    registration: "ABC-1234",
    capacity: 12,
    status: "Available",
    images: {
      exterior: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
      interior: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      documents: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    },
    specifications: {
      make: "Toyota",
      model: "Hiace",
      year: 2020,
      fuelType: "Diesel",
      transmission: "Manual",
      mileage: 45000,
      color: "White",
      engineSize: "2.8L",
    },
    features: ["Air Conditioning", "GPS Navigation", "First Aid Kit", "Fire Extinguisher", "USB Charging Ports"],
    maintenanceLog: [
      {
        id: 1,
        date: "2024-01-10",
        type: "Regular Service",
        description: "Oil change, filter replacement, general inspection",
        cost: 150,
        beforePhoto: "/placeholder.svg?height=150&width=200",
        afterPhoto: "/placeholder.svg?height=150&width=200",
        mechanic: "John Mechanic",
        status: "Completed",
      },
      {
        id: 2,
        date: "2023-12-15",
        type: "Tire Replacement",
        description: "Replaced all four tires due to wear",
        cost: 400,
        mechanic: "Mike Service",
        status: "Completed",
      },
    ],
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    insuranceExpiry: "2024-12-31",
  },
  {
    id: 2,
    name: "Honda City",
    registration: "XYZ-5678",
    capacity: 4,
    status: "In Use",
    images: {
      exterior: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      interior: ["/placeholder.svg?height=200&width=300"],
      documents: ["/placeholder.svg?height=200&width=300"],
    },
    specifications: {
      make: "Honda",
      model: "City",
      year: 2019,
      fuelType: "Gasoline",
      transmission: "Automatic",
      mileage: 32000,
      color: "Silver",
      engineSize: "1.5L",
    },
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth", "Backup Camera"],
    maintenanceLog: [
      {
        id: 3,
        date: "2024-01-05",
        type: "Brake Service",
        description: "Brake pad replacement and brake fluid change",
        cost: 200,
        mechanic: "Sarah Brake Specialist",
        status: "Completed",
      },
    ],
    currentBooking: {
      user: "John Smith",
      startDate: "2024-01-15",
      endDate: "2024-01-15",
      purpose: "Client meeting",
    },
    lastService: "2024-01-05",
    nextService: "2024-04-05",
    insuranceExpiry: "2024-11-30",
  },
  {
    id: 3,
    name: "Mitsubishi L300",
    registration: "DEF-9012",
    capacity: 8,
    status: "Maintenance",
    images: {
      exterior: ["/placeholder.svg?height=200&width=300"],
      interior: ["/placeholder.svg?height=200&width=300"],
      documents: ["/placeholder.svg?height=200&width=300"],
    },
    specifications: {
      make: "Mitsubishi",
      model: "L300",
      year: 2018,
      fuelType: "Diesel",
      transmission: "Manual",
      mileage: 78000,
      color: "Blue",
      engineSize: "2.5L",
    },
    features: ["Air Conditioning", "Cargo Space", "Power Steering"],
    maintenanceLog: [
      {
        id: 4,
        date: "2024-01-12",
        type: "Engine Repair",
        description: "Engine overhaul and transmission service",
        cost: 1200,
        beforePhoto: "/placeholder.svg?height=150&width=200",
        mechanic: "Expert Engine Service",
        status: "In Progress",
      },
    ],
    lastService: "2023-10-15",
    nextService: "2024-02-15",
    insuranceExpiry: "2024-10-15",
  },
  {
    id: 4,
    name: "Toyota Innova",
    registration: "GHI-3456",
    capacity: 7,
    status: "Available",
    images: {
      exterior: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      interior: ["/placeholder.svg?height=200&width=300"],
      documents: ["/placeholder.svg?height=200&width=300"],
    },
    specifications: {
      make: "Toyota",
      model: "Innova",
      year: 2021,
      fuelType: "Diesel",
      transmission: "Manual",
      mileage: 28000,
      color: "Gray",
      engineSize: "2.4L",
    },
    features: ["Air Conditioning", "GPS Navigation", "USB Charging", "Captain Seats"],
    maintenanceLog: [
      {
        id: 5,
        date: "2023-12-20",
        type: "Regular Service",
        description: "Routine maintenance and inspection",
        cost: 180,
        mechanic: "Toyota Service Center",
        status: "Completed",
      },
    ],
    lastService: "2023-12-20",
    nextService: "2024-03-20",
    insuranceExpiry: "2024-09-30",
  },
  {
    id: 5,
    name: "Nissan Urvan",
    registration: "JKL-7890",
    capacity: 15,
    status: "Available",
    images: {
      exterior: ["/placeholder.svg?height=200&width=300"],
      interior: ["/placeholder.svg?height=200&width=300"],
      documents: ["/placeholder.svg?height=200&width=300"],
    },
    specifications: {
      make: "Nissan",
      model: "Urvan",
      year: 2019,
      fuelType: "Diesel",
      transmission: "Manual",
      mileage: 52000,
      color: "White",
      engineSize: "3.0L",
    },
    features: ["Air Conditioning", "High Capacity", "Power Steering", "Comfortable Seating"],
    maintenanceLog: [
      {
        id: 6,
        date: "2024-01-08",
        type: "AC Service",
        description: "Air conditioning system maintenance",
        cost: 120,
        mechanic: "AC Specialist",
        status: "Completed",
      },
    ],
    lastService: "2024-01-08",
    nextService: "2024-04-08",
    insuranceExpiry: "2024-08-15",
  },
]

// Mock Booking Requests Data
export const mockBookingRequests: BookingRequest[] = [
  {
    id: 1,
    requester: {
      id: 4,
      name: "Bob User",
      department: "Sales",
      email: "user@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567803",
    },
    vehicle: {
      id: 1,
      name: "Toyota Hiace",
      image: "/placeholder.svg?height=100&width=150",
      capacity: 12,
      registration: "ABC-1234",
    },
    dateFrom: "2024-01-20",
    dateTo: "2024-01-20",
    timeFrom: "09:00",
    timeTo: "17:00",
    passengers: 8,
    purpose: "Client presentation and site visit to showcase our new products to potential major clients",
    status: "Pending",
    submittedAt: "2024-01-15T10:30:00",
    priority: "High",
    estimatedDistance: 150,
    destination: "Downtown Business District",
  },
  {
    id: 2,
    requester: {
      id: 5,
      name: "Sarah Johnson",
      department: "Marketing",
      email: "sarah.johnson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567804",
    },
    vehicle: {
      id: 2,
      name: "Honda City",
      image: "/placeholder.svg?height=100&width=150",
      capacity: 4,
      registration: "XYZ-5678",
    },
    dateFrom: "2024-01-22",
    dateTo: "2024-01-22",
    timeFrom: "14:00",
    timeTo: "18:00",
    passengers: 2,
    purpose: "Meeting with advertising agency for new campaign development and strategy discussion",
    status: "Pending",
    submittedAt: "2024-01-16T14:20:00",
    priority: "Medium",
    estimatedDistance: 75,
    destination: "Creative District",
  },
  {
    id: 3,
    requester: {
      id: 6,
      name: "Mike Wilson",
      department: "Operations",
      email: "mike.wilson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567805",
    },
    vehicle: {
      id: 3,
      name: "Mitsubishi L300",
      image: "/placeholder.svg?height=100&width=150",
      capacity: 8,
      registration: "DEF-9012",
    },
    dateFrom: "2024-01-25",
    dateTo: "2024-01-25",
    timeFrom: "08:00",
    timeTo: "16:00",
    passengers: 4,
    purpose: "Equipment delivery to branch office and setup of new operational systems",
    status: "Approved",
    submittedAt: "2024-01-14T09:15:00",
    approver: {
      name: "John Approver",
      comment: "Approved for operational needs. Equipment delivery is critical.",
      approvedAt: "2024-01-14T15:30:00",
    },
    priority: "High",
    estimatedDistance: 200,
    destination: "Branch Office - North",
  },
  {
    id: 4,
    requester: {
      id: 9,
      name: "Emily Davis",
      department: "HR",
      email: "emily.davis@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567808",
    },
    vehicle: {
      id: 4,
      name: "Toyota Innova",
      image: "/placeholder.svg?height=100&width=150",
      capacity: 7,
      registration: "GHI-3456",
    },
    dateFrom: "2024-01-18",
    dateTo: "2024-01-18",
    timeFrom: "10:00",
    timeTo: "15:00",
    passengers: 6,
    purpose: "HR team building activity and employee engagement session at retreat center",
    status: "Approved",
    submittedAt: "2024-01-13T11:45:00",
    approver: {
      name: "Lisa Chen",
      comment: "Team building approved. Important for employee morale.",
      approvedAt: "2024-01-13T16:20:00",
    },
    priority: "Medium",
    estimatedDistance: 120,
    destination: "Mountain Retreat Center",
  },
  {
    id: 5,
    requester: {
      id: 10,
      name: "Tom Anderson",
      department: "Sales",
      email: "tom.anderson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567809",
    },
    vehicle: {
      id: 5,
      name: "Nissan Urvan",
      image: "/placeholder.svg?height=100&width=150",
      capacity: 15,
      registration: "JKL-7890",
    },
    dateFrom: "2024-01-19",
    dateTo: "2024-01-19",
    timeFrom: "07:00",
    timeTo: "19:00",
    passengers: 12,
    purpose: "Sales team client visits across multiple locations for quarterly business review",
    status: "Pending",
    submittedAt: "2024-01-14T16:30:00",
    priority: "High",
    estimatedDistance: 300,
    destination: "Multiple Client Locations",
  },
  {
    id: 6,
    requester: {
      id: 11,
      name: "Rachel Green",
      department: "Marketing",
      email: "rachel.green@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1234567810",
    },
    vehicle: {
      id: 2,
      name: "Honda City",
      image: "/placeholder.svg?height=100&width=150",
      capacity: 4,
      registration: "XYZ-5678",
    },
    dateFrom: "2024-01-21",
    dateTo: "2024-01-21",
    timeFrom: "13:00",
    timeTo: "17:00",
    passengers: 3,
    purpose: "Marketing campaign photo shoot at various outdoor locations",
    status: "Rejected",
    submittedAt: "2024-01-15T09:20:00",
    approver: {
      name: "John Approver",
      comment: "Vehicle not suitable for outdoor photo shoot. Consider using a larger vehicle.",
      approvedAt: "2024-01-15T14:45:00",
    },
    priority: "Low",
    estimatedDistance: 80,
    destination: "Various Photo Locations",
  },
]

// Mock Drivers Data
export const mockDrivers: Driver[] = [
  {
    id: 1,
    userId: 3,
    name: "Jane Driver",
    email: "driver@company.com",
    phone: "+1234567802",
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
    certifications: ["Defensive Driving", "First Aid", "Commercial Vehicle Operation"],
    emergencyContact: {
      name: "John Driver",
      phone: "+1234567820",
      relationship: "Spouse",
    },
    recentTrips: [
      {
        id: 1,
        date: "2024-01-15",
        vehicle: "Toyota Hiace",
        destination: "Downtown Office",
        distance: 45.2,
        rating: 5,
        feedback: "Excellent service, very professional",
      },
      {
        id: 2,
        date: "2024-01-12",
        vehicle: "Honda City",
        destination: "Client Meeting",
        distance: 28.7,
        rating: 4,
        feedback: "Good driving, on time",
      },
      {
        id: 3,
        date: "2024-01-10",
        vehicle: "Toyota Innova",
        destination: "Airport Transfer",
        distance: 35.8,
        rating: 5,
        feedback: "Safe and comfortable ride",
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
      {
        id: 3,
        type: "handover",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Vehicle handover documentation",
        date: "2024-01-15",
        tags: ["handover", "documentation"],
      },
    ],
  },
  {
    id: 2,
    userId: 8,
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    phone: "+1234567807",
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
    certifications: ["Defensive Driving"],
    emergencyContact: {
      name: "Maria Rodriguez",
      phone: "+1234567821",
      relationship: "Wife",
    },
    recentTrips: [
      {
        id: 4,
        date: "2024-01-14",
        vehicle: "Mitsubishi L300",
        destination: "Warehouse",
        distance: 32.1,
        rating: 4,
        feedback: "Good service",
      },
      {
        id: 5,
        date: "2024-01-11",
        vehicle: "Nissan Urvan",
        destination: "Team Outing",
        distance: 65.4,
        rating: 4,
        feedback: "Safe driving, friendly",
      },
    ],
    gallery: [
      {
        id: 4,
        type: "license",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Standard Driver License",
        date: "2023-01-20",
        tags: ["license", "standard"],
      },
      {
        id: 5,
        type: "training",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Defensive driving training certificate",
        date: "2023-06-15",
        tags: ["training", "certificate"],
      },
    ],
  },
  {
    id: 3,
    userId: 12,
    name: "James Brown",
    email: "james.brown@company.com",
    phone: "+1234567811",
    avatar: "/placeholder.svg?height=100&width=100",
    licenseNumber: "DL-456789123",
    licenseType: "Professional",
    licenseExpiry: "2025-06-30",
    licensePhoto: "/placeholder.svg?height=200&width=300",
    totalTrips: 203,
    totalDistance: 35200.75,
    evaluationScore: 4.9,
    status: "Active",
    joinDate: "2021-09-30",
    violations: [],
    certifications: ["Defensive Driving", "First Aid", "Commercial Vehicle Operation", "Heavy Vehicle License"],
    emergencyContact: {
      name: "Lisa Brown",
      phone: "+1234567822",
      relationship: "Sister",
    },
    recentTrips: [
      {
        id: 6,
        date: "2024-01-13",
        vehicle: "Toyota Hiace",
        destination: "Corporate Event",
        distance: 55.3,
        rating: 5,
        feedback: "Outstanding service, very professional",
      },
      {
        id: 7,
        date: "2024-01-09",
        vehicle: "Nissan Urvan",
        destination: "Conference",
        distance: 78.9,
        rating: 5,
        feedback: "Excellent driver, very experienced",
      },
    ],
    gallery: [
      {
        id: 6,
        type: "license",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Professional Driver License",
        date: "2021-09-30",
        tags: ["license", "professional"],
      },
      {
        id: 7,
        type: "condition",
        url: "/placeholder.svg?height=200&width=300",
        caption: "Pre-trip vehicle inspection",
        date: "2024-01-13",
        tags: ["condition", "inspection"],
      },
    ],
  },
]

// Mock Issues Data
export const mockIssues: Issue[] = [
  {
    id: 1,
    vehicleId: 1,
    vehicleName: "Toyota Hiace",
    vehicleRegistration: "ABC-1234",
    reportedBy: "Bob User",
    reportedDate: "2024-01-15T10:30:00",
    description:
      "Air conditioning not working properly. Blowing warm air instead of cold. Passengers complained about discomfort during the trip.",
    status: "Open",
    priority: "Medium",
    category: "Comfort",
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    bookingId: 1,
    location: "Downtown Office",
    estimatedCost: 250,
  },
  {
    id: 2,
    vehicleId: 2,
    vehicleName: "Honda City",
    vehicleRegistration: "XYZ-5678",
    reportedBy: "Sarah Johnson",
    reportedDate: "2024-01-14T14:20:00",
    description:
      "Strange noise coming from the engine when accelerating. Sounds like grinding or metal-on-metal contact. Needs immediate attention.",
    status: "In Progress",
    priority: "High",
    category: "Mechanical",
    images: ["/placeholder.svg?height=200&width=300"],
    assignedTo: "Expert Engine Service",
    location: "Creative District",
    estimatedCost: 800,
  },
  {
    id: 3,
    vehicleId: 3,
    vehicleName: "Mitsubishi L300",
    vehicleRegistration: "DEF-9012",
    reportedBy: "Mike Wilson",
    reportedDate: "2024-01-12T09:15:00",
    description:
      "Brake pedal feels spongy and requires more pressure than usual. Safety concern that needs immediate attention.",
    status: "Resolved",
    priority: "Critical",
    category: "Safety",
    images: ["/placeholder.svg?height=200&width=300"],
    resolution: "Replaced brake pads and brake fluid. System tested and working properly. All safety checks passed.",
    resolvedDate: "2024-01-13T16:00:00",
    assignedTo: "Sarah Brake Specialist",
    location: "Branch Office - North",
    estimatedCost: 300,
    actualCost: 280,
  },
  {
    id: 4,
    vehicleId: 1,
    vehicleName: "Toyota Hiace",
    vehicleRegistration: "ABC-1234",
    reportedBy: "Admin User",
    reportedDate: "2024-01-10T08:00:00",
    description:
      "Minor scratch on the rear bumper. Cosmetic damage only, does not affect vehicle operation but should be repaired for appearance.",
    status: "Open",
    priority: "Low",
    category: "Cosmetic",
    images: ["/placeholder.svg?height=200&width=300"],
    location: "Company Parking",
    estimatedCost: 150,
  },
  {
    id: 5,
    vehicleId: 4,
    vehicleName: "Toyota Innova",
    vehicleRegistration: "GHI-3456",
    reportedBy: "Emily Davis",
    reportedDate: "2024-01-11T16:45:00",
    description: "Windshield wiper not working on passenger side. Reduces visibility during rain, safety concern.",
    status: "Open",
    priority: "Medium",
    category: "Safety",
    images: ["/placeholder.svg?height=200&width=300"],
    location: "Mountain Retreat Center",
    estimatedCost: 80,
  },
  {
    id: 6,
    vehicleId: 5,
    vehicleName: "Nissan Urvan",
    vehicleRegistration: "JKL-7890",
    reportedBy: "Tom Anderson",
    reportedDate: "2024-01-09T12:30:00",
    description: "Seat belt in second row is stuck and won't retract properly. Safety equipment malfunction.",
    status: "In Progress",
    priority: "High",
    category: "Safety",
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    assignedTo: "Safety Equipment Specialist",
    location: "Multiple Client Locations",
    estimatedCost: 120,
  },
  {
    id: 7,
    vehicleId: 2,
    vehicleName: "Honda City",
    vehicleRegistration: "XYZ-5678",
    reportedBy: "Rachel Green",
    reportedDate: "2024-01-08T11:15:00",
    description:
      "Dashboard warning light for engine check is on. Vehicle seems to run normally but needs diagnostic check.",
    status: "Open",
    priority: "Medium",
    category: "Electrical",
    images: ["/placeholder.svg?height=200&width=300"],
    location: "Various Photo Locations",
    estimatedCost: 200,
  },
  {
    id: 8,
    vehicleId: 4,
    vehicleName: "Toyota Innova",
    vehicleRegistration: "GHI-3456",
    reportedBy: "Anna Martinez",
    reportedDate: "2024-01-07T14:20:00",
    description: "Radio system not responding to controls. Display shows but buttons don't work.",
    status: "Resolved",
    priority: "Low",
    category: "Electrical",
    images: ["/placeholder.svg?height=200&width=300"],
    resolution: "Replaced radio control unit. System tested and working properly.",
    resolvedDate: "2024-01-08T10:30:00",
    assignedTo: "Electronics Specialist",
    location: "Finance Department",
    estimatedCost: 180,
    actualCost: 165,
  },
]

// Dashboard Statistics
export const getDashboardStats = () => {
  const totalVehicles = mockVehicles.length
  const availableVehicles = mockVehicles.filter((v) => v.status === "Available").length
  const activeBookings = mockBookingRequests.filter((b) => b.status === "Approved" || b.status === "In Use").length
  const pendingApprovals = mockBookingRequests.filter((b) => b.status === "Pending").length
  const openIssues = mockIssues.filter((i) => i.status === "Open").length
  const totalDrivers = mockDrivers.length
  const activeDrivers = mockDrivers.filter((d) => d.status === "Active").length

  return {
    totalVehicles,
    availableVehicles,
    activeBookings,
    pendingApprovals,
    openIssues,
    totalDrivers,
    activeDrivers,
    utilizationRate: Math.round(((totalVehicles - availableVehicles) / totalVehicles) * 100),
    avgRating: mockDrivers.reduce((sum, driver) => sum + driver.evaluationScore, 0) / mockDrivers.length,
  }
}

// Department list
export const departments = ["IT", "Management", "Operations", "Sales", "Marketing", "Finance", "HR"]

// Vehicle categories
export const vehicleCategories = [
  { name: "Compact", capacity: "1-4 passengers", vehicles: mockVehicles.filter((v) => v.capacity <= 4) },
  {
    name: "Mid-size",
    capacity: "5-8 passengers",
    vehicles: mockVehicles.filter((v) => v.capacity >= 5 && v.capacity <= 8),
  },
  { name: "Large", capacity: "9+ passengers", vehicles: mockVehicles.filter((v) => v.capacity > 8) },
]
