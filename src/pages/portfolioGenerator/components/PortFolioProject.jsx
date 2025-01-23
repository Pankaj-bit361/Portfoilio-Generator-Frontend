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
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white ">Projects</h3>
          <p className="text-sm text-gray-400 ">
            Add your significant projects to showcase your work
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {formData?.projects?.length === 0 ? (
          <div className="text-center py-12 rounded-lg border-2 border-dashed border-gray-300">
            <div className="space-y-1">
              <p className="text-base font-medium text-gray-500">
                No projects added yet
              </p>
              <p className="text-sm text-gray-400 ">
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
        <div className="mt-6 flex justify-center items-center">
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center p-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg text-white font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transform hover:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Another Project
          </button>
        </div>
      )}

      {/* Projects Summary (shown when there are projects) */}
      {formData?.projects?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-white ">
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
