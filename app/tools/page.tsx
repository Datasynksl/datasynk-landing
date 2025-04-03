import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, Database, FileText, Search, Server, Sliders } from "lucide-react"

export default function Tools() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black-200 rounded-lg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-200 sm:text-5xl">Our Data Tools</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful tools designed to help you manage, analyze, and visualize your data effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500 rounded-md text-white mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">DataSynk SnapTag</h3>
              <p className="text-gray-600 mb-4">
                A powerful Location tagging tool that we use to source map/location cordinate of business, places etc.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                 up to 150+ matched words
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Easy & fun to interact with
                </li>
        
              </ul>
              <Link href="http://snaptag.vercel.app/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-green-500 rounded-md text-white mb-4">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">DataSynk LingoTag</h3>
              <p className="text-gray-600 mb-4">
                A gamified web app that let`s people match english words with local language words
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Fun and easy to use
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                 Earn by contributing 
                </li>

              </ul>
              <Link href="/tools/visualize" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-purple-500 rounded-md text-white mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DataSynk Discover</h3>
              <p className="text-gray-600 mb-4">
                An AI-powered data exploration tool that helps you uncover hidden patterns and insights in your data.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Automated insight generation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Natural language queries
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Anomaly detection
                </li>
              </ul>
              <Link href="/tools/discover" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-red-500 rounded-md text-white mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DataSynk Report</h3>
              <p className="text-gray-600 mb-4">
                Automated reporting tool that generates professional reports from your data with just a few clicks.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Customizable templates
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Scheduled report generation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Multiple export formats
                </li>
              </ul>
              <Link href="/tools/report" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-yellow-500 rounded-md text-white mb-4">
                <Sliders className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DataSynk Clean</h3>
              <p className="text-gray-600 mb-4">
                Data cleaning and preparation tool that helps you transform raw data into analysis-ready datasets.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Automated data cleaning
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data transformation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Data quality assessment
                </li>
              </ul>
              <Link href="/tools/clean" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-teal-500 rounded-md text-white mb-4">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DataSynk Store</h3>
              <p className="text-gray-600 mb-4">
                Secure and scalable data storage solution with advanced access controls and backup features.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  End-to-end encryption
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Automated backups
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Granular access controls
                </li>
              </ul>
              <Link href="/tools/store" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="py-16 bg-black-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-200">Featured Tool: DataSynk Discover</h2>
              <p className="mt-4 text-lg text-gray-500">
                Our AI-powered data exploration tool will revolutionizing how businesses uncover insights from their data.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                With natural language queries, you can ask questions about your data in plain English and get instant
                answers.
              </p>
              <div className="mt-8">
                <Link
                  href="/tools/discover"
                  className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Learn more about DataSynk Discover
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/37872862.jpg"
                  alt="DataSynk Discover dashboard"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-200">Ready to get started?</h2>
            <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
              Explore our flexible pricing options or contact us for a custom solution tailored to your needs.
            </p>
            <div className="mt-8 flex justify-center gap-4">
          
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

