export const colors = {
  primary: "primary",
  primaryDark: "primary-dark",
};

const transition = `transition duration-300 ease-in-out`;

export const styles = {
  button: `${transition} py-1 px-4 bg-${colors.primary} rounded-sm text-white font-semibold hover:bg-${colors.primaryDark} focus:outline-none`,
  buttonDanger: `${transition} py-1 px-4 bg-red-600 rounded text-white font-semibold hover:bg-red-700 focus:outline-none`,
  link: `${transition} hover:text-green-500`,
  dropDownLink: `${transition} hover:text-${colors.primaryDark} block px-4 pb-2 text-gray-800`,
  inputField: `${transition} shadow-lg appearance-none bg-dark-400 rounded-sm w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline`,
  label: `block text-gray-400 text-sm font-bold mb-2`,
  fullRoundButton: `${transition} rounded-full text-${colors.primary} shadow-md bg-white h-10 w-10 mb-4 mx-2 hover:bg-gray-600 hover:text-${colors.primaryDark} focus:outline-none`,
  fullRoundButtonPrimary: `${transition} rounded-full text-white shadow-md bg-${colors.primary} h-10 w-10 hover:bg-${colors.primaryDark} focus:outline-none`,
  formWithShadow: `bg-gray-600 shadow-md rounded`,
};
