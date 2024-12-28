module.exports = {
  // Example helper to generate a URL with the base FRONT_URL
  url: (path) => {
    const baseUrl = process.env.FRONT_URL || "http://localhost:3000";
    return `${baseUrl}/${path}`;
  },

  // Another example: format a date
  formatDate: (date) => {
    return new Date(date).toLocaleDateString();
  },

  // Yet another example: capitalize a string
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};
