# 🏠 Airbnb Clone – Full-Stack Rental Platform

A full-featured Airbnb clone built with **Next.js**, **Prisma**, and **MongoDB**, designed to allow users to list properties, make reservations, and manage bookings. This project showcases a modern tech stack, clean UI/UX, and robust backend architecture.

## 🚀 Tech Stack

* **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend**: Node.js, Prisma ORM, MongoDB
* **Authentication**: NextAuth (Google, GitHub providers)
* **UI Components**: Headless UI, React Icons, Zustand
* **Cloud & Tools**: Vercel (Hosting), Cloudinary (Image Upload), Axios, ESLint, Prettier

---

## ✨ Features

* ✅ User Authentication (Login / Register with OAuth)
* 🏨 Host can create property listings with detailed info
* 🔍 Browse all listings with filters by location, category, date, and more
* 📅 Make and manage property reservations
* ❤️ Favorite listings
* 👤 Profile page to manage your listings and bookings
* 🌐 Fully responsive and mobile-friendly design
* 🌥 Image upload with Cloudinary integration
* 🔐 Secure API routes & protected pages
* ⚙️ Modular and scalable codebase using clean architecture

---

## 🖼️ Screenshots
---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/airbnb-clone.git
cd airbnb-clone
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/airbnb
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Setup Prisma & Migrate DB

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📁 Folder Structure

```
/app              -> Next.js App Router structure
/components       -> Reusable UI components
/hooks            -> Custom React hooks
/libs             -> Prisma client, Cloudinary config, etc.
/actions          -> Server-side logic (auth, reservation, etc.)
```

---

## 🌐 Deployment

This project is ready to deploy on **[Vercel](https://vercel.com/)**. Push your code to GitHub and connect the repo to Vercel.

---

## 📌 TODO / Future Enhancements

* Add Stripe integration for payments
* Admin dashboard for hosts
* Messaging system between host and guest
* Reviews and ratings system

---

## 🙌 Acknowledgements

Inspired by Airbnb’s design and user flow.
Built with ❤️ by [Bharat Kumar Sharma](https://www.linkedin.com/in/bharat-kumar-sharma-b23a102aa)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
