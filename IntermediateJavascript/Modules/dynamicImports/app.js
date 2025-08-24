// Dynamically load theme based on current hour
async function loadConfig() {
  const hour = new Date().getHours();//built in js function to get the current hour
  const theme = await import('./theme.mjs'); //dynamic import of the theme file -- returns a promise
  if (hour < 18) {
    theme.setLightTheme();
  } else {
    theme.setDarkTheme();
  }
}

loadConfig();
