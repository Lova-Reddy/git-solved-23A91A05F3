/**
 * System Monitoring Script - Universal
 * Combines production stability with enhanced development features.
 */

// --- Environment Definitions ---

const productionConfig = {
  interval: 60000, // 1 minute
  alertThreshold: 80,
  metricsEndpoint: 'http://localhost:8080/metrics',
  debugMode: false,
  verboseLogging: false
};

const developmentConfig = {
  interval: 5000, // 5 seconds (faster for development)
  alertThreshold: 90, // Note: Dev threshold is higher/less strict
  metricsEndpoint: 'http://localhost:3000/metrics',
  debugMode: true,
  verboseLogging: true
};

// --- Select Active Configuration ---
// For the challenge, we will default to 'production' unless a specific environment 
// (e.g., 'development') is set via an external mechanism or simple switch.
// We'll use a simple constant here to fulfill the requirement of combining both.
const ACTIVE_ENV = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const monitorConfig = ACTIVE_ENV === 'production' ? productionConfig : developmentConfig;

// --- Script Execution ---
const isDebug = monitorConfig.debugMode;

console.log('=================================');
console.log(`DevOps Simulator - Monitor v${monitorConfig.debugMode ? '2.0-beta' : '1.0'}`);
if (isDebug) {
  console.log('Development Mode: ENABLED');
}
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();

  if (isDebug) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  // --- Core Health Checks (Combined and enhanced from 'dev') ---
  
  // Check CPU usage (using the mock logic from 'dev' for demonstration)
  const cpuUsage = Math.random() * 100;
  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);

  // Check Memory
  const memUsage = Math.random() * 100;
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);

  // Check Disk
  const diskUsage = Math.random() * 100;
  console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);

  // Development-specific checks (from 'dev')
  if (isDebug) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
    console.log('✓ Source maps: Enabled');
  }

  // Status determination (from 'dev')
  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);
  if (maxUsage > monitorConfig.alertThreshold) {
    console.log('System Status: WARNING - High resource usage');
  } else {
    console.log('System Status: HEALTHY');
  }

  if (monitorConfig.verboseLogging) {
    console.log(`Next check in ${monitorConfig.interval}ms`);
  }
}

// Start monitoring
console.log(`Monitoring every ${monitorConfig.interval}ms`);
if (isDebug) {
  console.log('Debug features enabled');
}

setInterval(checkSystemHealth, monitorConfig.interval);

// Run first check immediately
checkSystemHealth();

// Development-specific: Log memory usage (from 'dev')
if (isDebug) {
  setInterval(() => {
    // Note: process.memoryUsage() is a Node.js-specific function.
    // If not running in Node, this will throw, but we assume a Node context here.
    const memUsage = process.memoryUsage(); 
    console.log('\n--- Memory Usage ---');
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}