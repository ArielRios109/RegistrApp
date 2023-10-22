import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.registr.app',
  appName: 'RegistrAPP',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
