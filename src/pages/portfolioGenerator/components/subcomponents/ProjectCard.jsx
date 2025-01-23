import React, { useState } from "react";
import {
  Trash2,
  Link,
  Github,
  BookOpen,
  Folder,
  PenTool,
  ListChecks,
  AlertTriangle,
  Globe,
  X,
  Plus,
  Save,
  ImagePlus,
} from "lucide-react";
import { toast } from "react-toastify";
import { config } from "../../../../config/api";
import axios from "axios";
import DeleteCard from "./DeleteCard";
import General from "../../../../config/general";

const inputClass =
  "w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent text-white placeholder-gray-400";

export const ProjectCard = ({
  setFormData,
  formData,
  index,
  project,
  setFlag,
}) => {
  const [toolInput, setToolInput] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const addTool = (e) => {
    if (e) e.preventDefault();
    if (!toolInput.trim()) return;

    const newProjects = [...formData.projects];
    const tools = newProjects[index].tools || [];
    if (!tools.includes(toolInput.trim())) {
      newProjects[index].tools = [...tools, toolInput.trim()];
      setFormData({ ...formData, projects: newProjects });
    }
    setToolInput("");
  };

  const removeTool = (toolToRemove) => {
    const newProjects = [...formData.projects];
    newProjects[index].tools = newProjects[index].tools.filter(
      (tool) => tool !== toolToRemove
    );
    setFormData({ ...formData, projects: newProjects });
  };

  const addFeature = () => {
    const newProjects = [...formData.projects];
    newProjects[index].features = [...(newProjects[index].features || []), ""];
    setFormData({ ...formData, projects: newProjects });
  };

  const removeFeature = (featureIndex) => {
    const newProjects = [...formData.projects];
    newProjects[index].features.splice(featureIndex, 1);
    setFormData({ ...formData, projects: newProjects });
  };

  const updateChallenge = (challengeIndex, value) => {
    const newProjects = [...formData.projects];
    newProjects[index].challenges[challengeIndex] = {
      ...newProjects[index].challenges[challengeIndex],
      description: value,
    };
    setFormData({ ...formData, projects: newProjects });
  };

  const removeChallenge = (challengeIndex) => {
    const newProjects = [...formData.projects];
    newProjects[index].challenges.splice(challengeIndex, 1);
    setFormData({ ...formData, projects: newProjects });
  };

  const addChallenge = () => {
    const newProjects = [...formData.projects];
    if (!newProjects[index].challenges) {
      newProjects[index].challenges = [];
    }
    newProjects[index].challenges.push({ description: "" });
    setFormData({ ...formData, projects: newProjects });
  };

  const removeProject = (index) => {
    if (project.projectId) {
      setIsDeleted(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
      }));
    }
  };

  const updateProjectCard = async () => {
    if (!project.title || !project.role) {
      toast.error("Title and Role are required fields");
      return;
    }

    if (!project.projectId) {
      addProjectCard();
      return;
    }

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${General.getPortfolioId()}/project/${
          project.projectId
        }?userId=${General.getUserId()}`,
        project
      );

      if (response.data.success) {
        toast.success("Project Information Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const addProjectCard = async () => {
    try {
      const response = await axios.post(
        `${
          config.BASE_URL
        }api/portfolio/${General.getPortfolioId()}/project?userId=${General.getUserId()}`,
        project
      );

      if (response.data.success) {
        toast.success("Added Project Information");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const removeProjectCardFromApi = async () => {
    if (!project && !project.projectId) return;

    try {
      const headers = {
        token: General.getAccessToken(),
      };

      const response = await axios.delete(
        `${config.BASE_URL}api/portfolio/${General.getPortfolioId()}/project/${
          project.projectId
        }?userId=${General.getUserId()}`,
        { headers }
      );

      if (response.data.success) {
        toast.success("Experience Information Removed Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" space-y-6 mb-6">
      <div className="space-y-6">
        {isDeleted && (
          <DeleteCard
            callback={() => removeProjectCardFromApi()}
            cancelCallback={() => setIsDeleted(false)}
            title={"Remove Project"}
            desc={"Are you sure you want to remove this Project?"}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white ">
              Project Title
            </label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter project title"
                value={project.title}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].title = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className={inputClass}
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white ">
              Your Role
            </label>
            <div className="relative">
              <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Your role in the project"
                value={project.role}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].role = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className={inputClass}
              />
            </div>
          </div>

          {/* Project Type Select */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white ">
              Project Type
            </label>
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={project.type}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].type = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className="w-full pl-10 pr-10 py-3 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-gray-800 text-white"
              >
                <option value="">Select Project Type</option>
                <option value="Personal">Personal</option>
                <option value="Professional">Professional</option>
                <option value="Academic">Academic</option>
                <option value="Open Source">Open Source</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white ">
              Project Status
            </label>
            <div className="relative">
              <ListChecks className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={project.status}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].status = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className="w-full pl-10 pr-10 py-3 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-gray-800 text-white"
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Project Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Project Description
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              placeholder="Describe your project..."
              value={project.description}
              onChange={(e) => {
                const newProjects = [...formData.projects];
                newProjects[index].description = e.target.value;
                setFormData({ ...formData, projects: newProjects });
              }}
              className="w-full pl-10 pr-4 py-2 min-h-[120px] text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent text-white placeholder:text-gray-400"
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Tools & Technologies
          </label>
          <div className="space-y-3">
            <form onSubmit={addTool} className="flex gap-2">
              <div className="relative flex-1">
                <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Type a tool name and press Enter or click Add"
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTool();
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent text-white placeholder:text-gray-400"
                />
              </div>
              <button
                type="button" // Change from type="submit" to type="button"
                onClick={addTool}
                disabled={!toolInput.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
              >
                Add Tool
              </button>
            </form>

            {/* Display Tools */}
            <div className="flex flex-wrap gap-2">
              {project?.tools?.map((tool, toolIndex) => (
                <span
                  key={toolIndex}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-transparent text-white rounded-lg border border-purple-700 group"
                >
                  <PenTool className="w-4 h-4" />
                  {tool}
                  <button
                    type="button"
                    onClick={() => removeTool(tool)}
                    className="p-0.5  rounded-full text-purple-600 hover:text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {(!project?.tools || project.tools.length === 0) && (
                <div className="border border-dashed border-gray-400 p-4 rounded-md">
                  <p className="text-sm text-gray-400 italic py-2">
                    No tools added yet. Type a tool name and press Enter or
                    click Add Tool.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-white ">
              Key Features
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>
          <div className="space-y-3">
            {project?.features?.map((feature, featureIndex) => (
              <div key={featureIndex} className="relative">
                <ListChecks className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter feature description"
                    value={feature}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].features[featureIndex] =
                        e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(featureIndex)}
                    className="p-2 text-gray-400 hover:text-red-500  rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {project?.features?.length === 0 && (
              <div className="border border-dashed border-gray-400 p-4 rounded-md">
                <p className="text-sm text-gray-400 italic text-center py-2">
                  No features added yet. Click 'Add Feature' to begin.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-white ">
              Project Images
            </label>
            <button
              type="button"
              onClick={() => {
                const newProjects = [...formData.projects];
                if (!newProjects[index].images) {
                  newProjects[index].images = [];
                }
                newProjects[index].images.push("");
                setFormData({ ...formData, projects: newProjects });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
            >
              <ImagePlus className="w-4 h-4" />
              Add Image
            </button>
          </div>
          <div className="space-y-3">
            {project?.images?.map((image, imageIndex) => (
              <div key={imageIndex} className="relative">
                <ImagePlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => {
                      const newProjects = [...formData.projects];
                      newProjects[index].images[imageIndex] = e.target.value;
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newProjects = [...formData.projects];
                      newProjects[index].images.splice(imageIndex, 1);
                      setFormData({ ...formData, projects: newProjects });
                    }}
                    className="p-2 text-gray-400 hover:text-red-500  rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {(!project?.images || project.images.length === 0) && (
              <div className="border border-dashed border-gray-400 p-4 rounded-md">
                <p className="text-sm text-gray-400 italic text-center py-2">
                  No images added yet. Click 'Add Image' to begin.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-white ">
              Challenges Faced
            </label>
            <button
              type="button"
              onClick={addChallenge}
              className="inline-flex items-center gap-2 px-4 py-2 h-12  bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border-2 hover:border-blue-500/50 hover:bg-gray-800/50 hover:backdrop-blur-lg hover:shadow-md hover:shadow-blue-500/20  duration-300 text-blue-400 hover:scale-105 border-blue-500/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Challenge
            </button>
          </div>
          <div className="space-y-3">
            {project?.challenges?.map((challenge, challengeIndex) => (
              <div key={challengeIndex} className="relative">
                <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter challenge description"
                    value={challenge?.description || ""}
                    onChange={(e) =>
                      updateChallenge(challengeIndex, e.target.value)
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => removeChallenge(challengeIndex)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {project?.challenges?.length === 0 && (
              <div className="border border-dashed border-gray-400 p-4 rounded-md">
                <p className="text-sm text-gray-500 italic text-center py-2">
                  No challenges added yet. Click 'Add Challenge' to begin.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Project Links */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white ">
            Project Links
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Live Demo URL */}
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                placeholder="Live Demo URL"
                value={project?.links?.live}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].links.live = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className={inputClass}
              />
            </div>

            {/* GitHub URL */}
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                placeholder="GitHub Repository URL"
                value={project?.links?.github}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].links.github = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className={inputClass}
              />
            </div>

            {/* Documentation URL */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                placeholder="Documentation URL"
                value={project?.links?.documentation}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].links.documentation = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <button
            type="button"
            onClick={updateProjectCard}
            className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-transparent border border-gray-300 rounded-lg border-blue-500/50 transition-colors text-blue-500"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            type="button"
            onClick={() => removeProject(index)}
            className="inline-flex items-center gap-2 px-4 py-2 h-12 bg-red-500 rounded-lg hover:bg-red-700 transition-colors text-white"
          >
            <Trash2 className="w-4 h-4" />
            Remove Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
