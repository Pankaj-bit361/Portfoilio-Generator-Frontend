import React from "react";
import {
  Type,
  Sun,
  AlertCircle,
  Text,
  Layout,
  ThermometerSnowflake,
} from "lucide-react";
import { toast } from "react-toastify";
import General from "../../../config/general";

const ColorPicker = ({ label, value, onChange, description }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-white ">
      {label}
      {description && (
        <span className="text-xs text-white  ml-2">{description}</span>
      )}
    </label>
    <div className="flex items-center gap-4 border-none">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="w-14 h-14 rounded-lg cursor-pointer border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7153dc] transition-all p-1 bg-transparent"
        />
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ backgroundColor: value }}
        />
      </div>
      <input
        type="text"
        value={value?.toUpperCase()}
        onChange={(e) => {
          const newValue = e.target.value;
          if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newValue)) {
            onChange({ target: { value: newValue } });
          }
        }}
        className="w-32 px-3 py-2 h-12 text-sm border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors uppercase text-white bg-transparent"
        placeholder="#000000"
      />
    </div>
  </div>
);

const ThemePreview = ({ colors, fonts }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white ">Theme Preview</h4>
        <p className="text-sm text-gray-400">
          Live preview of your selected theme
        </p>
      </div>

      {/* Colors Preview */}
      <div className="space-y-6">
        {/* Primary Colors Row */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400">Primary Colors</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-sm"
                style={{ backgroundColor: colors?.primary }}
              >
                Primary
              </div>
              <p className="text-xs text-center text-white ">
                {colors?.primary}
              </p>
            </div>
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-sm"
                style={{ backgroundColor: colors?.primaryHover }}
              >
                Hover
              </div>
              <p className="text-xs text-center text-white ">
                {colors?.primaryHover}
              </p>
            </div>
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm  text-gray-500"
                style={{ backgroundColor: colors?.accent }}
              >
                Accent
              </div>
              <p className="text-xs text-center text-white ">
                {colors?.accent}
              </p>
            </div>
          </div>
        </div>

        {/* Typography Preview */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-blue-500/50 transition-all duration-300">
          <p className="text-xl font-medium text-gray-300">
            Typography Preview
          </p>
          <div className="space-y-4 mt-4">
            <div className="space-y-2" style={{ fontFamily: fonts?.primary }}>
              <p
                style={{ color: colors?.text }}
                className="text-xl font-semibold text-gray-400"
              >
                Primary Font
              </p>
              <p
                style={{ color: colors?.textLight }}
                className="text-sm text-gray-500"
              >
                This is how your primary font looks in different sizes with main
                and secondary text colors.
              </p>
            </div>
            <div className="space-y-1" style={{ fontFamily: fonts?.secondary }}>
              <p
                style={{ color: colors?.text }}
                className="text-lg font-medium text-gray-400"
              >
                Secondary Font
              </p>
              <p
                style={{ color: colors?.textLight }}
                className="text-sm text-gray-500"
              >
                Your secondary font is used for supporting text content.
              </p>
            </div>
          </div>
        </div>

        {/* Background Preview */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white ">Background Styles</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div
                className="p-4 rounded-lg flex items-center justify-center text-md font-medium shadow-sm text-white"
                style={{ backgroundColor: colors?.bg }}
              >
                <p style={{ color: colors?.text }}>Background Color</p>
              </div>
              <p className="text-xs text-center text-white ">{colors?.bg}</p>
            </div>
            <div className="space-y-2">
              <div
                className="p-4 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm text-gray-500"
                style={{
                  background: `linear-gradient(${colors?.bgGradient})`,
                }}
              >
                <p style={{ color: colors?.text }}>Gradient Background</p>
              </div>
              <p
                className="text-xs text-center text-white  truncate"
                title={colors?.bgGradient}
              >
                {colors?.bgGradient}
              </p>
            </div>
          </div>
        </div>

        {/* Component Examples */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white ">Component Examples</p>
          <div className="space-y-3">
            {/* Button Examples */}
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                style={{
                  backgroundColor: colors?.primary,
                  color: "white",
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium shadow-sm text-gray-500"
                style={{
                  backgroundColor: colors?.secondary,
                  color: colors?.text,
                }}
              >
                Secondary Button
              </button>
            </div>

            {/* Card Example */}
            <div
              className="p-7 rounded-lg shadow-sm border-gray-500 border"
              style={{
                backgroundColor: colors?.bg,
                borderColor: colors?.border,
              }}
            >
              <h5
                style={{
                  color: colors?.text,
                  fontFamily: fonts?.primary,
                }}
                className="text-lg font-semibold mb-4 text-gray-300"
              >
                Card Example
              </h5>
              <p
                style={{
                  color: colors?.textLight,
                  fontFamily: fonts?.secondary,
                }}
                className="text-sm text-gray-500"
              >
                This is how content will look inside a card component.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortFolioTheme = ({ formData, setFormData, setFlag }) => {
  const updateColorValue = (colorKey, value) => {
    setFormData({
      ...formData,
      theme: {
        ...formData.theme,
        colors: {
          ...formData.theme.colors,
          [colorKey]: value,
        },
      },
    });
  };

  const updateTheme = async () => {
    try {
      if (!formData && !formData.theme) return;

      const response = await General.updateTheme(formData.theme);

      if (response.success) {
        toast.success("Theme Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const fontOptions = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Poppins",
    "Montserrat",
    "Lato",
    "Source Sans Pro",
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      {/* Header remains same */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
          {/* Primary Colors Section */}
          <div className="space-y-6">
            <h4 className="flex items-center gap-2 text-lg font-medium text-white ">
              <Sun className="w-5 h-5" />
              Primary Colors
            </h4>

            <ColorPicker
              label="Primary Color"
              value={formData.theme.colors?.primary}
              onChange={(e) => updateColorValue("primary", e.target.value)}
              description="Main brand color"
            />

            <ColorPicker
              label="Primary Hover"
              value={formData.theme.colors?.primaryHover}
              onChange={(e) => updateColorValue("primaryHover", e.target.value)}
              description="Hover state of primary color"
            />

            <ColorPicker
              label="Secondary Color"
              value={formData?.theme?.colors?.secondary}
              onChange={(e) => updateColorValue("secondary", e.target.value)}
              description="Supporting color"
            />

            <ColorPicker
              label="Accent Color"
              value={formData.theme.colors?.accent}
              onChange={(e) => updateColorValue("accent", e.target.value)}
              description="Highlight color"
            />
          </div>

          {/* Text Colors Section */}
          <div className="space-y-6 pt-6 border-t border-gray-200 mt-4 mb-4">
            <h4 className="flex items-center gap-2 text-lg font-medium text-white ">
              <Text className="w-5 h-5" />
              Text Colors
            </h4>

            <ColorPicker
              label="Text Color"
              value={formData.theme.colors?.text}
              onChange={(e) => updateColorValue("text", e.target.value)}
              description="Main text color"
            />

            <ColorPicker
              label="Text Light"
              value={formData.theme.colors?.textLight}
              onChange={(e) => updateColorValue("textLight", e.target.value)}
              description="Secondary text color"
            />
          </div>
        </div>

        <div className="space-y-6">
          <ThemePreview
            colors={formData.theme.colors}
            fonts={formData.theme.fonts}
          />
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 mt-4">
        {/* Background Colors Section */}
        <div className="space-y-6">
          <h4 className="flex items-center gap-2 text-lg font-medium text-white ">
            <Layout className="w-5 h-5" />
            Background Colors
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <ColorPicker
                label="Background"
                value={formData.theme.colors?.bg}
                onChange={(e) => updateColorValue("bg", e.target.value)}
                description="Main background color"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white ">
                Background Gradient
                <span className="text-xs text-white  ml-2">
                  Gradient background effect
                </span>
              </label>
              <input
                type="text"
                value={formData.theme.colors?.bgGradient}
                onChange={(e) => updateColorValue("bgGradient", e.target.value)}
                className="w-full px-3 py-2 h-12 text-sm border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors bg-transparent
                text-white"
                placeholder="from-emerald-50/90 to-white"
              />
            </div>
          </div>
        </div>

        {/* Fonts Section */}
        <div className="space-y-6 pt-6 border-t border-gray-200 mt-4 mb-4">
          <h4 className="flex items-center gap-2 text-lg font-medium text-white ">
            <Type className="w-5 h-5" />
            Typography
          </h4>

          <div className="space-y-6">
            {/* Primary Font */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white ">
                Primary Font
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={formData.theme.fonts.primary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      theme: {
                        ...formData.theme,
                        fonts: {
                          ...formData.theme.fonts,
                          primary: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full pl-10 pr-10 py-2 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-gray-800 text-white placeholder-gray-400"
                >
                  {fontOptions.map((font) => (
                    <option
                      key={font}
                      value={font}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </option>
                  ))}
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

            {/* Secondary Font */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white ">
                Secondary Font
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={formData.theme.fonts.secondary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      theme: {
                        ...formData.theme,
                        fonts: {
                          ...formData.theme.fonts,
                          secondary: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full pl-10 pr-10 py-2 h-12 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-gray-800 text-white placeholder-gray-400"
                >
                  {fontOptions.map((font) => (
                    <option
                      key={font}
                      value={font}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </option>
                  ))}
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
        </div>
      </div>

      <div className="p-4 mt-5  border border-yellow-200 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div>
            <h5 className="text-sm font-medium text-yellow-800">Theme Tips</h5>
            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
              <li>• Test your colors in dark and light modes</li>
              <li>• Ensure text remains readable on all backgrounds</li>
              <li>• Use consistent spacing in components</li>
              <li>• Consider accessibility when choosing colors</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={updateTheme}
          className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg text-white font-semibold text-lg hover:from-teal-500 hover:to-blue-600 transform hover:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <ThermometerSnowflake size={16} />
          Update Contact
        </button>
      </div>
    </div>
  );
};

export default PortFolioTheme;
