// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import { TooltipProvider } from './components/ui/tooltip';
import ProjectTable from './components/project-table';

function Counter() {
  
  return (
    <div className="bg-gray-900 text-amber-50">
      {/* <TooltipProvider>
        <DashBoard></DashBoard>
      </TooltipProvider> */}
      <ProjectTable></ProjectTable>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Counter />} />
    </Routes>
  );
}
