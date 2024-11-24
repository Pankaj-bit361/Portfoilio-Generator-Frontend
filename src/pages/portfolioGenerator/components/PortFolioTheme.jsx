import React from "react";
import {
  Palette,
  Type,
  Sun,
  AlertCircle,
  Save,
  Text,
  Layout,
  ThermometerSunIcon,
  ThermometerSnowflake,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import General from "../../../config/general";
import { config } from "../../../config/api";

const ColorPicker = ({ label, value, onChange, description }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {description && (
        <span className="text-xs text-gray-500 ml-2">{description}</span>
      )}
    </label>
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="w-14 h-14 rounded-lg cursor-pointer border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7153dc] transition-all p-1"
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
        className="w-32 px-3 py-2 h-12 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors uppercase"
        placeholder="#000000"
      />
    </div>
  </div>
);

const ThemePreview = ({ colors, fonts }) => {


  return (
    <div className="space-y-8 p-6 bg-white rounded-lg border-2 border-gray-200">
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Theme Preview</h4>
        <p className="text-sm text-gray-500">
          Live preview of your selected theme
        </p>
      </div>

      {/* Colors Preview */}
      <div className="space-y-6">
        {/* Primary Colors Row */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Primary Colors</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-sm"
                style={{ backgroundColor: colors?.primary }}
              >
                Primary
              </div>
              <p className="text-xs text-center text-gray-500">
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
              <p className="text-xs text-center text-gray-500">
                {colors?.primaryHover}
              </p>
            </div>
            <div className="space-y-2">
              <div
                className="h-16 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm"
                style={{ backgroundColor: colors?.accent }}
              >
                Accent
              </div>
              <p className="text-xs text-center text-gray-500">
                {colors?.accent}
              </p>
            </div>
          </div>
        </div>

        {/* Typography Preview */}
        <div className="space-y-4 p-4 rounded-lg bg-gray-50">
          <p className="text-sm font-medium text-gray-600">
            Typography Preview
          </p>
          <div className="space-y-4">
            <div className="space-y-1" style={{ fontFamily: fonts?.primary }}>
              <p
                style={{ color: colors?.text }}
                className="text-2xl font-semibold"
              >
                Primary Font
              </p>
              <p style={{ color: colors?.textLight }} className="text-sm">
                This is how your primary font looks in different sizes with main
                and secondary text colors.
              </p>
            </div>
            <div className="space-y-1" style={{ fontFamily: fonts?.secondary }}>
              <p
                style={{ color: colors?.text }}
                className="text-lg font-medium"
              >
                Secondary Font
              </p>
              <p style={{ color: colors?.textLight }} className="text-sm">
                Your secondary font is used for supporting text content.
              </p>
            </div>
          </div>
        </div>

        {/* Background Preview */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-600">Background Styles</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm"
                style={{ backgroundColor: colors?.bg }}
              >
                <p style={{ color: colors?.text }}>Background Color</p>
              </div>
              <p className="text-xs text-center text-gray-500">{colors?.bg}</p>
            </div>
            <div className="space-y-2">
              <div
                className="h-24 rounded-lg flex items-center justify-center text-sm font-medium shadow-sm"
                style={{
                  background: `linear-gradient(${colors?.bgGradient})`,
                }}
              >
                <p style={{ color: colors?.text }}>Gradient Background</p>
              </div>
              <p
                className="text-xs text-center text-gray-500 truncate"
                title={colors?.bgGradient}
              >
                {colors?.bgGradient}
              </p>
            </div>
          </div>
        </div>

        {/* Component Examples */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-600">
            Component Examples
          </p>
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
                className="px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
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
              className="p-4 rounded-lg shadow-sm"
              style={{
                backgroundColor: colors?.bg,
                borderColor: colors?.border,
                borderWidth: "1px",
              }}
            >
              <h5
                style={{
                  color: colors?.text,
                  fontFamily: fonts?.primary,
                }}
                className="text-lg font-semibold mb-2"
              >
                Card Example
              </h5>
              <p
                style={{
                  color: colors?.textLight,
                  fontFamily: fonts?.secondary,
                }}
                className="text-sm"
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
   
      if(!formData && !formData.theme) return

      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${General.getPortfolioId()}/theme?userId=${General.getUserId()}`,
        formData.theme
      );

      if (response.data.success) {
        toast.success("Theme Updated Successfully");
        setFlag((prev) => !prev);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
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
    <div className="p-6 bg-white rounded-lg q-box-shawdow">
      {/* Header remains same */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Primary Colors Section */}
          <div className="space-y-6">
            <h4 className="flex items-center gap-2 text-lg font-medium text-gray-700">
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
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h4 className="flex items-center gap-2 text-lg font-medium text-gray-700">
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

          {/* Background Colors Section */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h4 className="flex items-center gap-2 text-lg font-medium text-gray-700">
              <Layout className="w-5 h-5" />
              Background Colors
            </h4>

            <ColorPicker
              label="Background"
              value={formData.theme.colors?.bg}
              onChange={(e) => updateColorValue("bg", e.target.value)}
              description="Main background color"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Background Gradient
                <span className="text-xs text-gray-500 ml-2">
                  Gradient background effect
                </span>
              </label>
              <input
                type="text"
                value={formData.theme.colors?.bgGradient}
                onChange={(e) => updateColorValue("bgGradient", e.target.value)}
                className="w-full px-3 py-2 h-12 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors"
                placeholder="from-emerald-50/90 to-white"
              />
            </div>
          </div>

          {/* Fonts Section */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h4 className="flex items-center gap-2 text-lg font-medium text-gray-700">
              <Type className="w-5 h-5" />
              Typography
            </h4>

            <div className="space-y-6">
              {/* Primary Font */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
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
                    className="w-full pl-10 pr-10 py-2 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-white"
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
                <label className="block text-sm font-medium text-gray-700">
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
                    className="w-full pl-10 pr-10 py-2 h-12 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#7153dc] transition-colors appearance-none bg-white"
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

        <div className="space-y-6">
          <ThemePreview
            colors={formData.theme.colors}
            fonts={formData.theme.fonts}
          />
        </div>
      </div>

      <div className="p-4 mt-5 bg-yellow-50 border border-yellow-200 rounded-lg">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium h-12"
          >
            <ThermometerSnowflake size={16} />
            Update Contact
          </button>
        </div>
    </div>
  );
};

export default PortFolioTheme;
