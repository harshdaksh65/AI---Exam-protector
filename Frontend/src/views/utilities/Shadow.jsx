import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const shadowLevels = [
  'shadow-none',
  'shadow-sm',
  'shadow',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
  'shadow-2xl',
  'shadow-[0_4px_24px_rgba(0,0,0,0.12)]', // custom
  'shadow-[0_8px_32px_rgba(0,0,0,0.16)]', // custom
  'shadow-[0_16px_48px_rgba(0,0,0,0.20)]', // custom
];

const shadowLabels = [
  'elevation=0',
  'elevation=1',
  'elevation=2',
  'elevation=3',
  'elevation=4',
  'elevation=6',
  'elevation=8',
  'elevation=12',
  'elevation=16',
  'elevation=24',
];

const Shadow = () => {
  return (
    <PageContainer title="Shadow" description="this is Shadow">
      <DashboardCard title="Shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[false, true].map((isDark, idx) => (
            <div key={idx} className={isDark ? 'bg-gray-900 p-4 rounded-xl' : 'bg-gray-100 p-4 rounded-xl'}>
              <div className="grid grid-cols-2 gap-4">
                {shadowLevels.map((shadow, i) => (
                  <div
                    key={shadow}
                    className={`h-16 flex items-center justify-center rounded-lg text-center text-base font-medium ${shadow} ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}
                  >
                    {shadowLabels[i]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
