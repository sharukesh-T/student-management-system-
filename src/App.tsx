import React, { useState } from 'react';
import { 
  GraduationCap, 
  Layers, 
  Database, 
  Server, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  FolderTree, 
  FileText, 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface Student {
  id: number;
  roll_number: string;
  name: string;
  email: string;
  course: string;
  age: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'plan' | 'preview' | 'endpoints'>('plan');
  
  // Interactive prototype preview state
  const [students, setStudents] = useState<Student[]>([
    { id: 1, roll_number: 'CS202601', name: 'Aarav Sharma', email: 'aarav.sharma@college.edu', course: 'Computer Science', age: 20 },
    { id: 2, roll_number: 'CS202602', name: 'Diya Patel', email: 'diya.patel@college.edu', course: 'Information Technology', age: 21 },
    { id: 3, roll_number: 'CS202603', name: 'Rohan Verma', email: 'rohan.verma@college.edu', course: 'Computer Science', age: 20 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ roll_number: '', name: '', email: '', course: 'Computer Science', age: '' });
  const [validationError, setValidationError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.roll_number.trim() || !formData.name.trim() || !formData.email.trim() || !formData.age) {
      setValidationError('All fields are mandatory.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 99) {
      setValidationError('Age must be a valid number between 16 and 99.');
      return;
    }

    // Check duplicate roll number
    const isDuplicate = students.some(s => 
      s.roll_number.toLowerCase() === formData.roll_number.trim().toLowerCase() &&
      (!editingStudent || s.id !== editingStudent.id)
    );
    if (isDuplicate) {
      setValidationError(`Roll Number "${formData.roll_number}" is already registered.`);
      return;
    }

    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? {
        ...s,
        roll_number: formData.roll_number.trim().toUpperCase(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        course: formData.course,
        age: ageNum
      } : s));
      setFeedbackMessage('Student record updated successfully!');
    } else {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      const newRecord: Student = {
        id: newId,
        roll_number: formData.roll_number.trim().toUpperCase(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        course: formData.course,
        age: ageNum
      };
      setStudents(prev => [...prev, newRecord]);
      setFeedbackMessage('New student record created successfully!');
    }

    setTimeout(() => setFeedbackMessage(null), 3500);
    setShowAddModal(false);
    setEditingStudent(null);
    setFormData({ roll_number: '', name: '', email: '', course: 'Computer Science', age: '' });
  };

  const handleStartEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      roll_number: student.roll_number,
      name: student.name,
      email: student.email,
      course: student.course,
      age: student.age.toString()
    });
    setValidationError('');
    setShowAddModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setFeedbackMessage('Student record deleted successfully.');
      setTimeout(() => setFeedbackMessage(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-stone-900 leading-tight">
                Student Management System
              </h1>
              <p className="text-xs text-stone-500">
                Full-Stack CRUD SOP Guide • React + Django REST Framework + SQLite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="tab-plan"
              onClick={() => setActiveTab('plan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'plan' 
                  ? 'bg-stone-900 text-white shadow-xs' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Phase 1: Project Plan
            </button>
            <button
              id="tab-endpoints"
              onClick={() => setActiveTab('endpoints')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'endpoints' 
                  ? 'bg-stone-900 text-white shadow-xs' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              API & DB Architecture
            </button>
            <button
              id="tab-preview"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'preview' 
                  ? 'bg-amber-700 text-white shadow-xs' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Live App Simulation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {feedbackMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* TAB 1: PHASE 1 PROJECT PLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            {/* Phase Banner */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-md mb-2">
                    Phase 1 of 16 • Project Foundation
                  </span>
                  <h2 className="text-2xl font-bold text-stone-900">
                    College Project Blueprint & Specification
                  </h2>
                  <p className="text-sm text-stone-600 mt-1">
                    Carefully tailored for academic evaluation, viva questions, and strict compliance with the Full-Stack CRUD SOP.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-medium text-stone-500">Status</div>
                    <div className="text-sm font-semibold text-emerald-700">Ready for Confirmation</div>
                  </div>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    View UI Preview <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 12 Key Spec Points Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <FileText className="w-4 h-4 text-amber-700" />
                    1. Project Title
                  </div>
                  <p className="text-sm text-stone-700 font-medium">Student Management System (SMS)</p>
                  <p className="text-xs text-stone-500 mt-1">
                    A centralized, clean management system for student records with complete CRUD capabilities.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    2. Problem Statement
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Colleges and academic departments often record student admissions and details manually or via spreadsheets, resulting in data inconsistency, duplicate roll numbers, and slow record retrieval.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    3. Project Objectives
                  </div>
                  <ul className="text-xs text-stone-600 list-disc list-inside space-y-1">
                    <li>Provide full Create, Read, Update, Delete features.</li>
                    <li>Prevent duplicate roll numbers and bad inputs.</li>
                    <li>Deliver instant responsive search and filtering.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Users className="w-4 h-4 text-amber-700" />
                    4. Target Users
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    College administrators, department coordinators, academic clerks, and faculty supervisors who manage student enrollment rosters.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Layers className="w-4 h-4 text-amber-700" />
                    5. Main Features
                  </div>
                  <ul className="text-xs text-stone-600 list-disc list-inside space-y-1">
                    <li>Add student with client & server validation</li>
                    <li>Student list table with live instant filter</li>
                    <li>Update existing records in a dedicated modal/form</li>
                    <li>Safe delete with user confirmation</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Server className="w-4 h-4 text-amber-700" />
                    6. Tech Stack
                  </div>
                  <div className="text-xs text-stone-600 space-y-1">
                    <div><strong>Frontend:</strong> React 19 + Tailwind CSS</div>
                    <div><strong>Backend:</strong> Python 3 + Django 5 + DRF</div>
                    <div><strong>Database:</strong> SQLite (file-based relational)</div>
                    <div><strong>Tools:</strong> Postman + Git / GitHub</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Entity, Architecture & Folder Structure Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Architecture & Workflow */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
                <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-700" />
                  System Architecture & Data Flow
                </h3>
                <div className="p-3 bg-stone-900 text-stone-200 font-mono text-xs rounded-lg overflow-x-auto leading-relaxed">
                  {`[React Frontend: Port 3000 / 5173]
          │
          │ HTTP JSON (fetch / Axios)
          ▼
[Django REST Framework Backend: Port 8000]
  ├── urls.py      (Routes URL to ViewSet)
  ├── views.py     (Handles GET/POST/PUT/DELETE)
  ├── serializers.py (Validates & transforms JSON <-> Model)
  └── models.py    (Defines Student schema)
          │
          │ Django ORM SQL queries
          ▼
[SQLite Database: db.sqlite3]`}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong>Why this architecture?</strong> Separation of concerns allows the React user interface to remain reactive and decoupled from server code. The Django REST API provides secure data validation and database persistence using the SQLite engine.
                </p>
              </div>

              {/* Folder Structure */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
                <h3 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-amber-700" />
                  Recommended Project Folder Structure
                </h3>
                <div className="p-3 bg-stone-900 text-stone-200 font-mono text-xs rounded-lg overflow-x-auto leading-relaxed">
                  {`student_management_project/
├── backend/
│   ├── manage.py
│   ├── backend/               # Django config (settings.py, urls.py)
│   ├── students/              # Django App
│   │   ├── models.py          # Student model
│   │   ├── serializers.py     # StudentSerializer
│   │   ├── views.py           # StudentViewSet
│   │   └── urls.py            # API routes
│   └── requirements.txt
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.tsx / App.jsx  # Main Dashboard
│   │   ├── components/        # Table, Form, Navbar
│   │   └── api.js             # API helper functions
│   └── index.html
└── README.md`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENDPOINTS & DATABASE DESIGN */}
        {activeTab === 'endpoints' && (
          <div className="space-y-6">
            {/* Database Table Spec */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-700" />
                SQLite Database Schema — Table: `students_student`
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Designed to maintain academic integrity with unique constraints and data type safety.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-stone-200 rounded-lg">
                  <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">Field Name</th>
                      <th className="p-3">Data Type</th>
                      <th className="p-3">Constraints</th>
                      <th className="p-3">Description & Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-600">
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-medium text-stone-900">id</td>
                      <td className="p-3 font-mono">INTEGER</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[10px]">PRIMARY KEY, AUTOINCREMENT</span></td>
                      <td className="p-3">Unique auto-generated ID for internal referencing</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-mono font-medium text-stone-900">roll_number</td>
                      <td className="p-3 font-mono">VARCHAR(20)</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">NOT NULL, UNIQUE</span></td>
                      <td className="p-3">Institutional student roll/registration number (e.g., CS202601)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-medium text-stone-900">name</td>
                      <td className="p-3 font-mono">VARCHAR(100)</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">NOT NULL</span></td>
                      <td className="p-3">Full legal name of the student</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-mono font-medium text-stone-900">email</td>
                      <td className="p-3 font-mono">VARCHAR(100)</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">NOT NULL, UNIQUE</span></td>
                      <td className="p-3">Student college email (standard email format)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-medium text-stone-900">course</td>
                      <td className="p-3 font-mono">VARCHAR(50)</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">NOT NULL</span></td>
                      <td className="p-3">Enrolled academic program/department</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-mono font-medium text-stone-900">age</td>
                      <td className="p-3 font-mono">INTEGER</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">NOT NULL</span></td>
                      <td className="p-3">Student age (positive integer between 16 and 99)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* REST API Endpoints Table */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-700" />
                Complete REST API Specification
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Follows standardized RESTful routing patterns provided by Django REST Framework's DefaultRouter.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold font-mono bg-blue-100 text-blue-800 rounded">GET</span>
                    <span className="text-xs font-mono text-stone-500">/api/students/</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800">List All Students</div>
                  <p className="text-xs text-stone-500 mt-1">Retrieves JSON array of all registered students with 200 OK.</p>
                </div>

                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold font-mono bg-emerald-100 text-emerald-800 rounded">POST</span>
                    <span className="text-xs font-mono text-stone-500">/api/students/</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800">Create New Student</div>
                  <p className="text-xs text-stone-500 mt-1">Validates input JSON and inserts record with 201 Created.</p>
                </div>

                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold font-mono bg-blue-100 text-blue-800 rounded">GET</span>
                    <span className="text-xs font-mono text-stone-500">/api/students/{`{id}`}/</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800">Retrieve Single Student</div>
                  <p className="text-xs text-stone-500 mt-1">Fetches student details by primary key ID or returns 404.</p>
                </div>

                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold font-mono bg-amber-100 text-amber-800 rounded">PUT / PATCH</span>
                    <span className="text-xs font-mono text-stone-500">/api/students/{`{id}`}/</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800">Update Student Record</div>
                  <p className="text-xs text-stone-500 mt-1">Validates updated fields and updates database record with 200 OK.</p>
                </div>

                <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-xs font-bold font-mono bg-rose-100 text-rose-800 rounded">DELETE</span>
                    <span className="text-xs font-mono text-stone-500">/api/students/{`{id}`}/</span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800">Delete Student Record</div>
                  <p className="text-xs text-stone-500 mt-1">Removes record from SQLite table and returns 204 No Content.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CRUD APP SIMULATION */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Student Directory</h2>
                  <p className="text-xs text-stone-500">
                    Live interactive simulation showing the exact UI & validation rules of the React frontend.
                  </p>
                </div>
                <button
                  id="btn-add-student"
                  onClick={() => {
                    setEditingStudent(null);
                    setFormData({ roll_number: '', name: '', email: '', course: 'Computer Science', age: '' });
                    setValidationError('');
                    setShowAddModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add Student Record
                </button>
              </div>

              {/* Search Box */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  id="input-search"
                  type="text"
                  placeholder="Search by student name, roll number, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              {/* Student Table */}
              <div className="overflow-x-auto border border-stone-200 rounded-lg">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-100 text-stone-800 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Roll Number</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Course / Branch</th>
                      <th className="p-3">Age</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-stone-50 transition-colors">
                          <td className="p-3 font-mono text-stone-400">#{student.id}</td>
                          <td className="p-3 font-mono font-medium text-stone-900">{student.roll_number}</td>
                          <td className="p-3 font-medium text-stone-900">{student.name}</td>
                          <td className="p-3 text-stone-600">{student.email}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px]">
                              {student.course}
                            </span>
                          </td>
                          <td className="p-3">{student.age}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                id={`edit-btn-${student.id}`}
                                onClick={() => handleStartEdit(student)}
                                className="p-1.5 text-stone-600 hover:text-amber-800 hover:bg-stone-100 rounded"
                                title="Edit record"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                id={`delete-btn-${student.id}`}
                                onClick={() => handleDelete(student.id)}
                                className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded"
                                title="Delete record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-stone-400 text-xs">
                          No student records found matching "{searchTerm}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Form for Add/Edit */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-stone-200">
              <h3 className="text-base font-bold text-stone-900 mb-1">
                {editingStudent ? 'Edit Student Record' : 'Register New Student'}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Fill in the details below. All fields undergo validation.
              </p>

              {validationError && (
                <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <form onSubmit={handleSaveStudent} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Roll Number *</label>
                  <input
                    id="input-roll-number"
                    type="text"
                    placeholder="e.g. CS202604"
                    value={formData.roll_number}
                    onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                  <input
                    id="input-name"
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                  <input
                    id="input-email"
                    type="email"
                    placeholder="e.g. priya.sharma@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Course *</label>
                    <select
                      id="select-course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Comm.">Electronics & Comm.</option>
                      <option value="Mechanical Engg.">Mechanical Engg.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Age *</label>
                    <input
                      id="input-age"
                      type="number"
                      placeholder="e.g. 20"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-amber-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-stone-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-medium shadow-xs"
                  >
                    {editingStudent ? 'Update Record' : 'Create Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-3 text-center text-xs text-stone-500">
        College Activity SOP: Full-Stack CRUD Application Development • Ready for Step-by-Step Execution
      </footer>
    </div>
  );
}
