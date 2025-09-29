import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'

const projectId = import.meta.env.VITE_WC_PROJECT_ID

if (!projectId) {
  console.warn('[RainbowKit] VITE_WC_PROJECT_ID belum diisi di .env')
}

export const wagmiConfig = getDefaultConfig({
  appName: 'AIX Agent',
  projectId: projectId ?? 'demo-project-id',
  chains: [mainnet, sepolia],
  ssr: false,
})

const queryClient = new QueryClient()

export function Web3Provider({ children }) {
  const theme = useMemo(() => darkTheme({
    accentColor: '#ffffff',
    accentColorForeground: '#000000',
    borderRadius: 'large',
    overlayBlur: 'small',
  }), [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}



