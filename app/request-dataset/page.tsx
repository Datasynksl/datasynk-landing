"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

export default function RequestDataset() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    datasetType: "",
    datasetDescription: "",
    timeframe: "",
    additionalInfo: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Request a Dataset</h1>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Fill out the form below to request a custom dataset tailored to your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Dataset Requirements</h2>
                    <div>
                      <label htmlFor="datasetType" className="block text-sm font-medium text-gray-700 mb-1">
                        Type of Dataset Needed *
                      </label>
                      <select
                        id="datasetType"
                        name="datasetType"
                        required
                        value={formData.datasetType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a type</option>
                        <option value="market_research">Market Research</option>
                        <option value="customer_data">Customer Data</option>
                        <option value="financial_data">Financial Data</option>
                        <option value="industry_statistics">Industry Statistics</option>
                        <option value="demographic_data">Demographic Data</option>
                        <option value="other">Other (please specify)</option>
                      </select>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="datasetDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Detailed Description of Dataset Needed *
                      </label>
                      <textarea
                        id="datasetDescription"
                        name="datasetDescription"
                        rows={4}
                        required
                        value={formData.datasetDescription}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please describe the specific data points, metrics, or information you need in the dataset."
                      ></textarea>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
                        Timeframe
                      </label>
                      <select
                        id="timeframe"
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a timeframe</option>
                        <option value="urgent">Urgent (within 1 week)</option>
                        <option value="standard">Standard (2-4 weeks)</option>
                        <option value="flexible">Flexible (1-2 months)</option>
                        <option value="long_term">Long-term project (3+ months)</option>
                      </select>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any other details that might help us understand your needs better."
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 mx-auto">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your dataset request. Our team will review your requirements and get back to you within 48
                hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-500">Common questions about our dataset request process</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">What types of datasets can I request?</h3>
              <p className="text-gray-600">
                You can request various types of datasets including market research data, customer data, financial data,
                industry statistics, demographic data, and more. If you have specific requirements that do not fit these
                categories, you can select `Other` and provide details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How long does it take to fulfill a dataset request?
              </h3>
              <p className="text-gray-600">
                The timeframe depends on the complexity and availability of the data you need. Simple requests can be
                fulfilled within a week, while more complex ones may take 2-4 weeks or longer. We will provide you with a
                specific timeline after reviewing your request.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">How is the data delivered?</h3>
              <p className="text-gray-600">
                We typically deliver datasets in standard formats such as CSV, Excel, JSON, or SQL databases. We can
                also provide access through our secure data portal or API if you prefer. We will discuss the delivery
                method with you based on your preferences and technical requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Is there a cost for requesting a dataset?</h3>
              <p className="text-gray-600">
                Yes, there is typically a cost associated with custom dataset requests. The price depends on factors
                such as data complexity, volume, and processing requirements. After reviewing your request, we will
                provide you with a detailed quote before proceeding.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can you help me understand how to use the dataset?
              </h3>
              <p className="text-gray-600">
                We provide documentation with all our datasets to help you understand the data structure and contents.
                We also offer data consultation services to help you interpret and make the most of your dataset. Just
                let us know if you need additional support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

