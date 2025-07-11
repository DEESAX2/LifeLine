import React, { useState, useEffect } from 'react';

// Convert raw events saved by AdminEvents to the shape required here
const normalizeDrives = (data) => data.map((d, idx) => ({
  id: d.id || idx + 1,
  date: d.date,
  city: d.city || d.location || d.title || 'Unknown',
  venue: d.venue || d.location || '-',
  bloodTypes: d.bloodTypes || 'All',
  map: d.map || '#'
}));
import { useTranslation } from 'react-i18next';


const seedDrives = [
  {
    id: 1,
    date: '2025-07-12',
    city: 'Accra',
    venue: 'Korle Bu Teaching Hospital',
    bloodTypes: 'All',
    map: 'https://www.bing.com/maps?q=korle+bu+teaching+hospital+ghana&FORM=HDRSC6&cp=5.537139%7E-0.22891&lvl=16.0#'
  },
  {
    id: 2,
    date: '2025-08-01',
    city: 'Kumasi',
    venue: 'Komfo Anokye Hall',
    bloodTypes: 'O-, A- priority',
    map: 'https://www.bing.com/maps?&mepi=109~Healthcare~TopOfPage~Map_Image&ty=18&q=Komfo%20Anokye%20Teaching%20Hospital&ss=ypid.YN8065x9372756761015973342&ppois=6.697387218475342_-1.6291334629058838_Komfo%20Anokye%20Teaching%20Hospital_YN8065x9372756761015973342~&cp=6.697387~-1.629133&lvl=16&v=2&sV=1&FORM=MPSRPL'
  },
  {
    id: 3,
    date: '2025-09-06',
    city: 'Cape Coast',
    venue: 'Regional Hospital Grounds',
    bloodTypes: 'B+, AB+',
    map: 'https://www.bing.com/maps?&mepi=109~Healthcare~TopOfPage~Map_Image&ty=18&q=RIDGE%20Regional%20Hospital&ss=ypid.YN8065x4386191301386081444&ppois=5.56253719329834_-0.20038600265979767_RIDGE%20Regional%20Hospital_YN8065x4386191301386081444~&cp=5.562537~-0.200386&lvl=16&v=2&sV=1&FORM=MPSRPL'
  }
];

const DriveCard = ({ drive }) => {
  const { t } = useTranslation();
  return (
  <div className="bg-white rounded shadow p-6 flex flex-col gap-2">
    <div className="text-sm text-gray-500">{new Date(drive.date).toLocaleDateString()}</div>
    <h3 className="text-xl font-semibold text-red-600">{drive.city}</h3>
    <p className="text-gray-800">{drive.venue}</p>
    <p className="text-gray-600 text-sm">{t('needed')}: {drive.bloodTypes}</p>
    <a
      href={drive.map}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      {t('viewMap')}
    </a>
  </div>
  );
};

const UpcomingDrives = () => {
  const { t } = useTranslation();
  const [drives, setDrives] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('drives'));
      return Array.isArray(saved) && saved.length ? normalizeDrives(saved) : seedDrives;
    } catch {
      return seedDrives;
    }
  });
  // Listen for storage changes (when AdminEvents is open in another tab)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'drives') {
        try {
          const data = JSON.parse(e.newValue);
          if (Array.isArray(data)) setDrives(normalizeDrives(data));
        } catch {}
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
  return (
    <section className="bg-gray-100 py-12 px-4" id="drives">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">{t('upcomingBloodDrives')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drives.map((d) => (
            <DriveCard key={d.id} drive={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingDrives;
