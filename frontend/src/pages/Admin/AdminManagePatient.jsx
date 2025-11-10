import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { User, Filter, CalendarDays, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { getAllPatient } from '@/api/admin/adminGetPatient'; // 👈 backend se data fetch karne wali API

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  // const [filterDoctor, setFilterDoctor] = useState('');
  // const [filterSpecialization, setFilterSpecialization] = useState('');
  // const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getAllPatient();
        console.log(res);

        setPatients(res?.patients || []);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  // const filteredPatients = useMemo(() => {
  //   return patients.filter((p) => {
  //     const doctorMatch = filterDoctor ? p.doctorName === filterDoctor : true;
  //     const specMatch = filterSpecialization
  //       ? p.specialization === filterSpecialization
  //       : true;
  //     const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
  //     return doctorMatch && specMatch && searchMatch;
  //   });
  // }, [patients, filterDoctor, filterSpecialization, search]);

  return (
    <div className='space-y-8'>
      {/* ---------- Header ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className='flex items-center justify-between'
      >
        <h1 className='text-2xl font-semibold flex items-center gap-2'>
          <User className='text-emerald-400' /> Manage Patients
        </h1>
        <p className='text-sm text-gray-400'>
          View all registered patients in the system
        </p>
      </motion.div>

      {/* ---------- Filters ---------- */}
      {/* <Card className='p-5 bg-[#101614] border border-emerald-500/10 rounded-2xl flex flex-wrap gap-4 items-center'>
        <div className='flex items-center gap-2'>
          <Filter
            className='text-emerald-400'
            size={16}
          />
          <Input
            placeholder='Search patient by name...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-[#0b0f0e]/80 border border-emerald-500/10 text-gray-300'
          />
        </div>

        <Select onValueChange={setFilterDoctor}>
          <SelectTrigger className='bg-[#0b0f0e]/80 border border-emerald-500/10 text-gray-300 w-[180px]'>
            <SelectValue placeholder='Filter by Doctor' />
          </SelectTrigger>
          <SelectContent className='bg-[#0b0f0e] text-gray-200 border-emerald-500/10'>
            <SelectItem value='Dr. Ali Khan'>Dr. Ali Khan</SelectItem>
            <SelectItem value='Dr. Fatima Noor'>Dr. Fatima Noor</SelectItem>
            <SelectItem value='Dr. Ali Raza'>Dr. Ali Raza</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setFilterSpecialization}>
          <SelectTrigger className='bg-[#0b0f0e]/80 border border-emerald-500/10 text-gray-300 w-[200px]'>
            <SelectValue placeholder='Filter by Specialization' />
          </SelectTrigger>
          <SelectContent className='bg-[#0b0f0e] text-gray-200 border-emerald-500/10'>
            <SelectItem value='Cardiology'>Cardiology</SelectItem>
            <SelectItem value='Pediatrics'>Pediatrics</SelectItem>
            <SelectItem value='Neurology'>Neurology</SelectItem>
          </SelectContent>
        </Select>
      </Card> */}

      {/* ---------- Patient Table ---------- */}
      <Card className='p-6 bg-[#101614] border border-emerald-500/10 rounded-2xl overflow-x-auto'>
        <table className='w-full text-sm text-gray-300'>
          <thead className='text-gray-400 border-b border-emerald-500/10'>
            <tr>
              <th className='py-3 text-left'>Patient Name</th>
              <th className='py-3 text-left'>Email</th>
              <th className='py-3 text-left'>Gender</th>
              <th className='py-3 text-left'>Age</th>
              <th className='py-3 text-left'>Date</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p, i) => (
              <tr
                key={i}
                className='border-b border-emerald-500/5 hover:bg-[#0b0f0e]/40 transition'
              >
                <td className='py-3'>{p.name}</td>
                <td className='py-3'>{p.email}</td>
                <td className='py-3'>{p.gender}</td>
                <td className='py-3'>{p.age}</td>
                <td className='py-3'>{p.createdAt.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {patients.length === 0 && (
          <p className='text-center text-gray-500 py-4'>No patients found.</p>
        )}
      </Card>
    </div>
  );
}
