module.exports = {
  apps : [{
    name: "yarn",
    cwd: '/usr/share/nginx/html',
    script: "yarn",
    args: 'prod',
    watch: true,
    env: {
      NODE_ENV: "production",
      HOST: '0.0.0.0',
      PORT: '5001',
    },
  }]
}