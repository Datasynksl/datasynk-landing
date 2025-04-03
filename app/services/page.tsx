import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, Database, FileText, Server, Users, Zap } from "lucide-react"

export default function Services() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-200 sm:text-5xl">Our Services</h1>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Comprehensive data solutions tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            
          <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-teal-500 rounded-md text-white mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Data Digitization</h3>
              <p className="text-gray-600 mb-4">
              Transforming Paper to Digital Data
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  High-Quality Acurate Scans
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  OCR Data Extraction
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Human verification
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom training programs
                </li>
              </ul>
              <Link
                href="#"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500 rounded-md text-white mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Data Management</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive data management solutions to help you organize, store, and maintain your data assets.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data architecture design
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Database optimization
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data governance implementation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data quality management
                </li>
              </ul>
              <Link
                href="/services/data-management"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-green-500 rounded-md text-white mb-4">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Data Analytics</h3>
              <p className="text-gray-600 mb-4">
                Transform your raw data into actionable insights to drive better business decisions.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Descriptive analytics
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Predictive modeling
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Customer behavior analysis
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Market trend analysis
                </li>
              </ul>
              <Link
                href="/services/data-analytics"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-purple-500 rounded-md text-white mb-4">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Data Infrastructure</h3>
              <p className="text-gray-600 mb-4">
                Build robust and scalable data infrastructure to support your growing data needs.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Cloud data warehousing
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data pipeline development
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  ETL process implementation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time data processing
                </li>
              </ul>
              <Link
                href="/services/data-infrastructure"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-red-500 rounded-md text-white mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Data Reporting</h3>
              <p className="text-gray-600 mb-4">
                Create clear and insightful reports that effectively communicate your data findings.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom dashboard development
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Automated reporting systems
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Interactive data visualizations
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Executive summary reports
                </li>
              </ul>
              <Link
                href="/services/data-reporting"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-yellow-500 rounded-md text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Data Consulting</h3>
              <p className="text-gray-600 mb-4">
                Expert advice and guidance to help you develop and implement effective data strategies.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data strategy development
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Technology selection
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Process optimization
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data maturity assessment
                </li>
              </ul>
              <Link
                href="/services/data-consulting"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div> */}

          </div>
        </div>
      </section>

      {/* Featured Service */}
      <section className="py-16 bg-black-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-200">Featured Service: Data Analytics</h2>
              <p className="mt-4 text-lg text-gray-500">
                Our data analytics service helps businesses transform raw data into actionable insights that drive
                better decision-making.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                We use advanced analytics techniques and tools to uncover patterns, trends, and correlations in your
                data that can help you optimize operations, improve customer experience, and increase revenue.
              </p>
              <div className="mt-8">
                <Link
                  href="/services/data-analytics"
                  className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Learn more about Data Analytics
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/278685342.jpg"
                  alt="Data Analytics dashboard"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Process</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              How we work with you to deliver exceptional data solutions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-500">
                We start by understanding your business goals, challenges, and data needs through in-depth
                consultations.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Strategy</h3>
              <p className="text-gray-500">
                We develop a tailored strategy and roadmap to address your specific data challenges and opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-500">
                Our expert team implements the solution, ensuring seamless integration with your existing systems.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Optimization</h3>
              <p className="text-gray-500">
                We continuously monitor and optimize the solution to ensure it delivers maximum value over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Clients Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear from the businesses we have helped with our data services
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-black-200 p-6 rounded-lg shadow-sm">
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
                  <h3 className="text-lg font-medium text-gray-900">Robert Johnson</h3>
                  <p className="text-gray-500">CTO, FinTech Solutions</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                ``DataSynk SL`s data infrastructure service has been a game-changer for our business. Their expertise and
                attention to detail have helped us build a robust and scalable data platform.``
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
                  <h3 className="text-lg font-medium text-gray-900">Sarah Williams</h3>
                  <p className="text-gray-500">Marketing Director, E-commerce Giant</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                ``The data analytics service provided by DataSynk SL has transformed our marketing strategy. We now have
                clear insights into customer behavior and can make data-driven decisions.``
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
                  <h3 className="text-lg font-medium text-gray-900">James Thompson</h3>
                  <p className="text-gray-500">CEO, Healthcare Solutions</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                ``DataSynk SL`s data consulting service has been invaluable in helping us develop a comprehensive data
                strategy. Their expertise and guidance have set us on the path to success.``
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Ready to transform your data?</h2>
                <p className="mt-3 max-w-3xl text-lg text-blue-100">
                  Get in touch with our team to discuss how we can help with your data needs.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

