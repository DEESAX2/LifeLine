import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const bloodTypes = [
  { type: 'O-', donateTo: 'All types', receiveFrom: 'O-' },
  { type: 'O+', donateTo: 'O+, A+, B+, AB+', receiveFrom: 'O+, O-' },
  { type: 'A-', donateTo: 'A+, A-, AB+, AB-', receiveFrom: 'A-, O-' },
  { type: 'A+', donateTo: 'A+, AB+', receiveFrom: 'A+, A-, O+, O-' },
  { type: 'B-', donateTo: 'B+, B-, AB+, AB-', receiveFrom: 'B-, O-' },
  { type: 'B+', donateTo: 'B+, AB+', receiveFrom: 'B+, B-, O+, O-' },
  { type: 'AB-', donateTo: 'AB+, AB-', receiveFrom: 'AB-, A-, B-, O-' },
  { type: 'AB+', donateTo: 'AB+', receiveFrom: 'All types' }
];

const BloodTypeCompatibility = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className="bg-white py-12 px-4" id="compatibility">
      <div className={`max-w-5xl mx-auto text-center transform transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h2 className="text-3xl font-bold text-red-600 mb-8">{t('bloodTypeCompatibility')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-red-100">{t('bloodType')}</th>
                <th className="border px-4 py-2 bg-red-100">{t('canDonateTo')}</th>
                <th className="border px-4 py-2 bg-red-100">{t('canReceiveFrom')}</th>
              </tr>
            </thead>
            <tbody>
              {bloodTypes.map((row, idx) => (
                <tr
                  key={row.type}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                >
                  <td className="border px-4 py-2 font-semibold text-red-600">{row.type}</td>
                  <td className="border px-4 py-2 text-gray-700">{row.donateTo}</td>
                  <td className="border px-4 py-2 text-gray-700">{row.receiveFrom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BloodTypeCompatibility;
