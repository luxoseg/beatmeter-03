import { createContext, useContext, useState, ReactNode } from 'react';

interface SurveysContextType {
  answeredSurveys: number[];
  markSurveyAsAnswered: (surveyId: number) => void;
}

const SurveysContext = createContext<SurveysContextType | undefined>(undefined);

export function SurveysProvider({ children }: { children: ReactNode }) {
  const [answeredSurveys, setAnsweredSurveys] = useState<number[]>([]);

  const markSurveyAsAnswered = (surveyId: number) => {
    setAnsweredSurveys(prev => [...prev, surveyId]);
  };

  return (
    <SurveysContext.Provider value={{ answeredSurveys, markSurveyAsAnswered }}>
      {children}
    </SurveysContext.Provider>
  );
}

export function useSurveys() {
  const context = useContext(SurveysContext);
  if (context === undefined) {
    throw new Error('useSurveys must be used within a SurveysProvider');
  }
  return context;
}