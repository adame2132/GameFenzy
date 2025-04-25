export default function LoginPrompt({ message, swap }) {
    const handlePromptClicked = () => {
      console.log("Prompt was clicked time to switch component view");
      swap();
    };
  
    return (
      <div>
        <button
          className="text-neon font-semibold hover:underline"
          onClick={handlePromptClicked}
        >
          {message}
        </button>
      </div>
    );
  }