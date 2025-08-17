module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // NEXT_PUBLIC_API_BASE_URL will be the full live URL from Render.
        // This setup correctly proxies requests from the browser to the AI service.
        destination: `http://${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ]
  },
}