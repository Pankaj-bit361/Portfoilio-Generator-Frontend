import { motion } from 'framer-motion';

function TemplateSelector({ selectedTemplate, onSelect }) {
  

  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimalist design with smooth animations'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Vibrant colors and unique layouts for creative professionals'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional and elegant design for corporate environments'
    }
  ];

  return (
    <div className="template-selector">
      <h3 className="template-title">Choose Your Template</h3>
      <div className="templates-grid">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(template.id)}
          >
            <h4 className="template-name">{template.name}</h4>
            <p className="template-description">{template.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;