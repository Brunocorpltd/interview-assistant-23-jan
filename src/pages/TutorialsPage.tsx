import React from 'react';
import Layout from '../components/layout/Layout';
import TutorialList from '../components/tutorials/TutorialList';
import TutorialPopup from '../components/tutorials/TutorialPopup';
import { useTutorialPopups } from '../hooks/useTutorialPopups';

const tutorialSteps = [
  {
    title: "Follow the 3 quick steps before your live interview",
    steps: [
      {
        number: 1,
        text: "Ensure your browser's microphone and camera permissions are granted prior to the interview.",
        isTest: true
      }
    ],
    videoPlaceholder: true
  },
  {
    title: "Follow the 3 quick steps before your live interview",
    steps: [
      {
        number: 2,
        text: "Join the video interview (Zoom/ Meet/ Teams) from your browser (not from the desktop or mobile app)"
      }
    ],
    videoPlaceholder: true
  },
  {
    title: "Follow the 3 quick steps before your live interview",
    steps: [
      {
        number: 3,
        text: "Share the audio from the active browser tab that runs the video interview. (Meet/ Zoom/ Teams)"
      }
    ],
    videoPlaceholder: true,
    customButton: {
      text: "Share tab audio",
      action: "share"
    }
  },
  {
    title: "All done. Take a deep breath and relax. Best of luck!",
    steps: [
      {
        number: 0,
        text: "Success: Minimize and dock this tab window and switch back to your interview tab. You can drag and resize the window as needed."
      }
    ],
    note: "Do not share the entire screen from the interview tab if instructed. Share either the tab or window.",
    videoPlaceholder: true,
    customButton: {
      text: "Complete",
      action: "complete"
    }
  }
];

export default function TutorialsPage() {
  const { isOpen, currentStep, handleClose, handleContinue } = useTutorialPopups();

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Watch video tutorials to master InterviewBee
        </h1>
        <TutorialList />

        <TutorialPopup
          isOpen={isOpen}
          onClose={handleClose}
          step={currentStep}
          content={tutorialSteps[currentStep - 1]}
          onContinue={handleContinue}
        />
      </div>
    </Layout>
  );
}