import 'react-native-gesture-handler/jestSetup';

// Mock Expo modules FIRST
jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}));

// Mock all winter runtime files
jest.mock('expo/src/winter/runtime.native', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('expo/src/winter/runtime.native.ts', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('expo/src/winter/runtime', () => ({
  __esModule: true,
  default: {},
}));

// Mock global polyfills
global.TextDecoder = global.TextDecoder || class {
  decode() { return ''; }
};

global.TextEncoder = global.TextEncoder || class {
  encode() { return new Uint8Array(); }
};

// Mock missing DOM APIs
global.DOMParser = global.DOMParser || class {
  parseFromString() { return { documentElement: {} }; }
};

// Mock XMLHttpRequest
global.XMLHttpRequest = global.XMLHttpRequest || class {
  open() {}
  send() {}
  setRequestHeader() {}
};

jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      name: 'test-app',
      slug: 'test-app',
    },
    manifest: {},
    platform: {
      ios: {
        platform: 'ios',
      },
    },
  },
}));

// Mock global Expo objects
Object.defineProperty(global, '__ExpoImportMetaRegistry', {
  value: {},
  writable: true,
});

Object.defineProperty(global, '__expo_module_registry__', {
  value: {},
  writable: true,
});

// Import jest-native extensions AFTER Expo mocks
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo Router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  },
  Stack: {
    Screen: ({ children }: any) => children,
  },
  Tabs: {
    Screen: ({ children }: any) => children,
  },
  Redirect: () => null,
  Link: ({ children }: any) => children,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => ({}),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock fetch
global.fetch = jest.fn();

// Mock console methods for cleaner test output
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock PixelRatio FIRST - before any other React Native mocks
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => 2),
    getFontScale: jest.fn(() => 1),
    getPixelSizeForLayoutSize: jest.fn((layoutSize: number) => layoutSize * 2),
    roundToNearestPixel: jest.fn((layoutSize: number) => Math.round(layoutSize)),
  },
  get: jest.fn(() => 2),
  getFontScale: jest.fn(() => 1),
  getPixelSizeForLayoutSize: jest.fn((layoutSize: number) => layoutSize * 2),
  roundToNearestPixel: jest.fn((layoutSize: number) => Math.round(layoutSize)),
}));

// Mock Dimensions SECOND
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => ({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
  get: jest.fn(() => ({
    width: 375,
    height: 667,
    scale: 2,
    fontScale: 1,
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock StyleSheet
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  __esModule: true,
  default: {
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => style),
    compose: jest.fn((style1, style2) => [style1, style2]),
    hairlineWidth: 1,
    absoluteFill: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    absoluteFillObject: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  create: jest.fn((styles) => styles),
  flatten: jest.fn((style) => style),
  compose: jest.fn((style1, style2) => [style1, style2]),
  hairlineWidth: 1,
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));

// Mock TurboModuleRegistry
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: jest.fn(() => ({
    getConstants: jest.fn(() => ({
      Dimensions: {
        windowPhysicalPixels: {
          width: 375,
          height: 667,
          scale: 2,
          fontScale: 1,
          densityDpi: 326,
        },
        screenPhysicalPixels: {
          width: 375,
          height: 667,
          scale: 2,
          fontScale: 1,
          densityDpi: 326,
        },
      },
    })),
  })),
  get: jest.fn(),
}));

// Mock NativeDeviceInfo
jest.mock('react-native/src/private/specs_DEPRECATED/modules/NativeDeviceInfo', () => ({
  getConstants: jest.fn(() => ({
    Dimensions: {
      windowPhysicalPixels: {
        width: 375,
        height: 667,
        scale: 2,
        fontScale: 1,
        densityDpi: 326,
      },
      screenPhysicalPixels: {
        width: 375,
        height: 667,
        scale: 2,
        fontScale: 1,
        densityDpi: 326,
      },
    },
  })),
}));

// Mock Animated
jest.mock('react-native/Libraries/Animated/Animated', () => {
  try {
    const ActualAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
    return {
      ...ActualAnimated,
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        removeAllListeners: jest.fn(),
        interpolate: jest.fn(),
      })),
    };
  } catch (error) {
    return {
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        removeAllListeners: jest.fn(),
        interpolate: jest.fn(),
      })),
    };
  }
});

// Mock React Native - LAST
jest.mock('react-native', () => {
  // Create mock components
  const mockComponent = (name: string) => {
    const Component = (props: any) => {
      const React = require('react');
      return React.createElement('View', props, props.children);
    };
    Component.displayName = name;
    return Component;
  };

  // Mock PixelRatio object
  const MockPixelRatio = {
    get: jest.fn(() => 2),
    getFontScale: jest.fn(() => 1),
    getPixelSizeForLayoutSize: jest.fn((layoutSize: number) => layoutSize * 2),
    roundToNearestPixel: jest.fn((layoutSize: number) => Math.round(layoutSize)),
  };

  // Mock Dimensions object
  const MockDimensions = {
    get: jest.fn(() => ({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  // Mock StyleSheet object
  const MockStyleSheet = {
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => style),
    compose: jest.fn((style1, style2) => [style1, style2]),
    hairlineWidth: 1,
    absoluteFill: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    absoluteFillObject: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  return {
    Alert: {
      alert: jest.fn(),
    },
    Dimensions: MockDimensions,
    PixelRatio: MockPixelRatio,
    StyleSheet: MockStyleSheet,
    Animated: {
      View: mockComponent('AnimatedView'),
      Text: mockComponent('AnimatedText'),
      ScrollView: mockComponent('AnimatedScrollView'),
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        removeAllListeners: jest.fn(),
        interpolate: jest.fn(),
      })),
      createAnimatedComponent: jest.fn((component) => component),
    },
    ActivityIndicator: mockComponent('ActivityIndicator'),
    View: mockComponent('View'),
    Text: mockComponent('Text'),
    TouchableOpacity: mockComponent('TouchableOpacity'),
    ScrollView: mockComponent('ScrollView'),
    TextInput: mockComponent('TextInput'),
    Image: mockComponent('Image'),
    Button: mockComponent('Button'),
    FlatList: mockComponent('FlatList'),
    SectionList: mockComponent('SectionList'),
    TurboModuleRegistry: {
      getEnforcing: jest.fn(() => ({
        getConstants: jest.fn(() => ({
          Dimensions: {
            windowPhysicalPixels: {
              width: 375,
              height: 667,
              scale: 2,
              fontScale: 1,
              densityDpi: 326,
            },
          },
        })),
      })),
      get: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      Version: '14.0',
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    StatusBar: {
      setBarStyle: jest.fn(),
      setBackgroundColor: jest.fn(),
      setTranslucent: jest.fn(),
      setHidden: jest.fn(),
    },
    Keyboard: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
      dismiss: jest.fn(),
    },
    AppState: {
      currentState: 'active',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});

// Mock styled-components
jest.mock('styled-components/native', () => {
  const React = require('react');
  
  const styled = (Component: any) => (template: any) => {
    return React.forwardRef((props: any, ref: any) => {
      return React.createElement(Component, { ...props, ref });
    });
  };

  // Add common styled-components
  styled.View = styled('View');
  styled.Text = styled('Text');
  styled.TouchableOpacity = styled('TouchableOpacity');
  styled.ScrollView = styled('ScrollView');
  styled.TextInput = styled('TextInput');

  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }: any) => children,
  };
});

// Mock Intl for currency formatting
Object.defineProperty(global, 'Intl', {
  value: {
    NumberFormat: jest.fn(() => ({
      format: jest.fn((value) => `R$ ${value.toFixed(2).replace('.', ',')}`),
    })),
  },
});

// Mock global requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));

// Mock InteractionManager
jest.mock('react-native/Libraries/Interaction/InteractionManager', () => ({
  runAfterInteractions: jest.fn((callback) => callback()),
  createInteractionHandle: jest.fn(),
  clearInteractionHandle: jest.fn(),
}));

// Mock additional Expo modules that might be imported
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: jest.fn(),
    fromModule: jest.fn(() => ({ downloadAsync: jest.fn() })),
  },
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));