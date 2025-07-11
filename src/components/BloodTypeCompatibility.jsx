import React from 'react';
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
  return (
    <section className="bg-white py-12 px-4" id="compatibility">
      <div className="max-w-5xl mx-auto text-center">
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
              {bloodTypes.map((row) => (
                <tr key={row.type}>
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
