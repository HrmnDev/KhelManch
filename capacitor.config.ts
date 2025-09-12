import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.athletepeakanalyzer',
  appName: 'athlete-peak-analyzer',
  webDir: 'dist',
  server: {
    url: 'https://0a174cf4-55a5-4713-805f-8dc33b7d524d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;