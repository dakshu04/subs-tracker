/* eslint-disable @typescript-eslint/no-explicit-any */
// Dashboard.tsx
"use client";
import { useState } from "react";
import { Settings, CreditCard, PlusIcon } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function Dashboard() {
  const user = useUser()
  const [activePage, setActivePage] = useState("subscriptions");
  const [showModel, setShowModel] = useState(false);

  const[form, setForm] = useState({
    name: "",
    price: "",
    renewalDate: "",
    category: ""
  })
    const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/subs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error(`Failed to create subscription: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Subscription created:", data);

    // Close modal and reset form
    setShowModel(false);
    setForm({
      name: "",
      price: "",
      renewalDate: "",
      category: "",
    });
  } catch (error) {
    console.error("❌ Failed to create subscription haha ha", error);
  }
};


  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-10">SubsTracker</h1>

          <nav className="flex flex-col gap-3">
            <button
              onClick={() => setActivePage("subscriptions")}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activePage === "subscriptions"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <CreditCard className="w-5 h-5" />
              My Subscriptions
            </button>

            <button
              onClick={() => setActivePage("settings")}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activePage === "settings"
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <div
            onClick={() => setShowModel(true)}
            className="flex items-center p-3 gap-2 border-2 bg-amber-300 text-black rounded-xl">
              <UserButton />
              {user.user?.fullName }
            </div>
          </nav>
        </div>

        <footer className="text-xs text-gray-500">
          © {new Date().getFullYear()} SubsTracker
        </footer>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-auto">
        {activePage === "subscriptions" && (
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">My Subscriptions</h2>
                <button className="cursor-pointer flex items-center gap-2 bg-amber-300 text-black px-4 py-1.5 rounded-md hover:bg-amber-400 transition"
                onClick={() => setShowModel(true)}>
                <PlusIcon className="w-5 h-5" />
                <span>Create New</span>
              </button>
              </div>

              {/* Description */}
              <p className="text-gray-400">
                Here you can view and manage all your active subscriptions.
              </p>
            </div>
        )}

        {activePage === "settings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-400">
              Adjust your preferences, account info, and notification settings here.
            </p>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-[400px] shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-white">Add Subscription</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Subscription Name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white p-2 rounded-md outline-none"
              />
              <input
                type="number"
                name="price"
                placeholder="Price (in ₹)"
                value={form.price}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white p-2 rounded-md outline-none"
              />
              <input
                type="date"
                name="renewalDate"
                value={form.renewalDate}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white p-2 rounded-md outline-none"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
                className="bg-gray-800 text-white p-2 rounded-md outline-none"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModel(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                
                  type="submit"
                  className="bg-amber-300 text-black px-4 py-1.5 rounded-md hover:bg-amber-400 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
