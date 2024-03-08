export default function useTheme() {
    return {
      themes: {  
      light: {
        colors:{
        background: '#FBFDFF',//'#FDFEFF',
        primary: '#0D68A2',
        secondary:"#0D68A2",
        white: '#FFFFFF',
        accent: '#0D68A2',
        accentLight:'#DFF3FF',
        primaryLight:'#DFF3FF',
        primaryDark:'#c7e5f7',
        success: '#2CCA73',
        error: '#FF5252',
        warning: '#FFC107',
        darkText:'#1B1B1B',
        lightDarkText:'#555555',
        disabledText:'#616161',
        inputText:'#D3D3D3',
        }
      },
        dark: {
        colors:{
        background: '#eee',
        primary: '#0D68A2',
        secondary: '#FFFFFF',
        accent: '#0D68A2',
        success: '#2CCA73',
        error: '#FF5252',
        warning: '#FFC107',
        "dark-text":'#FDFEFF',
        "light-dark-text":'#FFFFFF',
        "disabled-text":'#616161',
        "input-text":'#D3D3D3',
        "hover":'#DFF3FF'
        }
      },
    }
 }
}
