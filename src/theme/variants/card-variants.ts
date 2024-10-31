export const cardVariants = {
    defaults: {
      shadowColor: 'secondary',
      backgroundColor: 'white',
      borderRadius: 'rounded',
    },
    transparent: {
      backgroundColor: 'transparent',
    },
    outlined: {
      borderRadius: 'rounded',
      borderWidth: 1,
      borderColor: 'secondary',
      elevation: 0,
    },
    elevated: {
      borderRadius: 'rounded',
      backgroundColor: 'white',
      shadowColor: 'secondary700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
  };

  export type CardType = Exclude<keyof typeof cardVariants, 'defaults'>;
