import Image from "next/image";
import { Users, Award, Clock, Target } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 w-full bg-gradient-br from-bg-black-200 to-bg-black-100 rounded-lg">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-200 sm:text-5xl">About DataSynk SL</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              We are a data-driven company dedicated to helping businesses leverage the power of their data.
            </p>
          </div>  
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-400">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                Founded in November 2025, DataSynk SL was born out of a passion for data and a vision to help businesses make better decisions through data-driven insights.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Our team of data scientists, engineers, and analysts work together to provide comprehensive data solutions that address the unique challenges faced by our clients.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                We believe that data is one of the most valuable assets a company can have, and our mission is to help businesses unlock the full potential of their data.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/378953.jpg"
                  alt="Team working together"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-black-200 rounded-lg">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-200">Our Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              The principles that guide our work and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-black-200 p-6 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500 rounded-md text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Collaboration</h3>
              <p className="mt-2 text-gray-500">
                We work closely with our clients to understand their needs and deliver tailored solutions.
              </p>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center p-2 bg-green-500 rounded-md text-white mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Excellence</h3>
              <p className="mt-2 text-gray-500">
                We strive for excellence in everything we do, from data analysis to client communication.
              </p>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center p-2 bg-purple-500 rounded-md text-white mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Efficiency</h3>
              <p className="mt-2 text-gray-500">
                We value your time and resources, delivering efficient solutions that maximize ROI.
              </p>
            </div>

            <div className="bg-black-200 p-6 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center p-2 bg-red-500 rounded-md text-white mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-500">
                We continuously explore new technologies and methodologies to stay at the forefront of data science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Meet the experts behind DataSynk SL
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Team member"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Jane Doe</h3>
                <p className="text-blue-600">Founder & CEO</p>
                <p className="mt-2 text-gray-500">
                  Data scientist with over 10 years of experience in the industry.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Team member"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">John Smith</h3>
                <p className="text-blue-600">CTO</p>
                <p className="mt-2 text-gray-500">
                  Expert in data infrastructure and cloud computing solutions.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Team member"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Sarah Johnson</h3>
                <p className="text-blue-600">Lead Data Analyst</p>
                <p className="mt-2 text-gray-500">
                  Specializes in transforming complex data into actionable insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
