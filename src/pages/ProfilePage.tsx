import React from 'react';
import Layout from '../components/layout/Layout';
import ProfileForm from '../components/profile/ProfileForm';

export default function ProfilePage() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Your personal data safe with us
        </h1>
        <ProfileForm />
      </div>
    </Layout>
  );
}