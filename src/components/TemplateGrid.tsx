import React, { FC } from 'react';
import TemplateCard from './TemplateCard';

interface Template {
  id: string;
  name: string;
  dataset: string;
  description: string;
}

interface TemplateGridProps {
  templates: Template[];
  onEdit: (templateId: string) => void;
  onOpenInPowerBI: (templateId: string) => void; // Renamed prop
  onGenerateGraph: (templateId: string) => void; // New prop
}

const TemplateGrid: FC<TemplateGridProps> = ({ templates, onEdit, onOpenInPowerBI, onGenerateGraph }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          name={template.name}
          dataset={template.dataset}
          onOpenInPowerBI={() => onOpenInPowerBI(template.id)} // Pass renamed prop
          onGenerateGraph={() => onGenerateGraph(template.id)} // Pass new prop
          onCopy={() => alert('Copying template...')}
          onEdit={() => onEdit(template.id)}
          onDelete={() => alert('Deleting template...')}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
