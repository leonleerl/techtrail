const config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // 幽暗冷酷的蓝色配色 - 冷色调，更暗
                'web3-dark': {
                    50: '#050810',
                    100: '#0a0f1a',
                    200: '#0f1625',
                    300: '#141c2a',
                    400: '#1a2332',
                    500: '#1f2a3a',
                },
                'web3-blue': {
                    50: '#050a15',
                    100: '#0a1420',
                    200: '#0f1e2e',
                    300: '#1a2d47',
                    400: '#1e3a5c',
                    500: '#2d4a73',
                    600: '#3d5a8a',
                    700: '#4d6aa1',
                    800: '#5d7ab8',
                    900: '#6d8acf',
                },
                'cold-blue': {
                    50: '#0a1520',
                    100: '#0f1e2e',
                    200: '#1a2d47',
                    300: '#1e3a5c',
                    400: '#2d4a73',
                    500: '#3d5a8a',
                    600: '#4d6aa1',
                    700: '#5d7ab8',
                    800: '#6d8acf',
                    900: '#7d9ae6',
                },
                'metallic': {
                    50: '#e8eaed',
                    100: '#c5c9d1',
                    200: '#9fa5b0',
                    300: '#78818f',
                    400: '#5a6574',
                    500: '#3d4a5a',
                    600: '#2d3a4a',
                    700: '#1f2a3a',
                    800: '#141c2a',
                    900: '#0a0f1a',
                },
            },
            backgroundImage: {
                'web3-gradient': 'linear-gradient(135deg, #050810 0%, #0a0f1a 20%, #0f1625 40%, #1a2d47 60%, #0f1e2e 80%, #050a15 100%)',
                'web3-gradient-radial': 'radial-gradient(ellipse at top, #1e3a5c 0%, #0f1e2e 40%, #0a0f1a 80%, #050810 100%)',
                'metallic-blue': 'linear-gradient(135deg, rgba(157, 165, 176, 0.1) 0%, rgba(61, 90, 138, 0.2) 50%, rgba(157, 165, 176, 0.1) 100%)',
            },
            boxShadow: {
                'web3-glow': '0 0 20px rgba(61, 90, 138, 0.4), 0 0 40px rgba(61, 90, 138, 0.2), inset 0 0 20px rgba(61, 90, 138, 0.1)',
                'web3-glow-sm': '0 0 8px rgba(61, 90, 138, 0.3), 0 0 15px rgba(61, 90, 138, 0.15)',
                'web3-glow-border': '0 0 10px rgba(61, 90, 138, 0.5), inset 0 0 10px rgba(61, 90, 138, 0.2)',
                'metallic-glow': '0 0 15px rgba(157, 165, 176, 0.3), 0 0 30px rgba(61, 90, 138, 0.2)',
                'armor-blue': '0 0 12px rgba(61, 90, 138, 0.4), 0 0 24px rgba(61, 90, 138, 0.2), inset 0 1px 0 rgba(157, 165, 176, 0.3), inset 0 -1px 0 rgba(61, 90, 138, 0.2)',
            },
        },
    },
    plugins: [],
}

export default config