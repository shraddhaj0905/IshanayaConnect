import React from "react";

const teacher = {
  name: "Mr. John Smith",
  role: "Special Education, Autism Support",
  profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  email: "john.smith@example.com",
  contact: "+123 456 7890",
  address: "123 Autism Care Street, New York, USA",
  experience: "10 years",
  qualifications: "M.Ed. in Special Education, Certified Autism Specialist",
  certifications: ["Certified Autism Specialist", "Child Psychology Diploma"],
  subjects: ["Mathematics", "Science", "Behavioral Therapy"],
  totalStudents: 25, // Number of students assigned
  summary:
    "Experienced special education teacher with a decade of expertise in fostering inclusive learning environments and personalized education plans.",
  workExperience: [
    {
      position: "Special Education Teacher",
      institution: "ABC Inclusive School",
      duration: "2020 - Present",
      details: [
        "Designed individualized lesson plans for students with autism.",
        "Implemented assistive technologies for better engagement.",
        "Collaborated with therapists and parents for student progress.",
      ],
    },
    {
      position: "Assistant Teacher",
      institution: "XYZ Learning Center",
      duration: "2015 - 2020",
      details: [
        "Provided academic support in mathematics and science.",
        "Assisted in behavioral therapy sessions for students.",
      ],
    },
  ],
};

const TeacherProfile = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 h-32 relative flex justify-center items-center">
          <img
            src={teacher.profilePicture}
            alt={teacher.name}
            className="absolute -bottom-10 w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center mt-12 p-4">
          <h2 className="text-2xl font-semibold">{teacher.name}</h2>
          <p className="text-gray-600">{teacher.role}</p>
        </div>

        {/* Contact & Profile Details */}
        <div className="px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Contact:</strong> {teacher.contact}
          </p>
          <p>
            <strong>Experience:</strong> {teacher.experience}
          </p>
          <p>
            <strong>Qualifications:</strong> {teacher.qualifications}
          </p>
          <p>
            <strong>Address:</strong> {teacher.address}
          </p>
          <p>
            <strong>Total Students Assigned:</strong> {teacher.totalStudents}
          </p>
        </div>

        {/* Certifications */}
        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">
            Certifications
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {teacher.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </div>

        {/* Subjects Taught */}
        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">
            Subjects Taught
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {teacher.subjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </div>

        {/* Summary Section */}
        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">
            Summary
          </h3>
          <p className="text-gray-700 mt-2">{teacher.summary}</p>
        </div>

        {/* Work Experience */}
        <div className="px-8 py-4">
          <h3 className="text-xl font-semibold text-blue-700 border-b pb-1">
            Work Experience
          </h3>
          {teacher.workExperience.map((job, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold text-lg">{job.position}</p>
              <p className="text-gray-500">{job.institution} | {job.duration}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {job.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
