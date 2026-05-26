module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/oracle",
        destination: "http://localhost:4000/api/oracle",
      },
    ];
  },
};