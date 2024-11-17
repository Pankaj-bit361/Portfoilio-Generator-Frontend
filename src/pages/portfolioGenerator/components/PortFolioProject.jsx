import React from "react";
import { Plus } from "lucide-react";
import ProjectCard from "./subcomponents/ProjectCard";

const PortfolioProject = ({ formData, setFormData, setFlag }) => {
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          role: "",
          type: "",
          status: "",
          tools: [],
          features: [],
          challenges: [],
          links: {
            live: "",
            github: "",
            documentation: "",
          },
        },
      ],
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg  q-box-shawdow">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
          <p className="text-sm text-gray-500">
            Add your significant projects to showcase your work
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {formData?.projects?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="space-y-1">
              <p className="text-base font-medium text-gray-900">
                No projects added yet
              </p>
              <p className="text-sm text-gray-500">
                Get started by clicking the "Add Project" button above
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {formData?.projects?.map((project, index) => (
              <ProjectCard
                key={index}
                index={index}
                project={project}
                formData={formData}
                setFormData={setFormData}
                setFlag={setFlag}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Add Button (shown when there are projects) */}
      {formData?.projects?.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          >
            <Plus className="w-5 h-5" />
            Add Another Project
          </button>
        </div>
      )}

      {/* Projects Summary (shown when there are projects) */}
      {formData?.projects?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Total Projects: {formData.projects.length}</span>
            <span>
              {formData.projects.filter((p) => p.status === "Completed").length}{" "}
              Completed,{" "}
              {
                formData.projects.filter((p) => p.status === "In Progress")
                  .length
              }{" "}
              In Progress
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioProject;
