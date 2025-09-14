import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';

const typographyVariants = [
  {
    tag: 'h1',
    label: 'h1. Heading',
    size: 'text-4xl',
    line: 'leading-[45px]',
    weight: 'font-semibold',
    info: 'font size: 30 | line-height: 45 | font weight: 500',
  },
  {
    tag: 'h2',
    label: 'h2. Heading',
    size: 'text-3xl',
    line: 'leading-[36px]',
    weight: 'font-semibold',
    info: 'font size: 24 | line-height: 36 | font weight: 500',
  },
  {
    tag: 'h3',
    label: 'h3. Heading',
    size: 'text-2xl',
    line: 'leading-[31.5px]',
    weight: 'font-semibold',
    info: 'font size: 21 | line-height: 31.5 | font weight: 500',
  },
  {
    tag: 'h4',
    label: 'h4. Heading',
    size: 'text-xl',
    line: 'leading-[27px]',
    weight: 'font-semibold',
    info: 'font size: 18 | line-height: 27 | font weight: 500',
  },
  {
    tag: 'h5',
    label: 'h5. Heading',
    size: 'text-lg',
    line: 'leading-[24px]',
    weight: 'font-semibold',
    info: 'font size: 16 | line-height: 24 | font weight: 500',
  },
  {
    tag: 'h6',
    label: 'h6. Heading',
    size: 'text-base',
    line: 'leading-[21px]',
    weight: 'font-semibold',
    info: 'font size: 14 | line-height: 21 | font weight: 500',
  },
  {
    tag: 'span',
    label: 'subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    size: 'text-lg',
    line: 'leading-[28px]',
    weight: 'font-normal',
    info: 'font size: 16 | line-height: 28 | font weight: 400',
  },
  {
    tag: 'span',
    label: 'subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    size: 'text-base',
    line: 'leading-[21px]',
    weight: 'font-normal',
    info: 'font size: 14 | line-height: 21 | font weight: 400',
  },
  {
    tag: 'span',
    label: 'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    size: 'text-lg',
    line: 'leading-[24px]',
    weight: 'font-normal',
    info: 'font size: 16 | line-height: 24 | font weight: 400',
  },
  {
    tag: 'span',
    label: 'body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    size: 'text-base',
    line: 'leading-[20px]',
    weight: 'font-normal',
    info: 'font size: 14 | line-height: 20 | font weight: 400',
  },
  {
    tag: 'span',
    label: 'caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    size: 'text-xs',
    line: 'leading-[19px]',
    weight: 'font-normal',
    info: 'font size: 12 | line-height: 19 | font weight: 400',
  },
  {
    tag: 'span',
    label: 'overline. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    size: 'text-xs uppercase',
    line: 'leading-[31px]',
    weight: 'font-normal',
    info: 'font size: 12 | line-height: 31 | font weight: 400',
  },
];

const colorVariants = [
  { label: 'Text Primary', color: 'text-primary-600' },
  { label: 'Text Secondary', color: 'text-gray-500' },
  { label: 'Text Info', color: 'text-info-600' },
  { label: 'Text Primary', color: 'text-primary-600' },
  { label: 'Text Warning', color: 'text-warning-600' },
  { label: 'Text Error', color: 'text-error-600' },
  { label: 'Text Success', color: 'text-success-600' },
];

const colorTexts = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
];

const TypographyPage = () => {
  return (
    <PageContainer title="Typography" description="this is Typography">
      <div className="grid grid-cols-1 gap-6">
        <DashboardCard title="Default Text">
          <div className="grid grid-cols-1 gap-6">
            {typographyVariants.map((variant, idx) => (
              <BlankCard key={idx}>
                <div className="p-4">
                  {React.createElement(
                    variant.tag,
                    {
                      className: `${variant.size} ${variant.line} ${variant.weight} text-gray-800 dark:text-gray-100 mb-1`,
                    },
                    variant.label
                  )}
                  <div className="text-sm text-gray-500 dark:text-gray-400">{variant.info}</div>
                </div>
              </BlankCard>
            ))}
          </div>
        </DashboardCard>
        <DashboardCard title="Default Text">
          <div className="grid grid-cols-1 gap-6">
            {colorVariants.map((variant, idx) => (
              <BlankCard key={idx}>
                <div className="p-4">
                  <div className={`text-lg font-semibold mb-1 ${variant.color}`}>{variant.label}</div>
                  <div className={`text-base ${variant.color}`}>{colorTexts[idx]}</div>
                </div>
              </BlankCard>
            ))}
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
};

export default TypographyPage;
