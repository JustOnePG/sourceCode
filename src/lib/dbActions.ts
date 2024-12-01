'use server';

import { Company } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addStudent(student: {
  name: string;
  skills: string;
  location: string;
  professionalPage: string;
  owner: string;
}) {
  await prisma.student.create({
    data: {
      name: student.name,
      skills: student.skills.split(','),
      location: student.location,
      professionalPage: student.professionalPage,
      owner: student.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/student');
}

export async function editStudent(student: {
  id: number;
  name: string;
  skills: string;
  location: string;
  professionalPage: string;
  owner: string;
}) {
  await prisma.student.update({
    where: { id: student.id },
    data: {
      name: student.name,
      skills: student.skills.split(','),
      location: student.location,
      professionalPage: student.professionalPage,
      owner: student.owner,
    },
  });
  // After updating, redirect to the list page
  redirect('/student');
}

export async function addCompany(company: {
  name: string;
  overview: string;
  location: string;
  links: string;
  emails: string;
  owner: string;
}) {
  await prisma.company.create({
    data: {
      name: company.name,
      overview: company.overview,
      location: company.location,
      links: company.links.split(','),
      emails: company.emails.split(','),
      owner: company.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/company');
}

export async function editCompany(company: Company) {
  await prisma.company.update({
    where: { id: company.id },
    data: {
      name: company.name,
      overview: company.overview,
      location: company.location,
      links: company.links,
      emails: company.emails,
      owner: company.owner,
    },
  });
  // After updating, redirect to the list page
  redirect('/company');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
