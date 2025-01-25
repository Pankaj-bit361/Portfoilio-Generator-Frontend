import axios from "axios";
import { config } from "./api";

class General {
  /**
   * Get the access token from localStorage.
   * @returns {string | null} The access token or null if not found.
   */
  static getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  /**
   * Get the refresh token from localStorage.
   * @returns {string | null} The refresh token or null if not found.
   */
  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  /**
   * Get the user ID directly from the stored user data in localStorage.
   * @returns {string | null} The user ID or null if not found.
   */
  static getUserId() {
    const userData = localStorage.getItem("portfolioUser");
    return userData ? JSON.parse(userData).userId : null;
  }

  /**
   * Get the user data from localStorage.
   * @returns {Object | null} The user data object or null if not found.
   */
  static getUserData() {
    const userData = localStorage.getItem("portfolioUser");
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Get a specific parameter from the current URL.
   * @param {string} param - The parameter name to retrieve.
   * @returns {string | null} The parameter value or null if not found.
   */
  static getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  /**
   * Save tokens and user data to localStorage.
   * @param {string} accessToken - The access token to store.
   * @param {string} refreshToken - The refresh token to store.
   * @param {Object} user - The user data object to store.
   */
  static saveAuthData(accessToken, refreshToken, user) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("portfolioUser", JSON.stringify(user));
  }

  /**
   * Clear all authentication-related data from localStorage.
   */
  static clearAuthData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("portfolioUser");
  }

  /**
   * Get the current portfolio ID from URL parameters.
   * @returns {string | null} The portfolio ID or null if not found.
   */
  static getPortfolioId() {
    return this.getUrlParam("portfolioId");
  }

  /**
   * Send login request
   * @param {string} email - User's email
   * @returns {Promise} Promise resolving to login response
   */
  static async login(email) {
    try {
      const response = await axios.post(`${config.BASE_URL}api/auth/login`, {
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Verify OTP
   * @param {string} email - User's email
   * @param {string} otp - One-time password
   * @returns {Promise} Promise resolving to OTP verification response
   */
  static async verifyOTP(email, otp) {
    try {
      const response = await axios.post(
        `${config.BASE_URL}api/auth/verify-otp`,
        {
          email,
          otp,
        }
      );
      return response.data;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  }

  /**
   * Sign up a new user
   * @param {Object} userData - User registration details
   * @returns {Promise} Promise resolving to signup response
   */
  static async signup(userData) {
    try {
      const response = await axios.post(
        `${config.BASE_URL}api/auth/signup`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  /**
   * Google authentication
   * @param {string} accessToken - Google access token
   * @param {Object} userInfo - User information from Google
   * @returns {Promise} Promise resolving to Google auth response
   */
  static async googleAuth(accessToken, userInfo) {
    try {
      const response = await axios.post(`${config.BASE_URL}api/auth/google`, {
        token: accessToken,
        userInfo: userInfo,
      });
      return response.data;
    } catch (error) {
      console.error("Google authentication error:", error);
      throw error;
    }
  }

  /**
   * Fetch portfolios for the current user.
   * @param {Object} params - Parameters for fetching portfolios
   * @param {number} [params.page=1] - Page number for pagination
   * @param {number} [params.limit=5] - Number of portfolios per page
   * @returns {Promise} Promise resolving to portfolio data
   */
  static async fetchPortfolios(params = {}) {
    const { page = 1, limit = 5 } = params;
    const userId = this.getUserId();

    if (!userId) {
      throw new Error("User ID not found");
    }

    try {
      const response = await axios.get(
        `${config.BASE_URL}api/portfolio?userId=${userId}&page=${page}&limit=${limit}`
      );

      return response.data.success ? response.data.data : null;
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      throw error;
    }
  }

  /**
   * Generate portfolio from resume text
   * @param {Object} data - Portfolio generation data
   * @returns {Promise} Promise resolving to portfolio generation response
   */
  static async generatePortfolio(data) {
    const userId = this.getUserId();
    try {
      const response = await axios.post(
        `${config.BASE_URL}api/portfolio/generate?userId=${userId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error generating portfolio:", error);
      throw error;
    }
  }

  /**
   * Fetch portfolio data
   * @param {string} portfolioId - ID of the portfolio
   * @returns {Promise} Promise resolving to portfolio data
   */
  static async getPortfolioData(portfolioId) {
    const userId = this.getUserId();
    try {
      const response = await axios.get(
        `${config.BASE_URL}api/portfolio/${portfolioId}?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      throw error;
    }
  }

  /**
   * Delete a portfolio
   * @param {string} portfolioId - ID of the portfolio to delete
   * @returns {Promise} Promise resolving to delete response
   */
  static async deletePortfolio(portfolioId) {
    const userId = this.getUserId();
    const headers = {
      token: this.getAccessToken(),
    };
    try {
      const response = await axios.delete(
        `${config.BASE_URL}api/portfolio/${portfolioId}?userId=${userId}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      throw error;
    }
  }

  /**
   * Fetch portfolio template
   * @param {string} portfolioId - ID of the portfolio
   * @returns {Promise} Promise resolving to portfolio template
   */
  static async getPortfolioTemplate(portfolioId) {
    const userId = this.getUserId();
    try {
      const response = await axios.get(
        `${config.BASE_URL}api/portfolio/${portfolioId}/template?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching portfolio template:", error);
      throw error;
    }
  }

  /**
   * Create portfolio template
   * @param {string} portfolioId - ID of the portfolio
   * @param {string} template - Selected template
   * @returns {Promise} Promise resolving to template update response
   */
  static async createPortfolioTemplate(portfolioId, template) {
    const userId = this.getUserId();
    try {
      const response = await axios.post(
        `${config.BASE_URL}api/portfolio/${portfolioId}/template?userId=${userId}`,
        { template }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating portfolio template:", error);
      throw error;
    }
  }

  /**
   * Update portfolio template
   * @param {string} portfolioId - ID of the portfolio
   * @param {string} template - Selected template
   * @returns {Promise} Promise resolving to template update response
   */
  static async updatePortfolioTemplate(portfolioId, template) {
    const userId = this.getUserId();
    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/template?userId=${userId}`,
        { template }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating portfolio template:", error);
      throw error;
    }
  }

  /**
   * Extract theme from a website
   * @param {string} url - Website URL to extract theme from
   * @returns {Promise} Promise resolving to theme extraction response
   */
  static async extractTheme(url) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/theme/${portfolioId}/extract?userId=${userId}`,
        { url }
      );

      return response.data;
    } catch (error) {
      console.error("Error extracting theme:", error);
      throw error;
    }
  }

  /**
   * Update home section details for a portfolio
   * @param {Object} homeData - Home section data to update
   * @returns {Promise} Promise resolving to update response
   */
  static async updateHomeDetails(homeData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/home?userId=${userId}`,
        homeData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating home details:", error);
      throw error;
    }
  }

  /**
   * Update contact details for a portfolio
   * @param {Object} contactData - Contact details to update
   * @returns {Promise} Promise resolving to update response
   */
  static async updateContactDetails(contactData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/contact?userId=${userId}`,
        contactData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating contact details:", error);
      throw error;
    }
  }

  /**
   * Update an existing education entry
   * @param {string} educationId - ID of the education entry
   * @param {Object} educationData - Updated education details
   * @returns {Promise} Promise resolving to update response
   */
  static async updateEducation(educationId, educationData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/education/${educationId}?userId=${userId}`,
        educationData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating education:", error);
      throw error;
    }
  }

  /**
   * Add a new education entry
   * @param {Object} educationData - Education details to add
   * @returns {Promise} Promise resolving to create response
   */
  static async addEducation(educationData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.post(
        `${config.BASE_URL}api/portfolio/${portfolioId}/education?userId=${userId}`,
        educationData
      );

      return response.data;
    } catch (error) {
      console.error("Error adding education:", error);
      throw error;
    }
  }

  /**
   * Delete an education entry
   * @param {string} educationId - ID of the education entry to delete
   * @returns {Promise} Promise resolving to delete response
   */
  static async deleteEducation(educationId) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.delete(
        `${config.BASE_URL}api/portfolio/${portfolioId}/education/${educationId}?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting education:", error);
      throw error;
    }
  }

  /**
   * Update an existing experience entry
   * @param {string} experienceId - ID of the experience entry
   * @param {Object} experienceData - Updated experience details
   * @returns {Promise} Promise resolving to update response
   */
  static async updateExperience(experienceId, experienceData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/experience/${experienceId}?userId=${userId}`,
        experienceData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating experience:", error);
      throw error;
    }
  }

  /**
   * Add a new experience entry
   * @param {Object} experienceData - Experience details to add
   * @returns {Promise} Promise resolving to create response
   */
  static async addExperience(experienceData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.post(
        `${config.BASE_URL}api/portfolio/${portfolioId}/experience?userId=${userId}`,
        experienceData
      );

      return response.data;
    } catch (error) {
      console.error("Error adding experience:", error);
      throw error;
    }
  }

  /**
   * Delete an experience entry
   * @param {string} experienceId - ID of the experience entry to delete
   * @returns {Promise} Promise resolving to delete response
   */
  static async deleteExperience(experienceId) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.delete(
        `${config.BASE_URL}api/portfolio/${portfolioId}/experience/${experienceId}?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting experience:", error);
      throw error;
    }
  }

  /**
   * Update an existing project entry
   * @param {string} projectId - ID of the project entry
   * @param {Object} projectData - Updated project details
   * @returns {Promise} Promise resolving to update response
   */
  static async updateProject(projectId, projectData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/project/${projectId}?userId=${userId}`,
        projectData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  /**
   * Add a new project entry
   * @param {Object} projectData - Project details to add
   * @returns {Promise} Promise resolving to create response
   */
  static async addProject(projectData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.post(
        `${config.BASE_URL}api/portfolio/${portfolioId}/project?userId=${userId}`,
        projectData
      );

      return response.data;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  }

  /**
   * Delete a project entry
   * @param {string} projectId - ID of the project entry to delete
   * @returns {Promise} Promise resolving to delete response
   */
  static async deleteProject(projectId) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.delete(
        `${config.BASE_URL}api/portfolio/${portfolioId}/project/${projectId}?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }

  /**
   * Update skills for a portfolio
   * @param {Object} skillsData - Skills data to update
   * @returns {Promise} Promise resolving to update response
   */
  static async updateSkills(skillsData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/skills?userId=${userId}`,
        skillsData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating skills:", error);
      throw error;
    }
  }

  /**
   * Update theme for a portfolio
   * @param {Object} themeData - Theme data to update
   * @returns {Promise} Promise resolving to update response
   */
  static async updateTheme(themeData) {
    const portfolioId = this.getPortfolioId();
    const userId = this.getUserId();

    try {
      const response = await axios.patch(
        `${config.BASE_URL}api/portfolio/${portfolioId}/theme?userId=${userId}`,
        themeData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating theme:", error);
      throw error;
    }
  }
}

export default General;
