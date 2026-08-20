import { RotateCcw } from "lucide-react";

function ResetProgressButton({ onReset }) {
  const handleReset = () => {
    if (
      window.confirm(
        "Czy na pewno chcesz zresetować postęp? Tej operacji nie można cofnąć.",
      )
    ) {
      onReset();
    }
  };

  return (
    <button
      className="stellarium-extractor__reset-button"
      type="button"
      onClick={handleReset}
    >
      <RotateCcw size="1rem" aria-hidden="true" />
      Resetuj postęp
    </button>
  );
}

export default ResetProgressButton;
