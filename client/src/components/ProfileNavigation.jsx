// ProfileNavigation.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function ProfileNavigation({ steps, currentStep, setCurrentStep }) {
  return (
    <nav className="profile-navigation">
      {steps.map((StepComponent, index) => (
        <button
          key={index}
          className={`nav-button ${currentStep === index ? "active" : ""}`}
          onClick={() => setCurrentStep(index)}
        >
          {currentStep > index && <FontAwesomeIcon icon={faChevronLeft} />}
          {StepComponent.name.replace(/([A-Z])/g, " $1").trim()}
          {currentStep < index && <FontAwesomeIcon icon={faChevronRight} />}
        </button>
      ))}
    </nav>
  );
}

ProfileNavigation.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.elementType).isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default ProfileNavigation;
