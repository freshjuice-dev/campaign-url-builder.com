export default (...args) => {
  if (location.hostname.match("local") || window.localStorage.getItem("unicorn"))
    console.log("🦄:", ...args);
};
