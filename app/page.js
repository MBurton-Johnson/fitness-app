import React from 'react';
import NutritionPage from './nutrition/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <NutritionPage />
    </main>
  )
}
