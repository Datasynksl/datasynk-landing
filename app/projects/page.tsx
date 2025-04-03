import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Data Analysis",
      description: "Comprehensive analysis of customer behavior and sales patterns for a leading e-commerce platform.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Data Analytics",
    },
    {
      id: 2,
      title: "Healthcare Data Infrastructure",
      description:
        "Designed and implemented a secure data infrastructure for a healthcare provider to manage patient data.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Data Infrastructure",
    },
    {
      id: 3,
      title: "Financial Reporting Dashboard",
      description: "Created an interactive dashboard for real-time financial reporting and analysis.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Data Visualization",
    },
    {
      id: 4,
      title: "Supply Chain Optimization",
      description:
        "Used data analytics to optimize supply chain operations and reduce costs for a manufacturing company.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Data Analytics",
    },
    {
      id: 5,
      title: "Customer Segmentation Analysis",
      description: "Developed a customer segmentation model to improve marketing strategies for a retail client.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Data Science",
    },
    {
      id: 6,
      title: "Predictive Maintenance System",
      description: "Implemented a predictive maintenance system for industrial equipment using IoT data.",
      image: "/placeholder.svg?height=300&width=500",
      category: "IoT & Data",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Projects</h1>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Explore our portfolio of successful data projects across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Case Study</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              A deeper look at one of our most impactful projects
            </p>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Case study"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover md:w-48 md:h-full"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">Retail Analytics</div>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">Transforming Customer Experience with Data</h2>
                <p className="mt-4 text-gray-600">
                  We helped a major retail chain improve their customer experience by analyzing customer journey data
                  and identifying key touchpoints for improvement. The implementation of our recommendations resulted in
                  a 25% increase in customer satisfaction and a 15% increase in repeat purchases within the first six
                  months.
                </p>
                <p className="mt-4 text-gray-600">
                  Our approach combined in-store analytics, online behavior tracking, and customer feedback to create a
                  comprehensive view of the customer journey.
                </p>
                <div className="mt-6">
                  <Link
                    href="/case-studies/retail-analytics"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Clients Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear from the businesses we have helped with our data solutions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Client"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Michael Brown</h3>
                  <p className="text-gray-500">CEO, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                `DataSynk SL transformed our approach to data. Their insights helped us make better business decisions
                and significantly improved our operations.``
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Client"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Lisa Chen</h3>
                  <p className="text-gray-500">CTO, HealthPlus</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                `The data infrastructure solution provided by DataSynk SL has been instrumental in our digital
                transformation journey. Highly recommended!``
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Client"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">David Wilson</h3>
                  <p className="text-gray-500">Marketing Director, RetailGiant</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                `The customer segmentation analysis provided by DataSynk SL revolutionized our marketing strategy. We have
                seen a 30% increase in campaign effectiveness.``
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

