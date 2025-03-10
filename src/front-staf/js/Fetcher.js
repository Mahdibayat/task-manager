class Fetcher {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.queryParams = {};
  }

  /**
   * Add query parameters to the URL.
   * @param {Object} params - Key-value pairs of query parameters.
   * @returns {Fetcher} - The current instance for chaining.
   */
  addQueryParams(params) {
    this.queryParams = { ...this.queryParams, ...params };
    return this;
  }

  /**
   * Build the full URL with query parameters.
   * @returns {string} - The full URL.
   */
  buildUrl() {
    const url = new URL(this.baseUrl);
    Object.entries(this.queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    return url.toString();
  }

  /**
   * Fetch data from the URL.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {Object} options - Fetch options (e.g., headers, body).
   * @returns {Promise<Response>} - The fetch response.
   */
  async fetch(method = 'GET', options = {}) {
    const url = this.buildUrl();
    const response = await fetch(url, {
      method,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  }

  /**
   * Get the response body as JSON.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {Object} options - Fetch options (e.g., headers, body).
   * @returns {Promise<Object>} - The parsed JSON response.
   */
  async getJson(method = 'GET', options = {}) {
    const response = await this.fetch(method, options);
    return response.json();
  }

  /**
   * Get the response body as text.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {Object} options - Fetch options (e.g., headers, body).
   * @returns {Promise<string>} - The response text.
   */
  async getText(method = 'GET', options = {}) {
    const response = await this.fetch(method, options);
    return response.text();
  }

  /**
   * Get the response body as a Blob.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {Object} options - Fetch options (e.g., headers, body).
   * @returns {Promise<Blob>} - The response Blob.
   */
  async getBlob(method = 'GET', options = {}) {
    const response = await this.fetch(method, options);
    return response.blob();
  }

  /**
   * Get the response headers.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {Object} options - Fetch options (e.g., headers, body).
   * @returns {Promise<Headers>} - The response headers.
   */
  async getHeaders(method = 'GET', options = {}) {
    const response = await this.fetch(method, options);
    return response.headers;
  }

  /**
   * Get the response status and status text.
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {Object} options - Fetch options (e.g., headers, body).
   * @returns {Promise<{ status: number, statusText: string }>} - The response status and status text.
   */
  async getStatus(method = 'GET', options = {}) {
    const response = await this.fetch(method, options);
    return {
      status: response.status,
      statusText: response.statusText,
    };
  }
}
