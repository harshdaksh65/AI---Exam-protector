import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from './../../components/shared/BlankCard';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import NumberOfQuestions from './components/NumberOfQuestions';
import WebCam from './components/WebCam';

const TestPage = () => {
  return (
    <PageContainer title="TestPage" description="this is TestPage">
      <div className="pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 col-span-12">
            <BlankCard>
              <div className="w-full min-h-[400px] shadow-lg flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl mx-auto">
                  <MultipleChoiceQuestion />
                </div>
              </div>
            </BlankCard>
          </div>
          <div className="md:col-span-5 col-span-12">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <BlankCard>
                  <div className="max-h-[300px] flex flex-col items-end justify-center overflow-y-auto h-full">
                    <NumberOfQuestions />
                  </div>
                </BlankCard>
              </div>
              <div>
                <BlankCard>
                  <div className="w-full max-h-[300px] shadow-lg flex flex-col items-center justify-center">
                    <div className="w-full max-w-md mx-auto">
                      <WebCam />
                    </div>
                  </div>
                </BlankCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TestPage;
