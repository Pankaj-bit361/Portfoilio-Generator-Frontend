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
}

export default General;
