import { useSettings } from "./context/settingsContext";

const App = () => {
  const { iPartSettings, productSettings } = useSettings();

  return (
    <div className="flex w-full flex-col">
      <h1>Test</h1>
    </div>
  );
};

export default App;
