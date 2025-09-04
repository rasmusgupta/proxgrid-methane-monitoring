declare global {
  interface Window {
    ee: any;
    google: any;
  }
}

export interface EarthEngineConfig {
  apiKey: string;
  clientId: string;
  scopes: string[];
}

export const EARTH_ENGINE_CONFIG: EarthEngineConfig = {
  apiKey: 'AIzaSyAYRtoMwMWBiB6ECpYddixfiTHoMLSJ6Jg',
  clientId: '900688701606-dg5lp9eaopcv15olto7mu6kh7ueai2sa.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/earthengine',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/cloud-platform'
  ]
};

export type LayerType = 'landsat' | 'sentinel' | 'modis' | 'elevation';

export interface LayerInfo {
  name: string;
  description: string;
  enabled: boolean;
}

export interface MapVisualizationParams {
  bands?: string[];
  min?: number;
  max?: number;
  gamma?: number;
  palette?: string[];
}

export class EarthEngineService {
  private isInitialized = false;
  private isAuthenticated = false;
  private currentLayers = new Set<LayerType>();
  private map: google.maps.Map | null = null;
  private statusCallback?: (message: string) => void;

  constructor() {
    this.currentLayers = new Set();
  }

  setStatusCallback(callback: (message: string) => void) {
    this.statusCallback = callback;
  }

  private updateStatus(message: string) {
    console.log('Earth Engine Status:', message);
    if (this.statusCallback) {
      this.statusCallback(message);
    }
  }

  async loadEarthEngineAPI(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Earth Engine can only be loaded in browser environment');
    }

    this.updateStatus('Loading Earth Engine API...');

    return new Promise(async (resolve, reject) => {
      try {
        // Import the Earth Engine library
        const ee = await import('@google/earthengine');
        window.ee = ee.default || ee;
        
        if (typeof window.ee === 'undefined') {
          reject(new Error('Earth Engine API not loaded'));
          return;
        }

        // Initialize the Earth Engine data module
        await new Promise<void>((initResolve, initReject) => {
          window.ee.data.initialize(null, null, () => {
            console.log('Earth Engine data module initialized successfully');
            this.isInitialized = true;
            this.updateStatus('Earth Engine API loaded successfully');
            initResolve();
          }, (error: any) => {
            console.error('Earth Engine data initialization failed:', error);
            initReject(error);
          });
        });

        resolve();
      } catch (error) {
        console.error('Failed to load Earth Engine API:', error);
        this.updateStatus('Failed to load Earth Engine API');
        reject(error);
      }
    });
  }

  async authenticate(): Promise<boolean> {
    if (typeof window === 'undefined') {
      throw new Error('Authentication can only be performed in browser environment');
    }

    try {
      if (!this.isInitialized) {
        await this.loadEarthEngineAPI();
      }

      // Check if Earth Engine API is available
      if (!window.ee || !window.ee.data) {
        throw new Error('Earth Engine API not loaded properly');
      }

      this.updateStatus('Initializing Earth Engine...');

      // Simple initialization for public datasets (matching working app pattern)
      return new Promise((resolve, reject) => {
        try {
          window.ee.initialize(
            null,
            () => {
              console.log('Earth Engine initialized successfully');
              this.isAuthenticated = true;
              this.updateStatus('Earth Engine authenticated successfully');
              resolve(true);
            },
            (error: any) => {
              console.error('Earth Engine initialization failed:', error);
              this.updateStatus('Earth Engine authentication failed');
              reject(new Error(`Earth Engine initialization failed: ${error.message || error}`));
            }
          );
        } catch (initError) {
          console.error('Earth Engine initialization error:', initError);
          this.updateStatus('Earth Engine initialization error');
          reject(new Error('Failed to initialize Earth Engine'));
        }
      });
    } catch (error) {
      console.error('Earth Engine authentication setup error:', error);
      this.updateStatus('Authentication setup error');
      throw error;
    }
  }

  // OAuth2 authentication method (exact pattern from working app)
  async startAuthentication(): Promise<string> {
    if (typeof window === 'undefined') {
      throw new Error('OAuth authentication can only be performed in browser environment');
    }

    try {
      if (!this.isInitialized) {
        await this.loadEarthEngineAPI();
      }

      if (!window.ee || !window.ee.data) {
        throw new Error('Earth Engine API not loaded properly');
      }

      this.updateStatus('Starting authentication...');

      // Get authorization URL (exact pattern from working app)
      const authUrl = window.ee.data.getAuthorizationUrl();
      
      // Open authorization URL in new tab
      window.open(authUrl, '_blank');
      
      this.updateStatus('Please complete authentication in your browser');
      return authUrl;
    } catch (error) {
      console.error('OAuth authentication error:', error);
      this.updateStatus('Authentication failed');
      throw error;
    }
  }

  async submitAuthCode(authCode: string): Promise<boolean> {
    if (typeof window === 'undefined') {
      throw new Error('Auth code submission can only be performed in browser environment');
    }

    if (!authCode.trim()) {
      throw new Error('Authorization code is required');
    }

    try {
      if (!window.ee || !window.ee.data) {
        throw new Error('Earth Engine API not loaded properly');
      }

      this.updateStatus('Verifying authentication...');

      return new Promise((resolve, reject) => {
        window.ee.data.authenticateViaOauth(authCode, () => {
          console.log('OAuth authentication successful');
          this.isAuthenticated = true;
          this.updateStatus('Authenticated successfully');
          resolve(true);
        }, (error: any) => {
          console.error('OAuth authentication failed:', error);
          this.updateStatus('Authentication verification failed');
          reject(new Error('Invalid authorization code'));
        });
      });
    } catch (error) {
      console.error('Auth code submission error:', error);
      this.updateStatus('Auth code submission error');
      throw error;
    }
  }

  isEarthEngineAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setMap(map: google.maps.Map) {
    this.map = map;
  }

  // Get visualization parameters (exact pattern from working app)
  private getVisualizationParams(layerType: LayerType): MapVisualizationParams {
    switch (layerType) {
      case 'landsat':
        return {
          bands: ['B4', 'B3', 'B2'],
          min: 0,
          max: 3000,
          gamma: 1.4
        };
      case 'sentinel':
        return {
          bands: ['B4', 'B3', 'B2'],
          min: 0,
          max: 3000,
          gamma: 1.4
        };
      case 'modis':
        return {
          bands: ['NDVI'],
          min: 0,
          max: 9000,
          palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301']
        };
      case 'elevation':
        return {
          min: 0,
          max: 9000,
          palette: ['006633', 'E5FFCC', '662A00', 'D8D8D8', 'F5F5F5']
        };
      default:
        return {};
    }
  }

  // Create dataset (exact pattern from working app)
  private createDataset(layerType: LayerType): any {
    switch (layerType) {
      case 'landsat':
        return window.ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
          .filterDate('2023-01-01', '2023-12-31')
          .median();
      case 'sentinel':
        return window.ee.ImageCollection('COPERNICUS/S2_SR')
          .filterDate('2023-01-01', '2023-12-31')
          .median();
      case 'modis':
        return window.ee.ImageCollection('MODIS/006/MOD13Q1')
          .filterDate('2023-01-01', '2023-12-31')
          .median();
      case 'elevation':
        return window.ee.Image('USGS/SRTMGL1_003');
      default:
        throw new Error(`Unknown layer type: ${layerType}`);
    }
  }

  // Add layer (exact pattern from working app)
  async addLayer(layerType: LayerType): Promise<void> {
    if (!this.isAuthenticated || !window.ee) {
      throw new Error('Earth Engine not authenticated');
    }

    if (!this.map) {
      throw new Error('Google Map not initialized');
    }

    try {
      this.updateStatus(`Loading ${layerType} layer...`);
      
      const dataset = this.createDataset(layerType);
      const visParams = this.getVisualizationParams(layerType);
      
      const mapId = await new Promise<any>((resolve, reject) => {
        dataset.getMap(visParams, (result: any) => {
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        });
      });

      const layer = new window.google.maps.ImageMapType({
        getTileUrl: (coord: google.maps.Point, zoom: number) => {
          return mapId.urlFormat
            .replace('{x}', coord.x.toString())
            .replace('{y}', coord.y.toString())
            .replace('{z}', zoom.toString());
        },
        tileSize: new window.google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: layerType
      } as any);

      this.map.overlayMapTypes.push(layer);
      this.currentLayers.add(layerType);
      this.updateStatus(`${layerType} layer loaded successfully`);
    } catch (error) {
      console.error(`Failed to add ${layerType} layer:`, error);
      this.updateStatus(`Failed to load ${layerType} layer`);
      throw error;
    }
  }

  // Remove layer (exact pattern from working app)
  removeLayer(layerType: LayerType): void {
    if (!this.map) {
      return;
    }

    for (let i = this.map.overlayMapTypes.getLength() - 1; i >= 0; i--) {
      const layer = this.map.overlayMapTypes.getAt(i);
      if (layer && (layer as any).name === layerType) {
        this.map.overlayMapTypes.removeAt(i);
        this.currentLayers.delete(layerType);
        this.updateStatus(`${layerType} layer removed`);
        break;
      }
    }
  }

  // Toggle layer (exact pattern from working app)
  async toggleLayer(layerType: LayerType, enabled: boolean): Promise<void> {
    if (!this.isAuthenticated || !this.map) {
      return;
    }

    try {
      if (enabled) {
        await this.addLayer(layerType);
      } else {
        this.removeLayer(layerType);
      }
    } catch (error) {
      console.error(`Failed to toggle ${layerType} layer:`, error);
      throw error;
    }
  }

  // Get available layers
  getAvailableLayers(): Record<LayerType, LayerInfo> {
    return {
      landsat: {
        name: 'Landsat 8',
        description: 'Landsat 8 Surface Reflectance',
        enabled: this.currentLayers.has('landsat')
      },
      sentinel: {
        name: 'Sentinel-2',
        description: 'Sentinel-2 Surface Reflectance',
        enabled: this.currentLayers.has('sentinel')
      },
      modis: {
        name: 'MODIS NDVI',
        description: 'MODIS Vegetation Index',
        enabled: this.currentLayers.has('modis')
      },
      elevation: {
        name: 'Elevation',
        description: 'SRTM Digital Elevation Model',
        enabled: this.currentLayers.has('elevation')
      }
    };
  }

  // Legacy method for compatibility
  async getMapVisualization(dataset: any, visParams: any): Promise<any> {
    if (!this.isAuthenticated || !window.ee) {
      throw new Error('Earth Engine not authenticated');
    }

    return new Promise((resolve, reject) => {
      dataset.getMap(visParams, (result: any) => {
        if (result.error) {
          reject(new Error(result.error));
        } else {
          resolve(result);
        }
      });
    });
  }
}