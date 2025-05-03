// scripts/shell.js
const { spawn } = require('child_process');

const container = process.argv[2];
if (!container) {
  console.error('Please specify a container name. Usage: pnpm shell <container>');
  process.exit(1);
}

const validContainers = ['backend', 'frontend', 'db'];
if (!validContainers.includes(container)) {
  console.error(`Invalid container name. Valid options are: ${validContainers.join(', ')}`);
  process.exit(1);
}

let args = ['-f', 'docker-compose.dev.yml', 'exec'];

// For the database container, use psql with credentials from .env
if (container === 'db') {
  args = [...args, container, 'psql', '-U', 'postgres_user', '-d', 'postgres_db'];
} else {
  args = [...args, container, 'sh'];
}

const subprocess = spawn('docker-compose', args, { stdio: 'inherit' });

subprocess.on('error', (err) => {
  console.error(`Failed to start shell in ${container}: ${err.message}`);
});
