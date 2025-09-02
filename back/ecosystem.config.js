module.exports = {
  apps: [{
    name: 'onboarding',
    script: 'index.js',
    cwd: '/home/ubuntu/onboarding_flow/back',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3001
      // add other env vars here if you prefer
    }
  }]
};