import React, { useEffect, useState } from 'react';

const Help = () => {
  return (
    <div className="flex text-white flex-col items-center justify-center font-poppins pt-32">
            <h1 className="text-white pb-9 text-3xl font-bold text-center">Help</h1>

            <div className="w-full max-w-screen-lg bg-opacity-80 shadow-md rounded px-2 pt-6 pb-8 mb-4">
                {/* Introduction */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Introduction</h2>
                    <p>Provide a brief introduction to the platform and its purpose.</p>
                </div>

                {/* Navigation Instructions */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Navigation Instructions</h2>
                    <p>Explain how to navigate the platform and describe the main sections.</p>
                </div>

                {/* User Roles */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">User Roles</h2>
                    <p>Explain the different user roles and their privileges.</p>
                </div>

                {/* Logging In and Signing Up */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Logging In and Signing Up</h2>
                    <p>Provide instructions on how to log in and sign up for new users.</p>
                </div>

                {/* Home Page Overview */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Home Page Overview</h2>
                    <p>Describe the features available on the Home page.</p>
                </div>

                {/* VM Details */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">VM Details</h2>
                    <p>Explain how users can view detailed information about a specific VM.</p>
                </div>

                {/* Connecting to VMs */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Connecting to VMs</h2>
                    <p>Provide instructions on how users can connect to a VM using the platform.</p>
                </div>

                {/* Running Scripts */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Running Scripts</h2>
                    <p>Describe how users can run scripts on connected VMs.</p>
                </div>

                {/* Profile Page */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Profile Page</h2>
                    <p>Provide an overview of the Profile page and its functionalities.</p>
                </div>

                {/* FAQs */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">FAQs</h2>
                    <p>Include a list of frequently asked questions and their answers.</p>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                    <p>Provide contact information for support or assistance.</p>
                </div>

                {/* Feedback */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Feedback</h2>
                    <p>Encourage users to provide feedback on the platform.</p>
                </div>
            </div>
        </div>
  )
}

export default Help