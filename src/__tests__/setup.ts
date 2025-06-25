import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

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

try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch (error) {
  console.warn(
    "Não foi possível mockar 'react-native/Libraries/Animated/NativeAnimatedHelper'. Ele pode não ser necessário."
  );
}

// Mock Alert
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    TurboModuleRegistry: {
      getEnforcing: jest.fn(() => ({
        DevMenu: {},
      })),
    },
    Alert: {
      alert: jest.fn(),
    },
  };
});

jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: jest.fn(),
  get: jest.fn(),
}));


// Mock styled-components
jest.mock('styled-components/native', () => {
  const React = require('react');
  const ReactNative = require('react-native');
  
  const styled = (Component: any) => () => {
    return React.forwardRef((props: any, ref: any) => {
      return React.createElement(Component, { ...props, ref });
    });
  };

  // Add common styled-components
  styled.View = styled(ReactNative.View);
  styled.Text = styled(ReactNative.Text);
  styled.TouchableOpacity = styled(ReactNative.TouchableOpacity);
  styled.ScrollView = styled(ReactNative.ScrollView);
  styled.TextInput = styled(ReactNative.TextInput);

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