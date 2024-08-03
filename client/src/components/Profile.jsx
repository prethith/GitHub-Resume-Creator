import { useState } from "react";
import { useParams } from "react-router-dom";
import PersonalInformation from "./PersonalInformation";
import Repositories from "./Repositories";
import RecentContributions from "./RecentContributions";
import Languages from "./Languages";
import Organizations from "./Organizations";
import ProfileNavigation from "./ProfileNavigation";

const steps = [
  PersonalInformation,
  Repositories,
  RecentContributions,
  Languages,
  Organizations,
];

function Profile() {
  const { username } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const CurrentComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <ProfileNavigation
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <CurrentComponent username={username} />
      <div className="navigation-buttons">
        {currentStep > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
}

export default Profile;
