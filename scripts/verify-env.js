#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * Run this script to verify that all required environment variables are properly configured
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'GOOGLE_GENERATIVE_AI_API_KEY'
];

const optionalEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'NODE_ENV'
];

console.log('🔍 Verifying environment variables...\n');

let allRequired = true;

// Check required variables
console.log('📋 Required Environment Variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value.length > 0) {
    console.log(`✅ ${varName}: Configured`);
  } else {
    console.log(`❌ ${varName}: Missing or empty`);
    allRequired = false;
  }
});

// Check optional variables
console.log('\n📋 Optional Environment Variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value.length > 0) {
    console.log(`✅ ${varName}: Configured`);
  } else {
    console.log(`⚠️  ${varName}: Not configured (optional)`);
  }
});

console.log('\n' + '='.repeat(50));

if (allRequired) {
  console.log('🎉 All required environment variables are configured!');
  console.log('✨ Your development environment is ready to go!');
  process.exit(0);
} else {
  console.log('❌ Some required environment variables are missing.');
  console.log('📝 Please check your .env.local file and ensure all required variables are set.');
  console.log('💡 Refer to .env.example for the correct format.');
  process.exit(1);
}