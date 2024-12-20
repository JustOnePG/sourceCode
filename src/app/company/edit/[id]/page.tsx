import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Company } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { Container } from 'react-bootstrap';
import EditCompanyForm from '@/components/EditCompanyForm';

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);
  const company: Company | null = await prisma.company.findUnique({
    where: { id },
  });
  if (!company) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <EditCompanyForm company={company} />
      </Container>
    </main>
  );
}
