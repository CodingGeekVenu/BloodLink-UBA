<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# BloodLink – Emergency Blood Donor Network

**BloodLink** is an offline-first emergency blood donor coordination platform designed for rural and semi-urban India. It connects blood donors, acceptors/patient families, health workers, and hospital staff through a verified, role-based system that can continue functioning even in low-connectivity areas.

This project is being developed under the **Unnat Bharat Abhiyan (UBA)** initiative with support from **IIT Delhi** and **SRM Institute of Science and Technology**.

---

## Project Overview

In medical emergencies such as postpartum hemorrhage, accidents, trauma, severe anemia, or thalassemia-related transfusion needs, finding a compatible blood donor quickly can be life-saving.

Existing platforms often provide blood bank information or static donor contact lists, but rural emergencies require faster, verified, and more reliable last-mile coordination.

BloodLink focuses on:

- verified donor coordination
- live donor availability
- health-worker-led request validation
- emergency request tracking
- offline-first functionality
- BLE-assisted nearby donor discovery
- secure and consent-based donor data handling

BloodLink does not aim to replace national blood-bank systems like eRaktKosh. Instead, it complements them by solving the last-mile emergency donor coordination gap.

---

## Problem Statement

In rural and semi-urban areas, patients and health workers often face delays in finding compatible blood during emergencies. Existing blood donor systems may depend heavily on internet connectivity, outdated donor records, manual phone calls, or centralized blood-bank availability data.

The major challenges include:

- inactive or outdated donor profiles
- lack of real-time donor availability
- poor response from listed donors
- dependency on stable internet connectivity
- absence of offline emergency workflow
- risk of paid donors or fake emergency requests
- lack of health-worker verification
- no proper request lifecycle tracking

BloodLink addresses these gaps by providing a verified, offline-first, role-based emergency blood donor network.

---

## Proposed Solution

BloodLink provides a structured platform where donors, acceptors, and health workers can coordinate blood donation requests in a faster and safer way.

The app works using a **dual-path architecture**:

### Path A – Online Cloud Path

When internet is available:

1. Health worker or acceptor creates an emergency blood request.
2. Request is sent to the cloud backend.
3. Backend matches donors based on blood group, location, availability, and verification status.
4. Matching donors receive alerts.
5. Donors accept or reject the request.
6. Health worker confirms the donor.
7. Request is marked as fulfilled, cancelled, or expired.

### Path B – Offline BLE Path

When internet is unavailable:

1. Health worker creates an emergency request offline.
2. Request is stored locally on the device.
3. Device broadcasts a nearby emergency alert using Bluetooth Low Energy.
4. Nearby donor phones running BloodLink detect the request.
5. Donors can respond locally.
6. Responses are stored on the device.
7. Once internet is restored, pending data is synced to the cloud backend.

---

## Key Features

### Donor Features

- Donor registration
- Blood group and location entry
- Last donation date tracking
- Availability status toggle
- Emergency alert notifications
- Accept/reject request option
- Donation history
- Profile update and deactivation option

### Acceptor / Patient Family Features

- Create emergency blood request
- Enter blood group, units required, urgency, and hospital details
- Track request status
- Receive donor confirmation updates

### Health Worker / Hospital Staff Features

- Verify donor registrations
- Validate emergency requests
- Create requests on behalf of patients
- View matched donors
- Confirm donor availability
- Mark request as fulfilled or cancelled
- Manage offline emergency mode

### Admin Features

- Manage donor database
- View active and completed requests
- Monitor verified donors
- Export reports
- View feedback and case records
- Track project progress for documentation

---

## MVP Scope

The first version of BloodLink focuses on building a working prototype with the following features:

- Role-based login flow
- Donor registration
- Donor availability status
- Emergency request creation
- Donor matching logic
- Health-worker verification
- Request status tracking
- Basic notification flow
- Offline local storage structure
- BLE emergency broadcast proof-of-concept
- Admin dashboard prototype
- Documentation and reporting support

---

## User Roles

BloodLink uses a single app with role-based access.

| Role | Purpose |
|---|---|
| Donor | Registers as a voluntary blood donor and responds to emergency alerts |
| Acceptor | Creates emergency blood requests for patients |
| Health Worker | Verifies requests, coordinates donors, and manages emergency cases |
| Admin | Monitors donors, requests, reports, and project data |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile App / Web App | React + Vite |
| Styling | TailwindCSS / CSS |
| Language | TypeScript |
| Local Storage | LocalStorage / IndexedDB / Offline Cache |
| AI Integration | Gemini API via Google GenAI SDK |
| Version Control | Git & GitHub |
| IDE | Antigravity |

---

## System Architecture

```text
                    ┌──────────────────────────┐
                    │      Cloud Backend        │
                    │  Donors, Requests, Logs   │
                    │  Matching, Reports, Sync  │
                    └────────────▲─────────────┘
                                 │
                     Internet Sync│
                                 │
┌────────────────────┐       ┌───┴────────────────┐       ┌────────────────────┐
│     Donor App       │◄─────►│ Health Worker App  │◄─────►│   Acceptor App      │
│ Local Profile       │  BLE  │ Emergency Requests │  BLE  │ Request Tracking    │
│ Availability        │       │ Offline Mode       │       │ Status Updates      │
└────────────────────┘       └───▲────────────────┘       └────────────────────┘
                                 │
                                 │
                    ┌────────────▼─────────────┐
                    │    Admin Dashboard        │
                    │ Reports, Verification,    │
                    │ Monitoring, Analytics     │
                    └──────────────────────────┘
```

---

## Application Workflow

### Donor Registration Workflow

```text
Donor opens app
→ Selects Donor role
→ Enters name, phone number, blood group, location, and last donation date
→ Gives consent for emergency contact
→ Health worker/admin verifies donor
→ Donor becomes active in the system
```

### Online Emergency Workflow

```text
Health worker creates emergency request
→ Request is uploaded to cloud backend
→ Backend matches verified donors
→ Donors receive alert
→ Donor accepts or rejects request
→ Health worker confirms donor
→ Donation process happens at hospital/blood bank
→ Request is marked fulfilled
```

### Offline Emergency Workflow

```text
Health worker creates request without internet
→ Request is saved locally
→ BLE emergency broadcast starts
→ Nearby donor phones detect request
→ Matching donors respond locally
→ Responses are stored on device
→ Data syncs when internet returns
→ Admin dashboard updates case record
```

---

## Request Status Lifecycle

Each emergency request follows a structured status flow:

```text
Created
→ Verified
→ Donors Notified
→ Donor Accepted
→ Health Worker Confirmed
→ Fulfilled
```

Alternative status values:

```text
Cancelled
Expired
Rejected
Pending Sync
```

---

## Why BloodLink Is Different

| Existing Gap | BloodLink Improvement |
|---|---|
| Static donor lists | Live availability and verified donors |
| Manual calling | Ranked donor matching and request tracking |
| Internet dependency | Offline-first storage and BLE emergency mode |
| Fake or paid donor risk | Health-worker verification and report system |
| No proper request status | Full request lifecycle tracking |
| Outdated donor data | Last active status and periodic reconfirmation |
| Urban-focused systems | Rural-first design with PHC/health-worker support |

---

## Privacy and Ethics

BloodLink follows a consent-first approach.

The app will collect only the minimum required donor information:

- Name
- Phone number
- Blood group
- Village or approximate location
- Availability status
- Last donation date

Privacy principles:

- Donor consent is mandatory
- Donor data is used only for verified blood emergencies
- Donor profile can be updated or deactivated
- Health workers verify emergency requests
- No scraping of third-party donor data
- No paid donor or brokerage model
- Sensitive data is protected through access control and secure storage

---

## Project Folder Structure

```text
bloodlink/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AdminDashboard.tsx
│   │   ├── CreateRequest.tsx
│   │   ├── DonorHome.tsx
│   │   ├── DonorRegister.tsx
│   │   ├── HealthWorkerDashboard.tsx
│   │   ├── MatchingDonors.tsx
│   │   ├── OfflineMode.tsx
│   │   ├── RequestTracking.tsx
│   │   ├── RoleSelection.tsx
│   │   └── Splash.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
│
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .gitignore
```

---

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/CodingGeekVenu/BloodLink-UBA.git
```

Install dependencies:

```bash
npm install
```

Set the Gemini API Key:
Create a `.env.local` file in the root directory and add your key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

---

## Team

**Institution:** SRM Institute of Science and Technology  
**Project:** Blood Bank App – A Mobile Application to Connect Blood Donors with Acceptors  
**Initiative:** Unnat Bharat Abhiyan  
**Supported by:** IIT Delhi  

---

## License

This project is currently developed for academic and social-impact purposes under the UBA project framework. Licensing details will be finalized before public release.

---

## Repository Maintainers

- Student Developer / Documentation Team
- Faculty Mentors
- Health Worker / Field Coordination Team

---

## Acknowledgement

We acknowledge the support of Unnat Bharat Abhiyan, IIT Delhi, SRM Institute of Science and Technology, faculty mentors, health workers, volunteers, and community members involved in the development and pilot implementation of BloodLink.
