# Msebetsi Department of Health Application

A modern, responsive healthcare platform built with Next.js, designed to streamline medical services and improve patient care experience.

## Features

### 🏥 Homepage
- Modern hero section with call-to-action
- Quick access to essential services
- Appointment scheduling section
- Location and operating hours information

### 👨‍⚕️ Medical Services
- Comprehensive list of medical specialties
- Detailed service descriptions
- Key features for each service
- Easy navigation to appointment booking

### 🗓️ Appointment System
- User-friendly appointment booking interface
- Department and doctor selection
- Date and time scheduling
- Additional information input

### 👥 Doctor Profiles
- Detailed doctor information
- Specialization and experience
- Education background
- Availability schedule

### 📞 Contact Information
- Contact form for inquiries
- Location information with map
- Emergency contact numbers
- Working hours

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
department-of-health/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── services/          # Services page
│   ├── doctors/           # Doctors page
│   ├── appointment/       # Appointment page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── homepage/         # Homepage-specific components
│   └── ui/               # UI components
├── public/               # Static assets
└── styles/              # Global styles
```

## Features to be Added

- User authentication
- Patient portal
- Medical records system
- Online consultation
- Prescription management
- Payment integration
