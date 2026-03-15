/**
 * Phase City - Discord Member Sync
 * Fetches all server members and saves username → Discord ID mappings
 * 
 * Usage: node sync-discord-members.js
 * Output: discord-members.json (same folder)
 */

const BOT_TOKEN = 'MTQ2NTg5MDgwNDI2MTE5NTk5OQ.GIOu0F.AWf8nFijj8pkdTSOy4VqRQdeSosIw3qnXDofMs';
const GUILD_ID = '1465887551733629022';

const fs = require('fs');
const https = require('https');

function fetch(url, headers) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
    req.on('error', reject);
  });
}

async function fetchAllMembers() {
  const headers = { 'Authorization': `Bot ${BOT_TOKEN}` };
  const members = {};
  let after = '0';
  let fetched = 0;
  
  console.log('🔄 Fetching Discord members...\n');
  
  while (true) {
    const url = `https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000&after=${after}`;
    const batch = await fetch(url, headers);
    
    if (batch.length === 0) break;
    
    for (const member of batch) {
      const user = member.user;
      if (user.bot) continue; // Skip bots
      
      // Use display name (nickname) if available, otherwise username
      const displayName = member.nick || user.global_name || user.username;
      const username = user.username;
      
      // Store both display name and username for flexible matching
      members[username.toLowerCase()] = user.id;
      if (displayName.toLowerCase() !== username.toLowerCase()) {
        members[displayName.toLowerCase()] = user.id;
      }
    }
    
    fetched += batch.length;
    process.stdout.write(`   Fetched ${fetched} members...\r`);
    
    after = batch[batch.length - 1].user.id;
    if (batch.length < 1000) break;
  }
  
  return members;
}

async function main() {
  try {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   Phase City - Discord Member Sync     ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    const members = await fetchAllMembers();
    const count = Object.keys(members).length;
    
    // Save to JSON
    const output = {
      lastSync: new Date().toISOString(),
      guildId: GUILD_ID,
      memberCount: count,
      members: members
    };
    
    fs.writeFileSync('discord-members.json', JSON.stringify(output, null, 2));
    
    console.log(`\n\n✅ Synced ${count} member mappings!`);
    console.log('📄 Saved to: discord-members.json');
    console.log('\n💡 The taskboard will auto-load this file on startup.');
    
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (err.message.includes('401')) {
      console.error('   → Bot token may be invalid or expired');
    } else if (err.message.includes('403')) {
      console.error('   → Bot may not have "Server Members Intent" enabled');
      console.error('   → Go to Discord Developer Portal → Bot → Enable "Server Members Intent"');
    }
    process.exit(1);
  }
}

main();
